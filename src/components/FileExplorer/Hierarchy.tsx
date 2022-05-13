import {
  faCaretRight,
  faCheck,
  faPen,
  faTimes,
  faTrash,
  faICursor,
} from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { usePopper } from 'react-popper';
import { createPopper } from '@popperjs/core/lib/createPopper';
import FocusTrap from 'focus-trap-react';
import NoteModel from '../../model/NoteModel';
import FolderModel from '../../model/FolderModel';
import SideNavLink from '../SideNavLink';

import './Hierarchy.scss';
import NoteLink from './NoteLink';
import MoveFolderCommand from '../../events/MoveFolderCommand';
import MoveNoteCommand from '../../events/MoveNoteCommand';

interface Props {
  space: string;
  folderList: FolderModel[];
  noteList: NoteModel[];
  folderId?: string | null;
  moveFolder: any;
  moveNote: any;
  handleFolderChange: any;
  handleFolderDelete: any;
  handleNoteChange: any;
  handleNoteDelete: any;
  level: number;
  handleAddFolder: any;
  handleAddNote: any;
}

const Hierarchy = (props: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const referenceElement = useRef<any>(null);
  const marginElement = useRef<any>(null);
  const marginEditElement = useRef<any>(null);
  const popperElement = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [subFolders, setSubFolders] = useState<FolderModel[]>([]);
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [folder, setFolder] = useState<FolderModel>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [state, setState] = useState({ name: '' });
  const [isEdit, setIsEdit] = useState(false);

  const { styles, attributes, update, forceUpdate } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'flip',
          enabled: true,
          options: {
            fallbackPlacements: [
              'bottom-end',
              'right-end',
              'right-start',
              'right',
              'auto',
            ],
          },
        },
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 6],
          },
        },
        {
          name: 'eventListeners',
          options: { scroll: false },
        },
      ],
    }
  );

  const togglePopup = (event: any) => {
    event.preventDefault();
    if (update) {
      update().then(() => {});
    }
    setIsOpen(!isOpen);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (event: any) => {
    setState({ ...state, name: event.target.value });
  };

  const renameFolder = () => {
    setIsEdit(true);
    setIsOpen(false);
  };

  const newFolder = () => {
    props.handleAddFolder(props.folderId);
    setIsOpen(false);
  };

  const newNote = () => {
    props.handleAddNote(props.folderId);
    setIsOpen(false);
  };

  const closeContext = () => {
    setState({ ...state, name: folder?.name || '' });
    setIsEdit(false);
  };

  const applyChange = () => {
    props.handleFolderChange({ ...folder, name: state.name });
    closeContext();
  };

  const deleteFolder = () => {
    props.handleFolderDelete(folder);
    closeContext();
  };

  useEffect(() => {
    if (props.folderList) {
      setSubFolders(
        props.folderList.filter((item) => item.parentId === props.folderId)
      );
      setFolder(props.folderList.find((item) => item._id === props.folderId));
    }
  }, [props.folderId, props.folderList]);

  useEffect(() => {
    setState({ ...state, name: folder?.name || '' });
  }, [folder?.name]);

  useEffect(() => {
    if (props.noteList) {
      setNotes(
        props.noteList.filter((item) => item.folderId === props.folderId)
      );
    }
  }, [props.folderId, props.noteList]);

  useEffect(() => {
    recomputeHeight();
  }, [isExpanded, folder]);

  useEffect(() => {
    setTimeout(() => {
      if (marginElement.current) {
        marginElement.current.style.width = `${(props.level - 1) * 16}px`;
        marginElement.current.style.marginLeft = '10px';
      }
      if (marginEditElement.current) {
        marginEditElement.current.style.width = `${(props.level - 1) * 24}px`;
        marginEditElement.current.style.marginLeft = '10px';
      }
    }, 0);
  }, [props.level, marginElement, isEdit]);

  const recomputeHeight = () => {
    if (folder) {
      const el: any = elementRef.current;
      if (isExpanded) {
        el.style.height = `${el.scrollHeight}px`;
        setTimeout(() => {
          el.style.height = 'auto';
        }, 100);
      } else {
        if (el.style.height === 'auto') {
          el.style.height = `${el.scrollHeight}px`;
        }
        setTimeout(() => {
          el.style.height = '0px';
        }, 10);
      }
    }
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    // console.log(event);
  };

  const onDragStart = (event: any) => {
    event.dataTransfer.setData('type', 'folder');
    event.dataTransfer.setData('id', folder?._id);
    event.dataTransfer.setData('currentParentId', folder?.parentId);
  };

  const onDrop = (event: any) => {
    const id = event.dataTransfer.getData('id');
    const currentParentId = event.dataTransfer.getData('currentParentId');
    const type = event.dataTransfer.getData('type');

    console.log(type, id, currentParentId);
    if (!folder?._id || currentParentId === folder._id || id === folder._id) {
      return;
    }

    switch (type) {
      case 'folder':
        props.moveFolder(id, folder._id);
        break;
      case 'note':
        props.moveNote(id, folder._id);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="hierarchy text-dark-100 dark:text-light-600">
        {folder && (
          <div className="hierarchy__parent">
            {!isEdit && (
              <button
                className={`button hierarchy__parent__button ${
                  isOpen ? 'last-clicked' : ''
                }`}
                onClick={toggleExpansion}
                draggable
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onContextMenu={togglePopup}
                ref={referenceElement}
              >
                <div ref={marginElement} />
                <div
                  className={`hierarchy__parent__indicator ${
                    isExpanded ? 'hierarchy__parent__indicator--expanded' : ''
                  }`}
                >
                  <div
                    className={`hierarchy__parent__indicator__icon ${
                      isExpanded
                        ? 'hierarchy__parent__indicator__icon--expanded'
                        : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
                  </div>
                </div>
                <div className="hierarchy__parent__name">{folder.name}</div>
              </button>
            )}

            {isEdit && (
              <div className="hierarchy__parent__context">
                <div
                  className={`hierarchy__parent__context__indicator ${
                    isExpanded
                      ? 'hierarchy__parent__context__indicator--expanded'
                      : ''
                  }`}
                >
                  <div
                    className={`hierarchy__parent__context__indicator__icon ${
                      isExpanded
                        ? 'hierarchy__parent__context__indicator__icon--expanded'
                        : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
                  </div>
                </div>
                <input
                  className="hierarchy__parent__context__input"
                  onInput={handleChange}
                  value={state.name}
                  autoFocus
                />
                <button
                  className="button hierarchy__parent__context__button"
                  onClick={applyChange}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="button hierarchy__parent__context__button"
                  onClick={closeContext}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
          </div>
        )}
        <div
          ref={elementRef}
          className={`hierarchy__children ${
            isExpanded || !folder
              ? 'hierarchy__children--expanded'
              : 'hierarchy__children--collapsed'
          } ${
            folder
              ? 'hierarchy__children--not-root'
              : 'hierarchy__children--root'
          }`}
        >
          {subFolders.map((item) => (
            <div key={item._id} className="hierarchy__children__folder">
              <Hierarchy
                space={props.space}
                folderList={props.folderList}
                noteList={props.noteList}
                folderId={item._id}
                moveFolder={props.moveFolder}
                moveNote={props.moveNote}
                handleFolderChange={props.handleFolderChange}
                handleFolderDelete={props.handleFolderDelete}
                handleNoteChange={props.handleNoteChange}
                handleNoteDelete={props.handleNoteDelete}
                level={props.level + 1}
                handleAddFolder={props.handleAddFolder}
                handleAddNote={props.handleAddNote}
              />
            </div>
          ))}
          {notes.map((item) => (
            <div key={item._id} className="hierarchy__children__note">
              <NoteLink
                space={props.space}
                note={item}
                handleNoteChange={props.handleNoteChange}
                handleNoteDelete={props.handleNoteDelete}
                level={props.level + 1}
              />
            </div>
          ))}
        </div>
      </div>
      <div ref={popperElement} style={styles.popper} {...attributes.popper}>
        {isOpen && (
          <FocusTrap
            focusTrapOptions={{
              onDeactivate: () => setIsOpen(false),
              clickOutsideDeactivates: true,
            }}
          >
            <div className="hierarchy-context-popup" hidden={!isOpen}>
              <button className="button" onClick={newNote}>
                <FontAwesomeIcon icon={faNoteSticky} />
                New note
              </button>
              <button className="button" onClick={newFolder}>
                <FontAwesomeIcon icon={faFolderPlus} />
                New folder
              </button>
              <button className="button" onClick={renameFolder}>
                <FontAwesomeIcon icon={faPenClip} />
                Rename folder
              </button>
              <button className="button" onClick={deleteFolder}>
                <FontAwesomeIcon icon={faTrash} />
                Delete folder
              </button>
            </div>
          </FocusTrap>
        )}
      </div>
    </>
  );
};

export default Hierarchy;

import {
  faCaretRight,
  faCheck,
  faTimes,
  faTrash,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';
import NoteModel from '../../model/NoteModel';
import FolderModel from '../../model/FolderModel';
import SideNavLink from '../SideNavLink';

import './NoteLink.scss';

interface Props {
  space: string;
  note: NoteModel;
  handleNoteChange: any;
  handleNoteDelete: any;
  level: number;
  selectedNoteId: string;
}

const NoteLink = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const referenceElement = useRef<any>(null);
  const marginElement = useRef<any>(null);
  const popperElement = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState({ name: '' });

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

  useEffect(() => {
    setTimeout(() => {
      if (marginElement.current) {
        marginElement.current.style.width = `${(props.level - 1) * 16}px`;
        marginElement.current.style.marginLeft = '10px';
      }
    }, 0);
  }, [props.level, marginElement, isEdit]);

  const togglePopup = (event: any) => {
    event.preventDefault();
    if (update) {
      update().then(() => {});
    }
    setIsOpen(!isOpen);
  };

  const renameFolder = () => {
    setIsEdit(true);
    setIsOpen(false);
  };

  useEffect(() => {
    setState({ ...state, name: props.note.name || '' });
  }, [props.note.name]);

  const handleContextmenu = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (event: any) => {
    setState({ ...state, name: event.target.value });
  };

  const openNote = (event: any) => {
    history.push(`/${props.space}/note?id=${props.note.reference}`);
  };

  const closeContext = () => {
    setState({ ...state, name: props.note?.name || '' });
    setIsEdit(false);
  };

  const applyChange = () => {
    props.handleNoteChange({ ...props.note, name: state.name });
    closeContext();
  };

  const deleteFolder = () => {
    props.handleNoteDelete(props.note);
    closeContext();
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    // console.log(event);
  };

  const onDragStart = (event: any) => {
    event.dataTransfer.setData('type', 'note');
    event.dataTransfer.setData('currentParentId', props.note.folderId);
    event.dataTransfer.setData('id', props.note._id);
  };

  return (
    <>
      <div>
        {!isEdit && (
          <button
            className={`button note-link hover:bg-light-500 hover:dark:bg-dark-200 ${
              props.selectedNoteId === props.note.reference
                ? 'bg-light-500 dark:bg-dark-200'
                : ''
            }`}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onContextMenu={togglePopup}
            onClick={openNote}
            ref={referenceElement}
          >
            <div ref={marginElement} />
            {/* <div className="note-link__icon">
              <FontAwesomeIcon icon={faCaretRight} />
            </div> */}
            <div className="note-link__name">{props.note.name}</div>
          </button>
        )}

        {isEdit && (
          <div className="note-link__parent__context">
            <input
              className="note-link__parent__context__input"
              onInput={handleChange}
              value={state.name}
              autoFocus
            />
            <button
              className="button note-link__parent__context__button"
              onClick={applyChange}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className="button note-link__parent__context__button"
              onClick={closeContext}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
      </div>
      <div ref={popperElement} style={styles.popper} {...attributes.popper}>
        {isOpen && (
          <FocusTrap
            focusTrapOptions={{
              onDeactivate: () => setIsOpen(false),
              clickOutsideDeactivates: true,
            }}
          >
            <div className="note-link-context-popup" hidden={!isOpen}>
              <button className="button" onClick={renameFolder}>
                <FontAwesomeIcon icon={faPen} />
                Rename
              </button>
              <button className="button" onClick={deleteFolder}>
                <FontAwesomeIcon icon={faTrash} />
                Delete note
              </button>
            </div>
          </FocusTrap>
        )}
      </div>
    </>
  );
};

export default NoteLink;

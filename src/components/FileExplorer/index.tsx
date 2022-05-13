/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { cloneDeep, sortBy, uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import MoveFolderCommand from '../../events/MoveFolderCommand';
import MoveNoteCommand from '../../events/MoveNoteCommand';
import FolderModel from '../../model/FolderModel';
import NoteModel from '../../model/NoteModel';
import SideNavLink from '../SideNavLink';
import Hierarchy from './Hierarchy';

import './style.scss';
import { deleteFolder, saveFolder, deleteNote } from './service';
import { saveNote } from '../Page/NotePage/service';
import {
  appendFolderItem,
  deleteFolderItems,
  updateFolderItem,
} from '../../actions/FolderActions';
import {
  appendNoteItem,
  deleteNoteItems,
  updateNoteItem,
} from '../../actions/NoteActions';
import ShowSelectedNoteCommand from '../../events/ShowSelectedNoteCommand';

interface Props {
  space: string;
  selectedNoteId: string;
}

const FileExplorer = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const folderList = useSelector((state: any) => state.folder.items);
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const [folderMap, setFolderMap] = useState<any>({});

  useEffect(() => {
    const _folderMap: any = {};
    folderList.forEach((item: FolderModel) => {
      _folderMap[item._id] = item;
    });
    setFolderMap(_folderMap);
  }, [folderList]);

  const handleFolderChange = (_folder: FolderModel) => {
    saveFolder(props.space, _folder, authorization).then((response: any) => {
      if (response?._id) {
        dispatch(updateFolderItem(response));
      }
    });
  };

  const handleFolderDelete = (_folder: FolderModel) => {
    deleteFolder(props.space, _folder._id, authorization).then(
      (response: any) => {
        if (response?.folder) {
          dispatch(deleteFolderItems(response.folder));
        }
        if (response?.note) {
          dispatch(deleteNoteItems(response.note));
        }
      }
    );
  };

  const handleNoteChange = (_note: NoteModel) => {
    saveNote(props.space, _note, authorization).then((response: any) => {
      if (response?._id) {
        dispatch(updateNoteItem(response));
      }
    });
  };

  const handleNoteDelete = (_note: NoteModel) => {
    deleteNote(props.space, _note._id, authorization).then((response: any) => {
      if (response?.note) {
        dispatch(deleteNoteItems(response.note));
      }
    });
  };

  const moveFolder = (source: string, target: string) => {
    const index = folderList.findIndex(
      (item: FolderModel) => item._id === source
    );
    if (index !== -1) {
      let movingIntoChildren = false;
      let currentFolderId: any = target;
      while (currentFolderId) {
        const currentFolder = folderList.find(
          (item: FolderModel) => item._id === currentFolderId
        );
        if (currentFolder?.parentId === source) {
          movingIntoChildren = true;
        }
        currentFolderId = currentFolder?.parentId;
      }
      if (!movingIntoChildren) {
        saveFolder(
          props.space,
          {
            ...folderList[index],
            parentId: target,
          },
          authorization
        ).then((response: any) => {
          if (response?._id) {
            dispatch(updateFolderItem(response));
          }
        });
      }
    }
  };

  const moveNote = (source: string, target: string) => {
    const index = noteList.findIndex((item: NoteModel) => item._id === source);

    if (index !== -1) {
      saveNote(
        props.space,
        {
          ...noteList[index],
          folderId: target,
        },
        authorization
      ).then((response: any) => {
        if (response?._id) {
          dispatch(updateNoteItem(response));
        }
      });
    }
  };

  const handleAddFolder = (parentId?: string) => {
    saveFolder(
      props.space,
      {
        name: 'Untitled',
        parentId,
      },
      authorization
    ).then((response: any) => {
      if (response?._id) {
        dispatch(appendFolderItem(response));
      }
    });
  };

  const handleAddNote = (folderId: string) => {
    saveNote(
      props.space,
      { folderId, name: 'Untitled', content: '' },
      authorization
    ).then((response: any) => {
      if (response?._id) {
        dispatch(appendNoteItem(response));
      }
    });
  };

  const showOpenedNote = () => {
    if (!props.selectedNoteId) {
      return;
    }
    const _note = noteList.find(
      (item: NoteModel) => item.reference === props.selectedNoteId
    );
    if (!_note) {
      return;
    }
    const folderIdList: string[] = [];
    let _folderId = _note.folderId;
    while (_folderId) {
      folderIdList.push(_folderId);
      _folderId = folderMap[_folderId]?.parentId;
    }
    ShowSelectedNoteCommand.next({
      folderIdList,
      noteReference: _note.reference,
    });
    // ShowSelectedNoteCommand.next(queryParam.id);
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer__header">
        <div>File explorer</div>
        <div className="file-explorer__header__action">
          <button className="button" onClick={showOpenedNote}>
            <FontAwesomeIcon icon={faCircleDot} />
          </button>
          <button className="button" onClick={() => handleAddFolder()}>
            <FontAwesomeIcon icon={faFolderPlus} />
          </button>
        </div>
      </div>
      <div className="file-explorer__body">
        <Hierarchy
          space={props.space}
          folderList={folderList}
          noteList={noteList}
          moveFolder={moveFolder}
          moveNote={moveNote}
          handleFolderChange={handleFolderChange}
          handleFolderDelete={handleFolderDelete}
          handleNoteChange={handleNoteChange}
          handleNoteDelete={handleNoteDelete}
          handleAddFolder={handleAddFolder}
          handleAddNote={handleAddNote}
          level={0}
          selectedNoteId={props.selectedNoteId}
        />
      </div>
    </div>
  );
};

export default FileExplorer;

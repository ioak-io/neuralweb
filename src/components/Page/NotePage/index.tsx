import {
  faCheck,
  faCircleNodes,
  faFileExport,
  faFilter,
  faGlasses,
  faLink,
  faPen,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './style.scss';
import Topbar from '../../../components/Topbar';
import Editor from '../../../components/Editor';
import NoteModel from '../../../model/NoteModel';
import Viewer from '../../../components/Viewer';
import FileExplorer from '../../../components/FileExplorer';
import ContextContainer from '../../../components/MainContent/ContextContainer';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import Footer from '../../../components/Footer';
import { getNoteByReference, saveNote } from './service';
import NotelinkModel from '../../../model/NotelinkModel';
import LinkView from '../../../components/LinkView';

interface Props {
  location: any;
  space: string;
}

const queryString = require('query-string');

const NotePage = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const [view, setView] = useState('view');

  const [state, setState] = useState<NoteModel | null>(null);

  const [queryParam, setQueryParam] = useState<any>({});

  useEffect(() => {
    DisableContextBarCommand.next(false);
  }, []);

  useEffect(() => {
    const queryParam = queryString.parse(props.location.search);
    setQueryParam(queryParam);
  }, [props.location]);

  useEffect(() => {
    if (queryParam?.id && authorization.isAuth) {
      getNoteByReference(props.space, queryParam?.id, authorization).then(
        (response: any) => {
          setState(response);
          setView('view');
        }
      );
    }
  }, [queryParam, authorization]);

  const handleChange = (_state: NoteModel) => {
    setState(_state);
  };

  const openGraphMode = () => {
    setView('graph');
  };

  const openEditMode = () => {
    setView('edit');
  };

  const openViewMode = () => {
    setView('view');
  };

  const openLinkMode = () => {
    setView('link');
  };

  const closeNote = () => {
    setView('view');
    setState(null);
    history.push(`/${props.space}/note`);
  };

  const saveChanges = () => {
    saveNote(props.space, state, authorization).then((response: any) => {
      if (response) {
        setState(response);
        setView('view');
      }
    });
  };

  // useEffect(() => {
  //   console.log(state.content);
  // }, [state.content]);

  return (
    <>
      <div className="note-page page-animate">
        <Topbar title={state?.name || 'Untitled'}>
          <div className="topbar-actions">
            {view !== 'view' && (
              <button className="button" onClick={openViewMode}>
                <FontAwesomeIcon icon={faGlasses} />
              </button>
            )}
            {view !== 'edit' && (
              <button className="button" onClick={openEditMode}>
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
            {view !== 'graph' && (
              <button className="button" onClick={openGraphMode}>
                <FontAwesomeIcon icon={faCircleNodes} />
              </button>
            )}
            {view !== 'link' && (
              <button className="button" onClick={openLinkMode}>
                <FontAwesomeIcon icon={faLink} />
              </button>
            )}
            {queryParam.id && (
              <button className="button" onClick={closeNote}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </Topbar>
        <div className="note-page__left">
          <div className="main note-page__main">
            {view === 'edit' && state && (
              <Editor
                space={props.space}
                note={state}
                handleChange={handleChange}
              />
            )}
            {view === 'view' && state && (
              <div className="viewer-container">
                <Viewer space={props.space} note={state} />
              </div>
            )}
            {view === 'link' && state && (
              <LinkView space={props.space} note={state} />
            )}
            {['view', 'edit'].includes(view) && !queryParam.id && (
              <div>No file is open</div>
            )}
          </div>
        </div>
      </div>
      <ContextContainer space={props.space}>
        {['view', 'edit'].includes(view) && state && (
          <LinkView space={props.space} note={state} />
        )}
      </ContextContainer>
      {view === 'edit' && state && (
        <Footer>
          <div className="footer-action">
            <button className="button" onClick={saveChanges}>
              <FontAwesomeIcon icon={faCheck} /> Save
            </button>
          </div>
        </Footer>
      )}
    </>
  );
};

export default NotePage;

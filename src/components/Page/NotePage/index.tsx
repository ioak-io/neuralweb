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
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './style.scss';
import Topbar from '../../../components/Topbar';
import Editor from '../../../components/Editor';
import NoteModel from '../../../model/NoteModel';
import Viewer from '../../../components/Viewer';
import FileExplorer from '../../../components/FileExplorer';
import ContextContent from '../../../components/ContextContent';
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
  const id = useRef('');

  const [view, setView] = useState('view');
  const [isContextExpanded, setIsContextExpanded] = useState(false);

  const [state, setState] = useState<NoteModel | null>(null);

  const [queryParam, setQueryParam] = useState<any>({});

  useEffect(() => {
    DisableContextBarCommand.next(false);
  }, []);

  useEffect(() => {
    const queryParam = queryString.parse(props.location.search);
    setQueryParam(queryParam);
    id.current = queryParam?.id || '';
  }, [props.location]);

  useEffect(() => {
    if (queryParam?.id && authorization.isAuth) {
      setView('view');
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

  // const saveChanges = () => {
  //   saveNote(props.space, state, authorization).then((response: any) => {
  //     if (response) {
  //       setState(response);
  //       setView('view');
  //     }
  //   });
  // };

  const handleSave = (_note: NoteModel) => {
    saveNote(props.space, _note, authorization).then((response: any) => {
      if (response && id.current === response.reference) {
        setState(response);
      }
    });
  };

  // useEffect(() => {
  //   console.log(state.content);
  // }, [state.content]);

  return (
    <>
      <div
        className={`note-page page-animate ${
          isContextExpanded
            ? 'note-page--context-active'
            : 'note-page--context-inactive'
        }`}
      >
        <Topbar
          title={state?.name || 'Untitled'}
          fixed
          isContextExpanded={isContextExpanded}
        >
          <div className="topbar-actions">
            <button
              className={`button ${view === 'view' ? 'active' : ''}`}
              onClick={openViewMode}
            >
              <FontAwesomeIcon icon={faGlasses} />
              <span className="menu-highlight-line" />
            </button>
            <button
              className={`button ${view === 'edit' ? 'active' : ''}`}
              onClick={openEditMode}
            >
              <FontAwesomeIcon icon={faPen} />
              <span className="menu-highlight-line" />
            </button>
            <button
              className={`button ${view === 'graph' ? 'active' : ''}`}
              onClick={openGraphMode}
            >
              <FontAwesomeIcon icon={faCircleNodes} />
              <span className="menu-highlight-line" />
            </button>
            <button
              className={`button ${isContextExpanded ? 'active' : ''}`}
              onClick={() => setIsContextExpanded(!isContextExpanded)}
            >
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
        </Topbar>
        <div className="note-page__left">
          <div className="main note-page__main">
            {view === 'edit' && state && (
              <Editor
                space={props.space}
                note={state}
                handleChange={handleChange}
                handleSave={handleSave}
              />
            )}
            {view === 'view' && state && (
              <div className="viewer-container">
                <Viewer space={props.space} note={state} />
              </div>
            )}
            {view === 'link' && state && (
              <LinkView
                space={props.space}
                note={state}
                handleClose={() => setIsContextExpanded(false)}
              />
            )}
            {['view', 'edit'].includes(view) && !queryParam.id && (
              <div>No file is open</div>
            )}
          </div>
        </div>
      </div>
      <ContextContent space={props.space} isExpanded={isContextExpanded}>
        {state && (
          <div className="note-page__context">
            <LinkView
              space={props.space}
              note={state}
              handleClose={() => setIsContextExpanded(false)}
            />
          </div>
        )}
      </ContextContent>
      {/* {view === 'edit' && state && (
        <Footer>
          <div className="footer-action">
            <button className="button" onClick={saveChanges}>
              <FontAwesomeIcon icon={faCheck} /> Save
            </button>
          </div>
        </Footer>
      )} */}
    </>
  );
};

export default NotePage;

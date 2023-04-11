import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import Topbar from '../../../components/Topbar';
import NoteModel from '../../../model/NoteModel';
import { getNoteByReference, saveNote } from './service';
import GraphView from '../../../components/GraphView';
import { useParams } from 'react-router-dom';
import MainSection from '../../../components/MainSection';
import ContentSection from '../../../components/Note/ContentSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNodes, faFile, faFileAlt, faHome, faLink } from '@fortawesome/free-solid-svg-icons';
import LinksSection from '../../../components/Note/LinksSection';

interface Props {
  location: any;
  space: string;
}

const NotePage = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const params = useParams();
  const [note, setNote] = useState<NoteModel | null>(null);
  const [view, setView] = useState<'home' | 'graph'>('home');

  useEffect(() => {
    if (params.id && authorization.isAuth) {
      getNoteByReference(props.space, params.id, authorization).then(
        (response: any) => {
          setNote(response);
        }
      );
    }
  }, [params, authorization]);


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
      if (response && params.id === response.reference) {
        setNote(response);
      }
    });
  };

  // useEffect(() => {
  //   console.log(state.content);
  // }, [state.content]);

  const onPostNoteSave = (_note: NoteModel) => {
    setNote(_note);
  }

  return (
    <>
      <div className='note-page page-animate'>
        <Topbar title="Note" space={props.space}>
          <div className="topbar-actions">
            <button
              className={`button ${view === 'home' ? 'active' : ''}`}
              onClick={() => setView('home')}
            >
              <FontAwesomeIcon icon={faFileAlt} />
              <span className="menu-highlight-line" />
            </button>
            <button
              className={`button ${view === 'graph' ? 'active' : ''}`}
              onClick={() => setView('graph')}
            >
              <FontAwesomeIcon icon={faCircleNodes} />
              <span className="menu-highlight-line" />
            </button>
          </div>
        </Topbar>
        {/* <Topbar title={note?.name || 'Untitled'} /> */}
        <MainSection>
          {note && view === 'home' && <div>
            <ContentSection note={note} space={props.space} onPostNoteSave={onPostNoteSave} />
          </div>}
          {/* {note && view === 'graph' && <div>
            <LinksSection note={note} space={props.space} onPostNoteSave={onPostNoteSave} />
          </div>} */}
          {note && view === 'graph' && <div>
            Graph
          </div>}
        </MainSection>

      </div>
    </>
  );
};

export default NotePage;

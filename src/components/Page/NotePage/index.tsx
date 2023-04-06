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

interface Props {
  location: any;
  space: string;
}

const NotePage = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const params = useParams();
  const [note, setNote] = useState<NoteModel | null>(null);

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
        <Topbar title="Note" />
        {/* <Topbar title={note?.name || 'Untitled'} /> */}
        <MainSection>
          {note && <div>
            <ContentSection note={note} space={props.space} onPostNoteSave={onPostNoteSave} />
          </div>}
        </MainSection>

      </div>
    </>
  );
};

export default NotePage;

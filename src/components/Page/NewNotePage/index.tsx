import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNodes, faListUl, faPlus } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Topbar from '../../../components/Topbar';
import NoteModel from '../../../model/NoteModel';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input } from 'basicui';
import MainSection from '../../../components/MainSection';
import { saveNote } from '../NotePage/service';

interface Props {
  location: any;
  space: string;
}

const NewNotePage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  const [state, setState] = useState<NoteModel>({
    _id: undefined,
    content: '',
    folderId: '',
    labels: [],
    name: '',
    reference: ''
  });

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const save = () => {
    saveNote(props.space, state, authorization).then((response) => {
      navigate(`/${props.space}/note/${response.reference}`);
    })
  }

  return (
    <div className="page-animate">
      <Topbar title="Create new note" space={props.space} />
      <MainSection>
        <Input name="name" value={state.name} onInput={handleChange} label='Note name' />
        <div className="footer">
          <div />
          <div className="footer-right">
            <Button onClick={save}>
              <FontAwesomeIcon icon={faPlus} /> Create
            </Button>
          </div>
        </div>
      </MainSection>
    </div>
  );
};

export default NewNotePage;

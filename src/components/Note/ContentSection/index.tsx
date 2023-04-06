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
import './style.scss';
import Topbar from '../../../components/Topbar';
import NoteModel from '../../../model/NoteModel';
import { getNoteByReference, saveNote } from './service';
import GraphView from '../../../components/GraphView';
import { useParams } from 'react-router-dom';
import SectionContainer from '../ui/SectionContainer';
import EditControls from '../ui/EditControls';
import ViewControls from '../ui/ViewControls';
import Edit from './Edit';
import View from './View';

interface Props {
  note: NoteModel;
  space: string;
}

const ContentSection = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const onCancel = () => {
    setIsEdit(false);
  }

  const onEdit = () => {
    setIsEdit(true);
  }

  const onSave = () => {
    setIsEdit(false);
  }

  return (
    <div className='note-content-section'>
      <SectionContainer>
        {isEdit && <EditControls onCancel={onCancel} onSave={onSave} />}
        {!isEdit && <ViewControls onEdit={onEdit} />}
        {isEdit && <Edit note={props.note} space={props.space} />}
        {!isEdit && <View note={props.note} space={props.space} />}
      </SectionContainer>
    </div>
  );
};

export default ContentSection;

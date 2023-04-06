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
import Topbar from '../../Topbar';
import NoteModel from '../../../model/NoteModel';
import { getNoteByReference, saveNote } from './service';
import GraphView from '../../GraphView';
import { useParams } from 'react-router-dom';
import MainSection from '../../MainSection';

interface Props {
  note: NoteModel;
  space: string;
}

const View = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const params = useParams();

  return (
    <div className='note-content-section-view'>
      {props.note.content}
    </div>
  );
};

export default View;

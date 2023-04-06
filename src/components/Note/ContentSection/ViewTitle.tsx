import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './View.scss';
import NoteModel from '../../../model/NoteModel';
import { useParams } from 'react-router-dom';
import LabelViewer from './LabelViewer';

interface Props {
  note: NoteModel;
  space: string;
}

const ViewTitle = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const params = useParams();

  return (
    <div className='note-content-section-view'>
      <div className='note-content-section-view__name'>
        {props.note.name}
      </div>
      <div className='note-content-section-view__label'>
        <LabelViewer note={props.note} />
      </div>
    </div>
  );
};

export default ViewTitle;

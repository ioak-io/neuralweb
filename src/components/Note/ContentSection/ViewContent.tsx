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

const ViewContent = (props: Props) => {
  return (
    <div className='note-content-section-view'>
      <div className='note-content-section-view__content' dangerouslySetInnerHTML={{ __html: props.note.content || '' }} />
    </div>
  );
};

export default ViewContent;

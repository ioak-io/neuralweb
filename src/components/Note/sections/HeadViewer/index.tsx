import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { useParams } from 'react-router-dom';
import LabelViewer from '../../sections/LabelViewer';

interface Props {
  note: NoteModel;
}

const HeadViewer = (props: Props) => {
  return (
    <div className='head-viewer'>
      <div className='head-viewer__name'>
        {props.note.name}
      </div>
      <LabelViewer note={props.note} />
    </div>
  );
};

export default HeadViewer;

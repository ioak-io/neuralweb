import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { useParams } from 'react-router-dom';
import LabelViewer from '../../sections/LabelViewer';
import { Label } from 'basicui';
import TypeViewer from '../TypeViewer';
import KeywordViewer from '../KeywordViewer';

interface Props {
  note: NoteModel;
}

const HeadViewer = (props: Props) => {
  return (
    <div className='head-viewer'>
      <div>
        {/* <Label>Name</Label> */}
        <div className="head-viewer__title">
          <TypeViewer note={props.note} />
          {props.note.name}
        </div>
      </div>
      <div>
        <Label>Labels</Label>
        {props.note.labels.length > 0 && <LabelViewer note={props.note} />}
        {props.note.labels.length === 0 && '-'}
      </div>
      <div>
        <Label>Keywords</Label>
        <KeywordViewer keywords={props.note.keywords} />
      </div>
    </div>
  );
};

export default HeadViewer;

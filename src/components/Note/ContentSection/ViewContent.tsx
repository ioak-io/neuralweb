import React, { useEffect, useRef, useState } from 'react';
import './View.scss';
import NoteModel from '../../../model/NoteModel';

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

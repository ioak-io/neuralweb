import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';

interface Props {
  note: NoteModel;
}

const ContentViewer = (props: Props) => {
  return (
    <div className='head-viewer'>
      <div className='head-viewer__content' dangerouslySetInnerHTML={{ __html: props.note.content || '' }} />
    </div>
  );
};

export default ContentViewer;

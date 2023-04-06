import React, { useEffect, useRef, useState } from 'react';
import './LabelViewer.scss';
import NoteModel from '../../../model/NoteModel';

interface Props {
  note: NoteModel;
}

const LabelViewer = (props: Props) => {
  return (
    <div className='note-content-section-label-viewer'>
      <div className='note-label-list'>
        {props.note.labels?.map((label) =>
          <div className='note-label'>
              {label}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelViewer;

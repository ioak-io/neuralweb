import React, { useEffect, useRef, useState } from 'react';
import './Edit.scss';
import NoteModel from '../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import LabelEditor from './LabelEditor';

interface Props {
  note: NoteModel;
  space: string;
  editor: any;
  onChange: any;
}

const EditTitle = (props: Props) => {
  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className='note-content-section-edit'>
      <Input autoFocus name="name" value={props.note.name} label="Name" onInput={handleChange} />
      <LabelEditor note={props.note} space={props.space} onChange={handleChange} />
    </div>
  );
};

export default EditTitle;

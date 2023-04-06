import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Edit.scss';
import NoteModel from '../../../model/NoteModel';
import { useParams } from 'react-router-dom';
import { Input, Label, Textarea } from 'basicui';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';

interface Props {
  note: NoteModel;
  space: string;
  editor: any;
  onChange: any;
}

const EditContent = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const params = useParams();

  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className='note-content-section-edit'>
      <div>
        <Label>
          Content
        </Label>
        <Editor editor={props.editor}>
          <Bold editor={props.editor} />
          <Italic editor={props.editor} />
          <Underline editor={props.editor} />
          <BulletList editor={props.editor} />
          <OrderedList editor={props.editor} />
          <BlockQuote editor={props.editor} />
          <HighlightColor editor={props.editor} />
          <ClearFormatting editor={props.editor} />
        </Editor>
      </div>
    </div>
  );
};

export default EditContent;

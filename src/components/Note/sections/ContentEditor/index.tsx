import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { useParams } from 'react-router-dom';
import { Input, Label, Textarea } from 'basicui';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';

interface Props {
  note: NoteModel;
  editor: any;
}

const ContentEditor = (props: Props) => {
  return (
    <div className='head-editor'>
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

export default ContentEditor;

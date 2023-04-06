import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';

interface Props {
  note: NoteModel;
}

const MetadataEditor = (props: Props) => {
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

export default MetadataEditor;

import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';
import DataPicker from './DataPicker';

interface Props {
  note: NoteModel;
  onChange: any;
  metadataDefinition: MetadataDefinitionModel;
}

const LineItem = (props: Props) => {

  const handleChange = (event: any) => {
    props.onChange({
      ...props.note, [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleDataPickerChange = (value: string) => {
    props.onChange({
      ...props.note, [props.metadataDefinition._id || '']: value
    })
  }

  return (
    <div className='metadata-editor-line-item'>
      {props.metadataDefinition.type === 'long-text' &&
        <Textarea label={props.metadataDefinition.name} name={props.metadataDefinition._id} value={props.note[props.metadataDefinition._id || '']} onInput={handleChange} />
      }
      {props.metadataDefinition.type === 'short-text' && !props.metadataDefinition.linkable &&
        <Input label={props.metadataDefinition.name} name={props.metadataDefinition._id} value={props.note[props.metadataDefinition._id || '']} onInput={handleChange} />
      }
      {props.metadataDefinition.type === 'short-text' && props.metadataDefinition.linkable &&
        <DataPicker note={props.note} metadataDefinition={props.metadataDefinition} onChange={handleDataPickerChange} />
      }
    </div>
  );
};

export default LineItem;

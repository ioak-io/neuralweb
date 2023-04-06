import {
  faCheck,
  faCircleNodes,
  faFileExport,
  faFilter,
  faGlasses,
  faLink,
  faPen,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import Topbar from '../../Topbar';
import NoteModel from '../../../model/NoteModel';
import { getNoteByReference, saveNote } from './service';
import GraphView from '../../GraphView';
import { useParams } from 'react-router-dom';
import MainSection from '../../MainSection';
import { Textarea } from 'basicui';
import { getEditorConfig } from '../../../utils/EditorUtils';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';

interface Props {
  note: NoteModel;
  space: string;
}

const Edit = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const params = useParams();
  const editor = getEditorConfig();
  const [state, setState] = useState<NoteModel | null>();

  useEffect(() => {
    setState(props.note);
  }, [props.note]);

  useEffect(() => {
    editor?.commands.setContent(state?.content || '');
  }, [state?.content]);

  return (
    <div className='note-content-section-edit'>
      <Editor editor={editor}>
        <Bold editor={editor} />
        <Italic editor={editor} />
        <Underline editor={editor} />
        <BulletList editor={editor} />
        <OrderedList editor={editor} />
        <BlockQuote editor={editor} />
        <HighlightColor editor={editor} />
        <ClearFormatting editor={editor} />
      </Editor>
    </div>
  );
};

export default Edit;

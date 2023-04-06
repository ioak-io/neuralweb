import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../model/NoteModel';
import { useParams } from 'react-router-dom';
import SectionContainer from '../ui/SectionContainer';
import EditControls from '../ui/EditControls';
import ViewControls from '../ui/ViewControls';
import EditTitle from './EditTitle';
import { getEditorConfig } from '../../../utils/EditorUtils';
import ViewTitle from './ViewTitle';
import { saveNote } from './service';
import EditContent from './EditContent';
import ViewContent from './ViewContent';

interface Props {
  note: NoteModel;
  space: string;
  onPostNoteSave: any;
}

const ContentSection = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [saving, setSaving] = useState(false);
  const params = useParams();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditContent, setIsEditContent] = useState(false);
  const [state, setState] = useState<NoteModel>({
    _id: '',
    content: '',
    folderId: '',
    name: '',
    reference: '',
    labels: []
  });
  const editor = getEditorConfig();

  useEffect(() => {
    setState(props.note);
  }, [props.note]);

  useEffect(() => {
    editor?.commands.setContent(props.note.content || '');
  }, [props.note.content, editor]);

  const onCancelTitle = () => {
    reset();
    setIsEditTitle(false);
  }
  const onCancelContent = () => {
    reset();
    setIsEditContent(false);
  }

  const reset = () => {
    setState({ ...props.note });
    editor?.commands.setContent(props.note.content || '');
  }

  const onEditTitle = () => {
    setIsEditTitle(true);
  }
  const onEditContent = () => {
    setIsEditContent(true);
  }

  const onSave = () => {
    setSaving(true);
    saveNote(props.space, { ...state, content: editor?.getHTML() }, authorization).then((response) => {
      props.onPostNoteSave(response);
      setIsEditContent(false);
      setIsEditTitle(false);
      setSaving(false);
    }).catch(() => setSaving(false));
  }

  const handleEditStateChange = (_note: NoteModel) => {
    setState({
      ..._note
    });
  }

  return (
    <div className='note-content-section'>
    <SectionContainer>
      {isEditTitle && <EditControls onCancel={onCancelTitle} onSave={onSave} saving={saving} />}
      {!isEditTitle && <ViewControls onEdit={onEditTitle} />}
      {isEditTitle && <EditTitle note={state} space={props.space} editor={editor} onChange={handleEditStateChange} />}
      {!isEditTitle && <ViewTitle note={props.note} space={props.space} />}
    </SectionContainer>
      <SectionContainer>
        {isEditContent && <EditControls onCancel={onCancelContent} onSave={onSave} saving={saving} />}
        {!isEditContent && <ViewControls onEdit={onEditContent} />}
        {isEditContent && <EditContent note={state} space={props.space} editor={editor} onChange={handleEditStateChange} />}
        {!isEditContent && <ViewContent note={props.note} space={props.space} />}
      </SectionContainer>
    </div>
  );
};

export default ContentSection;

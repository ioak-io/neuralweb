import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../model/NoteModel';
import { useParams } from 'react-router-dom';
import SectionContainer from '../ui/SectionContainer';
import EditControls from '../ui/EditControls';
import ViewControls from '../ui/ViewControls';
import { getEditorConfig } from '../../../utils/EditorUtils';
import { saveNote } from './service';
import HeadEditor from '../sections/HeadEditor';
import HeadViewer from '../sections/HeadViewer';
import ContentEditor from '../sections/ContentEditor';
import ContentViewer from '../sections/ContentViewer';
import MetadataEditor from '../sections/MetadataEditor';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';

interface Props {
  note: NoteModel;
  space: string;
  onPostNoteSave: any;
}

const ContentSection = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition.items);
  const [metadataDefinitionMap, setMetadataDefinitionMap] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const params = useParams();
  const [isEditHead, setIsEditHead] = useState(false);
  const [isEditContent, setIsEditContent] = useState(false);
  const [isEditMetadata, setIsEditMetadata] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);
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

  useEffect(() => {
    const _metadataDefinitionMap: any = {};
    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      if (_metadataDefinitionMap[item.group]) {
        _metadataDefinitionMap[item.group].push(item);
      } else {
        _metadataDefinitionMap[item.group] = [item];
      }
    })
    setMetadataDefinitionMap(_metadataDefinitionMap);
  }, [metadataDefinitionList]);

  const onCancelHead = () => {
    reset();
    setIsEditHead(false);
    setIsEdit(false);
  }
  const onCancelContent = () => {
    reset();
    setIsEditContent(false);
    setIsEdit(false);
  }
  const onCancelMetadata = (group: string) => {
    reset();
    setIsEditMetadata({});
    setIsEdit(false);
  }

  const reset = () => {
    setState({ ...props.note });
    editor?.commands.setContent(props.note.content || '');
  }

  const onEditHead = () => {
    setIsEditHead(true);
    setIsEdit(true);
  }
  const onEditContent = () => {
    setIsEditContent(true);
    setIsEdit(true);
  }
  const onEditMetadata = (group: string) => {
    setIsEditMetadata({ [group]: true });
    setIsEdit(true);
  }

  const onSave = () => {
    setSaving(true);
    saveNote(props.space, { ...state, content: editor?.getHTML() }, authorization).then((response) => {
      props.onPostNoteSave(response);
      setIsEditContent(false);
      setIsEditHead(false);
      setIsEditMetadata({});
      setIsEdit(false);
      setSaving(false);
    }).catch(() => setSaving(false));
  }

  const handleEditStateChange = (_note: NoteModel) => {
    console.log(_note);
    setState({
      ..._note
    });
  }

  return (
    <div className='note-content-section'>
      <SectionContainer>
        {isEditHead && <EditControls onCancel={onCancelHead} onSave={onSave} saving={saving} />}
        {!isEditHead && <ViewControls onEdit={onEditHead} disable={isEdit} />}
        {isEditHead && <HeadEditor note={state} onChange={handleEditStateChange} />}
        {!isEditHead && <HeadViewer note={props.note} />}
      </SectionContainer>
      <SectionContainer>
        {isEditContent && <EditControls onCancel={onCancelContent} onSave={onSave} saving={saving} />}
        {!isEditContent && <ViewControls onEdit={onEditContent} disable={isEdit} />}
        {isEditContent && <ContentEditor note={state} editor={editor} />}
        {!isEditContent && <ContentViewer note={props.note} />}
      </SectionContainer>
      {Object.keys(metadataDefinitionMap).map(group =>
        <SectionContainer>
          {isEditMetadata[group] && <EditControls onCancel={() => onCancelMetadata(group)} onSave={onSave} saving={saving} />}
          {!isEditMetadata[group] && <ViewControls onEdit={() => onEditMetadata(group)} disable={isEdit} />}
          {isEditMetadata[group] && <MetadataEditor onChange={handleEditStateChange} note={state} group={group} metadataDefinitionList={metadataDefinitionMap[group]} />}
        </SectionContainer>
      )}
    </div>
  );
};

export default ContentSection;

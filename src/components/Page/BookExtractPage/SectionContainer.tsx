import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SectionContainer.scss";
import Topbar from "../../../components/Topbar";
import { useParams } from "react-router-dom";
import { updateExtract } from "./service";
import ExtractModel from "../../../model/ExtractModel";
import EditControls from "../../../components/Note/ui/EditControls";
import ViewControls from "../../../components/Note/ui/ViewControls";
import { cloneDeep } from "lodash";
import HeadEditor from "./HeadEditor";
import { getEditorConfig } from "../../../utils/EditorUtils";
import HeadViewer from "./HeadViewer";

interface Props {
  space: string;
  extract: ExtractModel;
  onRefresh: any;
}

const SectionContainer = (props: Props) => {
  const editor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<ExtractModel>({
    name: "",
    text: "",
  });

  useEffect(() => {
    setState({ ...props.extract });
    editor?.commands.setContent(props.extract.text);
  }, [props.extract]);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCancelHead = () => {
    reset();
    setIsEdit(false);
  };

  const reset = () => {
    setState(cloneDeep(props.extract));
  };

  const onSave = (event: any) => {
    setSaving(true);
    updateExtract(
      props.space,
      params.bookref || "",
      state._id || "",
      { ...state, text: editor?.getHTML() },
      authorization
    )
      .then((response: any) => {
        props.onRefresh();
        setIsEdit(false);
        setSaving(false);
      })
      .catch(() => setSaving(false));
  };

  // const saveChanges = () => {
  //   saveNote(props.space, state, authorization).then((response: any) => {
  //     if (response) {
  //       setState(response);
  //       setView('view');
  //     }
  //   });
  // };

  const onChange = (event: ExtractModel) => {
    setState(event);
  };

  return (
    <div className="extract-section-container">
      {isEdit && (
        <EditControls onCancel={onCancelHead} onSave={onSave} saving={saving} />
      )}
      {!isEdit && (
        <ViewControls
          onEdit={onEdit}
          // onRemove={onDelete}
          // disable={isEdit}
          disable={false}
        />
      )}
      {isEdit && (
        <HeadEditor
          space={props.space}
          extract={state}
          onChange={onChange}
          editor={editor}
        />
      )}
      {!isEdit && <HeadViewer extract={props.extract} />}
    </div>
  );
};

export default SectionContainer;

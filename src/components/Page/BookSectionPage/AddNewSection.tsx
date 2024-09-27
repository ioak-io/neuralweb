import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddNewSection.scss";
import { useNavigate, useParams } from "react-router-dom";
import HeadEditor from "./HeadEditor";
import SectionModel from "../../../model/SectionModel";
import { createSection } from "./service";
import { getEditorConfig } from "../../../utils/EditorUtils";
import EditControls from "../../../components/Note/ui/EditControls";
import ViewControls from "../../../components/Note/ui/ViewControls";
import { isEmptyOrSpaces } from "../../../components/Utils";

interface Props {
  space: string;
  onRefresh: any;
}

const AddNewSection = (props: Props) => {
  const params = useParams();
  const editor = getEditorConfig();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<SectionModel>({
    title: "",
    description: "",
  });

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCancelHead = () => {
    reset();
    setIsEdit(false);
  };

  const reset = () => {
    setState({ description: "", title: "" });
  };

  useEffect(() => {
    editor?.commands.setContent(state.description);
  }, [state]);

  const onSave = (event: any) => {
    if (isEmptyOrSpaces(state.title)) {
      return;
    }
    setSaving(true);
    createSection(
      props.space,
      params.bookref || "",
      { ...state, description: editor?.getHTML() || "" },
      authorization
    )
      .then((response) => {
        props.onRefresh();
        setIsEdit(false);
        setSaving(false);
      })
      .catch(() => setSaving(false));
  };

  const onChange = (event: any) => {
    setState({ ...state, ...event });
  };

  return (
    <div className="book-section-add-new-section">
      {isEdit && (
        <EditControls onCancel={onCancelHead} onSave={onSave} saving={saving} />
      )}
      {!isEdit && <ViewControls onAdd={onEdit} disable={false} />}
      {isEdit && (
        <HeadEditor
          space={props.space}
          section={state}
          onChange={onChange}
          editor={editor}
        />
      )}
    </div>
  );
};

export default AddNewSection;

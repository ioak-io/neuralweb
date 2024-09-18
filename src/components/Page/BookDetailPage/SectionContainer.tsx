import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SectionContainer.scss";
import Topbar from "../../../components/Topbar";
import { useParams } from "react-router-dom";
import MainSection from "../../../components/MainSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { isEmptyAttributes, isEmptyOrSpaces } from "../../../components/Utils";
import { updateBookdetail } from "./service";
import EditControls from "../../../components/Note/ui/EditControls";
import ViewControls from "../../../components/Note/ui/ViewControls";
import { cloneDeep } from "lodash";
import HeadEditor from "./HeadEditor";
import { getEditorConfig } from "../../../utils/EditorUtils";
import BookDetailModel from "../../../model/BookDetailModel";
import { getSectionType } from "./SectionTypes";

interface Props {
  space: string;
  bookdetail: BookDetailModel;
  onRefresh: any;
}

const SectionContainer = (props: Props) => {
  const editor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<BookDetailModel>({
    content: "",
    type: "",
  });

  useEffect(() => {
    setState({ ...props.bookdetail });
  }, [props.bookdetail]);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCancelHead = () => {
    reset();
    setIsEdit(false);
  };

  const reset = () => {
    setState(cloneDeep(props.bookdetail));
  };

  useEffect(() => {
    editor?.commands.setContent(props.bookdetail.content);
    console.log(props.bookdetail.content);
  }, [props.bookdetail]);

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    updateBookdetail(
      props.space,
      props.bookdetail._id || "",
      { ...state, content: editor?.getHTML() },
      authorization
    )
      .then((response) => {
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

  const onChange = (event: any) => {
    setState({ ...state, ...event });
  };

  return (
    <div className="bookdetail-section-container">
      {isEdit && (
        <EditControls onCancel={onCancelHead} onSave={onSave} saving={saving} />
      )}
      {!isEdit && (
        <ViewControls
          onEdit={onEdit}
          // onRemove={onDelete}
          // disable={isEdit}
          disable={false}
          // onPrint={onPrint}
          // textToSpeak={props.bookdetail.content?.replace(/<[^>]+>/g, "")}
        />
      )}
      {isEdit && (
        <HeadEditor
          space={props.space}
          bookdetail={state}
          onChange={onChange}
          editor={editor}
        />
      )}
      {!isEdit && (
        <div>
          <h4>{getSectionType(props.bookdetail.type)?.description}</h4>
          <div
            dangerouslySetInnerHTML={{
              __html: props.bookdetail.content || "",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SectionContainer;

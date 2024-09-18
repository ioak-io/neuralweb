import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SectionContainer.scss";
import Topbar from "../../../components/Topbar";
import { useParams } from "react-router-dom";
import MainSection from "../../../components/MainSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { isEmptyAttributes, isEmptyOrSpaces } from "../../../components/Utils";
import {
  generateThemeSectionHead,
  getThemeDetailList,
  saveTheme,
  updateThemeDetail,
} from "./service";
import ThemeModel from "../../../model/ThemeModel";
import EditControls from "../../../components/Note/ui/EditControls";
import ViewControls from "../../../components/Note/ui/ViewControls";
import { cloneDeep } from "lodash";
import HeadEditor from "./HeadEditor";
import { getEditorConfig } from "../../../utils/EditorUtils";
import HeadViewer from "./HeadViewer";
import ThemeDetailModel from "../../../model/ThemeDetailModel";
import { getSectionType } from "./SectionTypes";

interface Props {
  space: string;
  theme: ThemeModel;
  themeDetail: ThemeDetailModel;
  onRefresh: any;
}

const SectionContainer = (props: Props) => {
  const editor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<ThemeDetailModel>({
    content: "",
    type: "",
  });

  useEffect(() => {
    setState({ ...props.themeDetail });
  }, [props.themeDetail]);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCancelHead = () => {
    reset();
    setIsEdit(false);
  };

  const reset = () => {
    setState(cloneDeep(props.themeDetail));
  };

  useEffect(() => {
    editor?.commands.setContent(props.themeDetail.content);
    console.log(props.themeDetail.content);
  }, [props.themeDetail]);

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    updateThemeDetail(
      props.space,
      props.themeDetail._id || "",
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
    <div className="theme-section-container">
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
          // textToSpeak={props.themeDetail.content?.replace(/<[^>]+>/g, "")}
        />
      )}
      {isEdit && (
        <HeadEditor
          space={props.space}
          theme={state}
          onChange={onChange}
          editor={editor}
        />
      )}
      {!isEdit && (
        <div>
          {props.themeDetail.type !== "summary" && (
            <h4>{getSectionType(props.themeDetail.type)?.description}</h4>
          )}

          {props.themeDetail.type === "summary" && <h3>{props.theme.title}</h3>}
          <div
            dangerouslySetInnerHTML={{
              __html: props.themeDetail.content || "",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SectionContainer;

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
  generateChapterSectionHead,
  getChapterDetailList,
  saveChapter,
} from "./service";
import ChapterModel from "../../../model/ChapterModel";
import EditControls from "../../../components/Note/ui/EditControls";
import ViewControls from "../../../components/Note/ui/ViewControls";
import { cloneDeep } from "lodash";
import HeadEditor from "./HeadEditor";
import { getEditorConfig } from "../../../utils/EditorUtils";
import HeadViewer from "./HeadViewer";
import ChapterDetailModel from "../../../model/ChapterDetailModel";
import { getSectionType } from "./SectionTypes";

interface Props {
  space: string;
  chapterDetail: ChapterDetailModel;
  onRefresh: any;
}

const SectionContainer = (props: Props) => {
  const editor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [chapterDetail, setChapterDetail] = useState<ChapterDetailModel>();
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<ChapterDetailModel>({
    content: "",
    type: "",
  });

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCancelHead = () => {
    reset();
    setIsEdit(false);
  };

  const reset = () => {
    setState(cloneDeep(props.chapterDetail));
  };

  useEffect(() => {
    editor?.commands.setContent(props.chapterDetail.content);
    console.log(props.chapterDetail.content);
  }, [props.chapterDetail]);

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    saveChapter(props.space, { ...state }, authorization)
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
    console.log(event);
  };

  return (
    <div className="chapter-section-container">
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
        />
      )}
      {isEdit && (
        <HeadEditor
          space={props.space}
          chapter={state}
          onChange={onChange}
          editor={editor}
        />
      )}
      {!isEdit && (
        <div>
          {props.chapterDetail.type !== "CUSTOM_MANAGED" &&
            props.chapterDetail.type !== "CUSTOM" && (
              <h4>{getSectionType(props.chapterDetail.type)?.description}</h4>
            )}
          {(props.chapterDetail.type === "CUSTOM_MANAGED" ||
            props.chapterDetail.type === "CUSTOM") && (
            <h4>{props.chapterDetail.customTitle}</h4>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: props.chapterDetail.content || "",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SectionContainer;

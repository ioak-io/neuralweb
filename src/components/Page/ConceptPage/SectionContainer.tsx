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
  generateConceptSectionHead,
  getConceptDetailList,
  saveConcept,
} from "./service";
import ConceptModel from "../../../model/ConceptModel";
import EditControls from "../../../components/Note/ui/EditControls";
import ViewControls from "../../../components/Note/ui/ViewControls";
import { cloneDeep } from "lodash";
import HeadEditor from "./HeadEditor";
import { getEditorConfig } from "../../../utils/EditorUtils";
import HeadViewer from "./HeadViewer";
import ConceptDetailModel from "../../../model/ConceptDetailModel";
import { getSectionType } from "./SectionTypes";

interface Props {
  space: string;
  conceptDetail: ConceptDetailModel;
  onRefresh: any;
}

const SectionContainer = (props: Props) => {
  const editor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [conceptDetail, setConceptDetail] = useState<ConceptDetailModel>();
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<ConceptDetailModel>({
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
    setState(cloneDeep(props.conceptDetail));
  };

  useEffect(() => {
    editor?.commands.setContent(props.conceptDetail.content);
    console.log(props.conceptDetail.content);
  }, [props.conceptDetail]);

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    saveConcept(props.space, { ...state }, authorization)
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
    <div className="concept-section-container">
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
          textToSpeak={props.conceptDetail.content?.replace(/<[^>]+>/g, "")}
        />
      )}
      {isEdit && (
        <HeadEditor
          space={props.space}
          concept={state}
          onChange={onChange}
          editor={editor}
        />
      )}
      {!isEdit && (
        <div>
          {props.conceptDetail.type !== "CUSTOM_MANAGED" &&
            props.conceptDetail.type !== "CUSTOM" && (
              <h4>{getSectionType(props.conceptDetail.type)?.description}</h4>
            )}
          {(props.conceptDetail.type === "CUSTOM_MANAGED" ||
            props.conceptDetail.type === "CUSTOM") && (
            <h4>{props.conceptDetail.customTitle}</h4>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: props.conceptDetail.content || "",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SectionContainer;

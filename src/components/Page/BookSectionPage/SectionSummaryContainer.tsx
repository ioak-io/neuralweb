import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SectionSummaryContainer.scss";
import { useParams } from "react-router-dom";
import ViewControls from "../../../components/Note/ui/ViewControls";
import { getEditorConfig } from "../../../utils/EditorUtils";

interface Props {
  children: any;
  onGenerateSections: any;
  isGenerating: boolean;
}

const SectionSummaryContainer = (props: Props) => {
  const editor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="book-section-section-summary-container">
      <ViewControls
        // onEdit={onEdit}
        // onRemove={onDelete}
        // disable={isEdit}
        disable={props.isGenerating}
        onGenerate={props.onGenerateSections}
        // onPrint={onPrint}
        // textToSpeak={props.bookSectionDetail.content?.replace(/<[^>]+>/g, "")}
      />
      <div>{props.children}</div>
    </div>
  );
};

export default SectionSummaryContainer;

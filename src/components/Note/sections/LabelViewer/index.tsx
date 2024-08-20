import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import NoteModel from "../../../../model/NoteModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Label } from "basicui";
import KeywordViewer from "../KeywordViewer";

interface Props {
  note: NoteModel;
}

const LabelViewer = (props: Props) => {
  return (
    <div className="label-viewer-container">
      <div>
        <Label>Labels</Label>
        {props.note.labels.length > 0 && (
          <div className="label-viewer">
            <div className="note-label-list">
              {props.note.primaryLabel && (
                <div className="note-label">
                  {props.note.primaryLabel} <FontAwesomeIcon icon={faStar} />
                </div>
              )}
              {props.note.labels
                ?.filter((item) => item !== props.note.primaryLabel)
                .map((label) => (
                  <div className="note-label">
                    {props.note.primaryLabel === label && (
                      <FontAwesomeIcon icon={faStar} />
                    )}
                    {label}
                  </div>
                ))}
            </div>
          </div>
        )}
        {props.note.labels.length === 0 && "-"}
      </div>

      <div>
        <Label>Keywords</Label>
        <KeywordViewer keywords={props.note.keywords} />
      </div>
    </div>
  );
};

export default LabelViewer;

import {
  faDownload,
  faFileArrowDown,
  faFileDownload,
  faMinus,
  faPenClip,
  faPlus,
  faPrint,
  faTrashAlt,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonVariantType, IconButton, ThemeType } from "basicui";
import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import TextToSpeech from "../../../../components/TextToSpeech";

interface Props {
  onEdit?: any;
  onRemove?: any;
  disable: boolean;
  onAdd?: any;
  onPrint?: any;
  textToSpeak?: string;
  onGenerate?: any;
}

const ViewControls = (props: Props) => {
  return (
    <div className="note-section-view-controls">
      {props.onEdit && (
        <IconButton
          disabled={props.disable}
          onClick={props.onEdit}
          circle
          variant={ButtonVariantType.fill}
          theme={ThemeType.default}
        >
          <FontAwesomeIcon icon={faPenClip} />
        </IconButton>
      )}
      {props.onAdd && (
        <IconButton
          disabled={props.disable}
          onClick={props.onAdd}
          circle
          variant={ButtonVariantType.fill}
          theme={ThemeType.default}
        >
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      )}
      {props.onGenerate && (
        <IconButton
          disabled={props.disable}
          onClick={props.onGenerate}
          circle
          variant={ButtonVariantType.fill}
          theme={ThemeType.default}
        >
          <FontAwesomeIcon icon={faWandMagicSparkles} />
        </IconButton>
      )}
      {props.onRemove && (
        <IconButton
          disabled={props.disable}
          onClick={props.onRemove}
          circle
          variant={ButtonVariantType.fill}
          theme={ThemeType.default}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      )}
      {props.onPrint && (
        <IconButton
          disabled={props.disable}
          onClick={props.onPrint}
          circle
          variant={ButtonVariantType.fill}
          theme={ThemeType.default}
        >
          <FontAwesomeIcon icon={faDownload} />
        </IconButton>
      )}
      {props.textToSpeak && <TextToSpeech text={props.textToSpeak} />}
    </div>
  );
};

export default ViewControls;

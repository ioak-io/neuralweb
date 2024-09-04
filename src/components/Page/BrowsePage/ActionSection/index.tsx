import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "../ui/ActionButton";
import {
  faCheck,
  faCodeMerge,
  faEye,
  faLayerGroup,
  faPaperPlane,
  faPen,
  faSearch,
  faTrashAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { BrowseHistoryType } from "../types/BrowseHistoryType";
import {
  AlignmentType,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ThemeType,
} from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  space: string;
  onPreview: any;
  onFindSimilar: any;
  onDelete: any;
  browseHistory: BrowseHistoryType;
}

const ActionSection = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  const onDelete = () => {
    setShowDeletePrompt(true);
  };

  return (
    <>
      <div className="browse-page-action-section">
        {props.browseHistory.selectedNoteIds.length === 1 && (
          <ActionButton
            icon={faEye}
            label="Preview"
            onClick={props.onPreview}
          />
        )}
        {props.browseHistory.selectedNoteIds.length > 0 && (
          <ActionButton icon={faTrashAlt} label="Delete" onClick={onDelete} />
        )}
        {props.browseHistory.selectedNoteIds.length > 1 && (
          <ActionButton icon={faCodeMerge} label="Merge" onClick={() => {}} />
        )}
        {props.browseHistory.selectedNoteIds.length > 0 && (
          <ActionButton
            icon={faSearch}
            label="Similar"
            onClick={props.onFindSimilar}
          />
        )}
      </div>

      <Modal
        isOpen={showDeletePrompt}
        onClose={() => setShowDeletePrompt(false)}
      >
        <ModalBody>Are you sure you want to delete?</ModalBody>
        <ModalFooter alignment={AlignmentType.default}>
          <Button onClick={props.onDelete} theme={ThemeType.danger}>
            <FontAwesomeIcon icon={faCheck} />
            Yes, delete
          </Button>
          <Button onClick={() => setShowDeletePrompt(false)}>
            <FontAwesomeIcon icon={faXmark} />
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ActionSection;

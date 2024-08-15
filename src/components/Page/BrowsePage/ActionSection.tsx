import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ActionSection.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "./ActionButton";
import {
  faCodeMerge,
  faEye,
  faLayerGroup,
  faPaperPlane,
  faPen,
  faSearch,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  space: string;
}

const ActionSection = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  return (
    <div className="browse-page-action-section">
      <ActionButton icon={faEye} label="Preview" onClick={() => {}} />
      <ActionButton icon={faTrashAlt} label="Delete" onClick={() => {}} />
      <ActionButton icon={faCodeMerge} label="Merge" onClick={() => {}} />
      <ActionButton icon={faSearch} label="Similar" onClick={() => {}} />
    </div>
  );
};

export default ActionSection;

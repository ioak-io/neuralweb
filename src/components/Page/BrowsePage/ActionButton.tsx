import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ActionButton.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  icon: any;
  label: any;
  onClick: any;
}

const ActionButton = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  return (
    <button className="action-button" onClick={props.onClick}>
      <div className="action-button__icon">
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <div className="action-button__label">{props.label}</div>
    </button>
  );
};

export default ActionButton;

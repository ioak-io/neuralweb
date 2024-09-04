import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomeActionButton.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  icon?: any;
  label: any;
  onClick: any;
}

const HomeActionButton = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  return (
    <button className="home-action-button" onClick={props.onClick}>
      {props.icon && (
        <div className="home-action-button__icon">
          <FontAwesomeIcon icon={props.icon} />
        </div>
      )}
      <div className="home-action-button__label">{props.label}</div>
    </button>
  );
};

export default HomeActionButton;

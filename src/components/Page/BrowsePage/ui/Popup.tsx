import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Popup.scss";
import Topbar from "../../../../components/Topbar";
import { Button, ButtonVariantType, IconButton, ThemeType } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isExpanded: boolean;
  onClose: any;
  title?: string;
  children?: any;
}

const Popup = (props: Props) => {
  return (
    <div
      className={`browse-page-popup ${
        props.isExpanded
          ? "browse-page-popup--expanded"
          : "browse-page-popup--collapsed"
      }`}
    >
      <div className="browse-page-popup__header">
        <Topbar title={props.title || ""}>
          <IconButton variant={ButtonVariantType.outline} onClick={props.onClose} circle>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Topbar>
      </div>
      <div className="browse-page-popup__main">{props.children}</div>
    </div>
  );
};

export default Popup;

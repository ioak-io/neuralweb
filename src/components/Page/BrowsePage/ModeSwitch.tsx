import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ModeSwitch.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faFile,
  faFileAlt,
  faFileEdit,
  faFolderTree,
  faHashtag,
  faLayerGroup,
  faSearch,
  faStar,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { BrowseHistoryType } from "./BrowseHistoryType";
import { Button, ButtonVariantType, ThemeType } from "basicui";

interface Props {
  isBrowserMode: boolean;
  onChange: any;
}

const ModeSwitch = (props: Props) => {
  return (
    <div className="mode-switch">
      <Button
        onClick={() => props.onChange(true)}
        variant={
          props.isBrowserMode
            ? ButtonVariantType.transparent
            : ButtonVariantType.outline
        }
        // theme={ThemeType.primary}
        className={`mode-switch__button ${
          props.isBrowserMode
            ? "mode-switch__button--active"
            : "mode-switch__button--inactive"
        }`}
      >
        <FontAwesomeIcon icon={faFolderTree} /> Browser
      </Button>
      <Button
        onClick={() => props.onChange(false)}
        variant={
          props.isBrowserMode
            ? ButtonVariantType.outline
            : ButtonVariantType.transparent
        }
        // theme={ThemeType.primary}
        className={`mode-switch__button ${
          props.isBrowserMode
            ? "mode-switch__button--inactive"
            : "mode-switch__button--active"
        }`}
      >
        Editor <FontAwesomeIcon icon={faFileEdit} />
      </Button>
    </div>
  );
};

export default ModeSwitch;

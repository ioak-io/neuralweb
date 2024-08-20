import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faFile,
  faHashtag,
  faLayerGroup,
  faSearch,
  faStar,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { BrowseHistoryType } from "./BrowseHistoryType";
import { Button, ButtonVariantType, ThemeType } from "basicui";

interface Props {
  space: string;
  browsehistory: BrowseHistoryType[];
  back: any;
  onNewNote: any;
  showInfo: boolean;
}

const Header = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="browse-page-header">
      <div className="browse-page-header__top">
        <div className="browse-page-header__top__left">
          {props.browsehistory.length > 0 &&
            props.browsehistory[props.browsehistory.length - 1].view !==
              "home" && (
              <Button onClick={props.back} variant={ButtonVariantType.outline}>
                <FontAwesomeIcon icon={faChevronLeft} /> Back
              </Button>
            )}
        </div>
        <div className="browse-page-header__top__right">
          <Button
            onClick={props.onNewNote}
            variant={ButtonVariantType.outline}
            theme={ThemeType.default}
          >
            <FontAwesomeIcon icon={faFile} /> New note
          </Button>
        </div>
      </div>

      {(props.browsehistory.length === 0 ||
        props.browsehistory[props.browsehistory.length - 1].view ===
          "home") && <div />}

      {props.showInfo && props.browsehistory.length > 0 &&
        props.browsehistory[props.browsehistory.length - 1].view !== "home" && (
          <div className="browse-page-header__bottom">
            <div className="browse-page-header__bottom__left">
              {props.browsehistory.length > 0 && (
                <>
                  {props.browsehistory[props.browsehistory.length - 1].view ===
                    "note" &&
                    props.browsehistory[props.browsehistory.length - 1]
                      .metadataId === "primaryLabel" && (
                      <FontAwesomeIcon icon={faStar} />
                    )}
                  {props.browsehistory[props.browsehistory.length - 1].view ===
                    "note" &&
                    props.browsehistory[props.browsehistory.length - 1]
                      .metadataId === "labels" && (
                      <FontAwesomeIcon icon={faTags} />
                    )}
                  {props.browsehistory[props.browsehistory.length - 1].view ===
                    "note" &&
                    props.browsehistory[props.browsehistory.length - 1]
                      .metadataId === "keywords" && (
                      <FontAwesomeIcon icon={faHashtag} />
                    )}
                  {props.browsehistory[props.browsehistory.length - 1].view ===
                    "note" &&
                    !["primaryLabel", "labels", "keywords", "related"].includes(
                      props.browsehistory[props.browsehistory.length - 1]
                        .metadataId || ""
                    ) && <FontAwesomeIcon icon={faLayerGroup} />}
                  {props.browsehistory[props.browsehistory.length - 1].view ===
                    "note" &&
                    props.browsehistory[props.browsehistory.length - 1]
                      .metadataId === "related" && (
                      <FontAwesomeIcon icon={faSearch} />
                    )}
                  <div>
                    {
                      props.browsehistory[props.browsehistory.length - 1]
                        .pageHeading
                    }
                  </div>
                </>
              )}
              {props.browsehistory.length === 0 && <div>Home</div>}
            </div>

            {props.browsehistory.length > 0 &&
              props.browsehistory[props.browsehistory.length - 1].view ===
                "note" &&
              props.browsehistory[props.browsehistory.length - 1]
                .selectedNoteIds.length > 0 && (
                <div className="browse-page-header__bottom__right">
                  {`${
                    props.browsehistory[props.browsehistory.length - 1]
                      .selectedNoteIds.length
                  } notes selected`}
                </div>
              )}
          </div>
        )}
    </div>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NoteListItem.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteModel from "src/model/NoteModel";
import DateDisplay from "./DateDisplay";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  note: NoteModel;
  isSelected: boolean;
  onClick: any;
  isPartOfSearch?: boolean;
}

const NoteListItem = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  return (
    <button
      className={`browse-page-notelistitem ${
        props.isSelected
          ? "browse-page-notelistitem--selected"
          : "browse-page-notelistitem--not-selected"
      }`}
      onClick={props.onClick}
    >
      <div className="browse-page-notelistitem-container">
        <div className="browse-page-notelistitem__left">
          <DateDisplay date={props.note.createdAt} />
        </div>
        <div className="browse-page-notelistitem__right">
          <div className="browse-page-notelistitem__right__title">
            {props.isPartOfSearch && (
              <>
                <FontAwesomeIcon icon={faSearch} />
                &nbsp;
              </>
            )}
            {props.note.name}
          </div>
          <div className="browse-page-notelistitem__right__subtitle">
            {props.note.summary}
          </div>
        </div>
      </div>
    </button>
  );
};

export default NoteListItem;

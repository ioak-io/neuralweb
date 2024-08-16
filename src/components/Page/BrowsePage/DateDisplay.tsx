import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DateDisplay.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteModel from "src/model/NoteModel";

interface Props {
  date: any;
}

const DateDisplay = (props: Props) => {
  return (
    <div className="browse-page-datedisplay">
      <div className="browse-page-datedisplay__day">
        {new Date(props.date)
          .toLocaleDateString("en-US", { weekday: "short" })
          .toUpperCase()}
      </div>
      <div className="browse-page-datedisplay__date">
        {new Date(props.date).getDate()}
      </div>
    </div>
  );
};

export default DateDisplay;

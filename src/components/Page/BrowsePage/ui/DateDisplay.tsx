import React, { useEffect, useRef, useState } from "react";
import "./DateDisplay.scss";

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

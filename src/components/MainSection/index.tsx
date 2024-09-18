import React, { useEffect, useState } from "react";
import "./style.scss";

interface Props {
  children?: any;
  shortWidth?: boolean;
}

const MainSection = (props: Props) => {
  return (
    <div
      className={`main-section ${
        props.shortWidth ? "main-section--short" : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default MainSection;

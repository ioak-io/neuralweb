import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import ExtractModel from "../../../../model/ExtractModel";

interface Props {
  extract: ExtractModel;
}

const HeadViewer = (props: Props) => {
  return (
    <div className="head-viewer">
      <div>{props.extract.name}</div>
      <div dangerouslySetInnerHTML={{ __html: props.extract.text || "" }} />
    </div>
  );
};

export default HeadViewer;

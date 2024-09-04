import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { isEmptyOrSpaces } from "../../../../components/Utils";
import ConceptModel from "../../../../model/ConceptModel";

interface Props {
  concept: ConceptModel;
}

const HeadViewer = (props: Props) => {

  return (
    <div className="head-viewer">
      <div>
        {/* <Label>Name</Label> */}
        <div className="head-viewer__title">
          <h4>{props.concept.name}</h4>
          {/* {!isEmptyOrSpaces(props.concept.contentText) && (
            <div
              dangerouslySetInnerHTML={{ __html: props.concept.content || "" }}
            />
          )}
          {isEmptyOrSpaces(props.concept.contentText) && "-"} */}
        </div>
      </div>
    </div>
  );
};

export default HeadViewer;

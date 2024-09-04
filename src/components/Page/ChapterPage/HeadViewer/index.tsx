import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { isEmptyOrSpaces } from "../../../../components/Utils";
import ChapterModel from "../../../../model/ChapterModel";

interface Props {
  chapter: ChapterModel;
}

const HeadViewer = (props: Props) => {

  return (
    <div className="head-viewer">
      <div>
        {/* <Label>Name</Label> */}
        <div className="head-viewer__title">
          <h4>{props.chapter.name}</h4>
          {/* {!isEmptyOrSpaces(props.chapter.contentText) && (
            <div
              dangerouslySetInnerHTML={{ __html: props.chapter.content || "" }}
            />
          )}
          {isEmptyOrSpaces(props.chapter.contentText) && "-"} */}
        </div>
      </div>
    </div>
  );
};

export default HeadViewer;

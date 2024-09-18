import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { isEmptyOrSpaces } from "../../../../components/Utils";
import ThemeModel from "../../../../model/ThemeModel";

interface Props {
  theme: ThemeModel;
}

const HeadViewer = (props: Props) => {

  return (
    <div className="head-viewer">
      <div>
        {/* <Label>Name</Label> */}
        <div className="head-viewer__title">
          <h4>{props.theme.name}</h4>
          {/* {!isEmptyOrSpaces(props.theme.contentText) && (
            <div
              dangerouslySetInnerHTML={{ __html: props.theme.content || "" }}
            />
          )}
          {isEmptyOrSpaces(props.theme.contentText) && "-"} */}
        </div>
      </div>
    </div>
  );
};

export default HeadViewer;

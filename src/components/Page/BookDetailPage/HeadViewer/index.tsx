import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { isEmptyOrSpaces } from "../../../../components/Utils";
import BookDetailModel from "../../../../model/BookDetailModel";

interface Props {
  bookdetail: BookDetailModel;
}

const HeadViewer = (props: Props) => {

  return (
    <div className="head-viewer">
      <div>
        {/* <Label>Name</Label> */}
        <div className="head-viewer__title">
          <h4>{props.bookdetail.name}</h4>
          {/* {!isEmptyOrSpaces(props.bookdetail.contentText) && (
            <div
              dangerouslySetInnerHTML={{ __html: props.bookdetail.content || "" }}
            />
          )}
          {isEmptyOrSpaces(props.bookdetail.contentText) && "-"} */}
        </div>
      </div>
    </div>
  );
};

export default HeadViewer;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { isEmptyOrSpaces } from "../../../../components/Utils";
import BookSectionDetailModel from "../../../../model/BookSectionDetailModel";

interface Props {
  bookSectionDetail: BookSectionDetailModel;
}

const HeadViewer = (props: Props) => {

  return (
    <div className="head-viewer">
      <div>
        {/* <Label>Name</Label> */}
        <div className="head-viewer__title">
          <h4>{props.bookSectionDetail.name}</h4>
          {/* {!isEmptyOrSpaces(props.bookSectionDetail.contentText) && (
            <div
              dangerouslySetInnerHTML={{ __html: props.bookSectionDetail.content || "" }}
            />
          )}
          {isEmptyOrSpaces(props.bookSectionDetail.contentText) && "-"} */}
        </div>
      </div>
    </div>
  );
};

export default HeadViewer;

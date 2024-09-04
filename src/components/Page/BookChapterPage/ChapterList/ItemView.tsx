import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ItemView.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IconButton } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faBookReader,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import ChapterModel from "../../../../model/ChapterModel";

interface Props {
  space: string;
  chapter: ChapterModel;
}

const ItemView = (props: Props) => {
  const navigate = useNavigate();

  const onOpen = () => {
    navigate(`/${props.space}/book/${props.chapter.bookref}/chapter/${props.chapter.reference}`);
  };

  return (
    <div className="chapter-list-item-view">
      <div>{props.chapter.name}</div>
      <div>
        <IconButton circle onClick={onOpen}>
          <FontAwesomeIcon icon={faBookOpen} />
        </IconButton>
      </div>
    </div>
  );
};

export default ItemView;

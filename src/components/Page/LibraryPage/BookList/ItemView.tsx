import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ItemView.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getBooks, getChapters } from "../service";
import BookModel from "../../../../model/BookModel";
import { Button, IconButton } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faBookReader,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  space: string;
  book: BookModel;
}

const ItemView = (props: Props) => {
  const navigate = useNavigate();

  const onOpen = () => {
    navigate(`/${props.space}/book/${props.book.reference}/chapter`);
  };
  const onOpenConcept = () => {
    navigate(`/${props.space}/book/${props.book.reference}/concept`);
  };

  return (
    <div className="book-list-item-view">
      <div>{props.book.title}</div>
      <div>by {props.book.primaryAuthor}</div>
      <div>{props.book.description}</div>
      <div className="footer-actions position-right">
        <Button circle onClick={onOpen}>
          <FontAwesomeIcon icon={faFolderOpen} /> Chapters
        </Button>
        <Button circle onClick={onOpenConcept}>
          <FontAwesomeIcon icon={faBookOpen} /> Key concepts
        </Button>
      </div>
    </div>
  );
};

export default ItemView;

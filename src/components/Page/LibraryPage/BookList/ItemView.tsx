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
    navigate(`/${props.space}/book/${props.book.reference}`);
  };
  const onOpenConcept = () => {
    navigate(`/${props.space}/book/${props.book.reference}/concept`);
  };

  return (
    // <div className="book-list-item-view">
    //   <div>{props.book.title}</div>
    //   <div>by {props.book.primaryAuthor}</div>
    //   <div>{props.book.shortDescription}</div>
    //   <div className="footer-actions position-right">
    //     <Button circle onClick={onOpen}>
    //       <FontAwesomeIcon icon={faFolderOpen} /> Open
    //     </Button>
    //     <IconButton circle onClick={onOpenConcept}>
    //       <FontAwesomeIcon icon={faFolderOpen} />
    //     </IconButton>
    //   </div>
    // </div>
    // <div className="book-list-item-view">
    //   <div className="book-list-item-view__left">
    //     <div>{props.book.title}</div>
    //     <div>by {props.book.primaryAuthor}</div>
    //     <div>{props.book.shortDescription}</div>
    //   </div>
    //   <IconButton onClick={onOpen} circle>
    //     <FontAwesomeIcon icon={faFolderOpen} />
    //   </IconButton>
    // </div>

    <div className="book-list-item-view">
      <a
        rel="noopener noreferrer"
        title={props.book.title}
        href={`/#/${props.space}/book/${props.book.reference}`}
      >
        {`${props.book.title} (${props.book.primaryAuthor})`}
      </a>
    </div>
  );
};

export default ItemView;

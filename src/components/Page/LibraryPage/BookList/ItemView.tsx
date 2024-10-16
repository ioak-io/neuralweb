import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ItemView.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getBooks, getChapters } from "../service";
import BookModel from "../../../../model/BookModel";
import { Button, IconButton, Link, ThemeType } from "basicui";
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
    <div className="book-list-item-view">
      <Link href={`/#/${props.space}/book/${props.book.reference}`} theme={ThemeType.primary}>
        {`${props.book.title} (${props.book.primaryAuthor})`}
      </Link>
    </div>
  );
};

export default ItemView;

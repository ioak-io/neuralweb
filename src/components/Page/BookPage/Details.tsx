import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Details.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { generateConcepts, getBook } from "./service";
import Topbar from "../../../components/Topbar";
import { Button, ButtonVariantType, Input, ThemeType } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import ConceptModel from "../../../model/BookModel";
import BookModel from "../../../model/BookModel";
import ImageComponent from "./ImageComponent";

interface Props {
  space: string;
  book: BookModel;
}

const Details = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="book-page-details">
      <div>
        <h2>{props.book.title}</h2>
        <h5>
          <i>by {props.book.primaryAuthor}</i>
        </h5>
      </div>
      <div className="book-page-details__sources">
        <a
          rel="noopener noreferrer"
          title="Sources"
          href={`/#/${props.space}/book/${props.book.reference}/extract`}
        >
          0 sources
        </a>
        <a
          rel="noopener noreferrer"
          title="Sources"
          href={`/#/${props.space}/book/${props.book.reference}/concept`}
        >
          Key concepts
        </a>
      </div>
      <div>
        <p>Categories: {props.book.categories}</p>
        <p>{props.book.pageCount} pages</p>
      </div>
      <p>{props.book.description}</p>
      <div>
        <h4>About the author</h4>
        <p>{props.book.authorInfo}</p>
      </div>
    </div>
  );
};

export default Details;

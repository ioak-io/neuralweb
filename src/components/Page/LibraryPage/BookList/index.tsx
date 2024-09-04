import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getBooks, getChapters } from "../service";
import BookModel from "../../../../model/BookModel";
import ItemView from "./ItemView";

interface Props {
  space: string;
  books: BookModel[];
}

const BookList = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="book-list">
      {props.books.map((book) => (
        <ItemView key={book._id} space={props.space} book={book}/>
      ))}
    </div>
  );
};

export default BookList;

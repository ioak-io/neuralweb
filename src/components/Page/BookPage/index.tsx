import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { generateConcepts, getBook } from "./service";
import Topbar from "../../../components/Topbar";
import { Button, Input } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import ConceptModel from "../../../model/BookModel";
import BookModel from "../../../model/BookModel";
import HeroSection from "./HeroSection";
import Details from "./Details";

interface Props {
  location: any;
  space: string;
}

const BookPage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authorization.isAuth && params.bookref) {
      _refreshBook();
    }
  }, [authorization, params]);

  const _refreshBook = () => {
    getBook(props.space, params.bookref || "", authorization).then(
      (response) => {
        setBook(response);
      }
    );
  };

  return (
    <div className="page-animate">
      <MainSection>
        {book && (
          <div className="book-page">
            <div className="book-page__left">
              <HeroSection space={props.space} book={book} />
            </div>
            <div className="book-page__right">
              <Details space={props.space} book={book} />
            </div>
          </div>
        )}
      </MainSection>
    </div>
  );
};

export default BookPage;

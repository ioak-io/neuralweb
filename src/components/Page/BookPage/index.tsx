import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import "./style.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { generateConcepts, generateReport, getBook } from "./service";
import Topbar from "../../../components/Topbar";
import { Button, Input } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import ConceptModel from "../../../model/BookModel";
import BookModel from "../../../model/BookModel";
import HeroSection from "./HeroSection";
import Details from "./Details";
import { formatDate } from "../../../components/Lib/DateUtils";

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

  const onPrint = () => {
    setIsLoading(true);
    generateReport(props.space, params.bookref || "", authorization).then(
      (response) => {
        // const blob = new Blob([response], { type: "application/zip" });
        saveAs(
          `data:application/zip;base64,${response}`,
          `${book?.primaryAuthor} - ${book?.title}.zip`
        );
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="page-animate">
      <MainSection>
        {book && (
          <div className="book-page">
            <div className="book-page__left">
              <HeroSection
                space={props.space}
                book={book}
                onPrint={onPrint}
                isPrinting={isLoading}
              />
            </div>
            <div className="book-page__right">
              <Details
                space={props.space}
                book={book}
                onRefresh={_refreshBook}
              />
            </div>
          </div>
        )}
      </MainSection>
    </div>
  );
};

export default BookPage;

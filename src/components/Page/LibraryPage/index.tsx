import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getBooks, getChapters } from "./service";
import Topbar from "../../../components/Topbar";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
  ThemeType,
} from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronRight,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import BookList from "./BookList";
import BookModel from "../../../model/BookModel";
import NewBook from "./NewBook";

interface Props {
  location: any;
  space: string;
}

const LibraryPage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (authorization.isAuth) {
      _refreshBooks();
    }
  }, [authorization]);

  // useEffect(() => {
  //   if (authorization.isAuth && searchParams.has("id")) {
  //     getChapters(
  //       props.space,
  //       searchParams.get("id") || "",
  //       authorization
  //     ).then((response) => {
  //       setChapters(response);
  //     });
  //   }
  // }, [authorization, searchParams]);

  const _refreshBooks = () => {
    getBooks(props.space, authorization).then((response) => {
      setBooks(response);
    });
  };

  const closePopup = (isBookAdded: boolean) => {
    setIsOpen(false);
    if (isBookAdded) {
      _refreshBooks();
    }
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="page-animate">
        <Topbar title="Library">
          <div className="topbar-actions">
            <Button onClick={openPopup}>
              <FontAwesomeIcon icon={faPlus} />
              New book
            </Button>
          </div>
        </Topbar>
        <MainSection>
          <Input placeholder="Search text" onInput={() => {}} />
          <BookList space={props.space} books={books} />
        </MainSection>
      </div>
      <NewBook space={props.space} isOpen={isOpen} onClose={closePopup} />
    </>
  );
};

export default LibraryPage;

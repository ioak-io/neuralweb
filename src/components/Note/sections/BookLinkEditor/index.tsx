import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import NoteModel from "../../../../model/NoteModel";
import { Input, FlexContainer, Label } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPlus,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { isEmptyOrSpaces } from "../../../../components/Utils";
import BookModel from "../../../../model/BookModel";
import {
  BookListState,
  refreshBookListState,
} from "../../../../simplestates/BookListState";
import NewBook from "../../../../components/Page/LibraryPage/NewBook";

interface Props {
  space: string;
  note: NoteModel;
  onChange: any;
}

const _EMPTY_BOOK: BookModel = {
  title: "",
  authors: [],
  primaryAuthor: "",
  categories: [],
  description: "",
  isbn: "",
  publishedDate: "",
  isManaged: true,
};

const BookLinkEditor = (props: Props) => {
  const [existingBooks, setExistingBooks] = useState<BookModel[]>([]);
  const [bookMap, setBookMap] = useState<{ [key: string]: BookModel }>({});
  const authorization = useSelector((state: any) => state.authorization);
  // const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<BookModel[]>([]);
  const [searchResultsBookref, setSearchResultsBookref] = useState<string[]>(
    []
  );

  const [newBookState, setNewBookState] = useState<BookModel>({
    ..._EMPTY_BOOK,
  });
  const [isOpen, setIsOpen] = useState(false);

  const closePopup = (isBookAdded: boolean, bookref?: string) => {
    setIsOpen(false);
    if (isBookAdded) {
      refreshBookListState(props.space, authorization);
      bookref && addBook(null, bookref);
      // setNewBookState();
    }
  };

  const openPopup = (event: any) => {
    event.preventDefault();
    setIsOpen(true);
  };

  useEffect(() => {
    const bookListStateSubscription = BookListState.subscribe(
      (_data: BookModel[]) => {
        const _map: { [key: string]: BookModel } = {};
        _data.forEach((item) => (_map[item.reference || ""] = item));
        setBookMap(_map);
        setExistingBooks(_data);
      }
    );
    return () => bookListStateSubscription.unsubscribe();
  }, []);

  const handleSearchTextChange = (event: any) => {
    event.preventDefault();
    setNewBookState({ ...newBookState, title: event.currentTarget.value });
  };

  useEffect(() => {
    const _searchResultsBookref: string[] = [];
    searchResults.forEach((item) =>
      _searchResultsBookref.push(item.reference || "")
    );
    setSearchResultsBookref(_searchResultsBookref);
  }, [searchResults]);

  useEffect(() => {
    if (isEmptyOrSpaces(newBookState.title)) {
      setSearchResults(
        existingBooks.filter(
          (item) => !props.note.bookrefList?.includes(item.reference || "")
        )
      );
    } else {
      setSearchResults(
        existingBooks
          .filter(
            (item) => !props.note.bookrefList?.includes(item.reference || "")
          )
          .filter(
            (item) =>
              item.primaryAuthor
                .toLowerCase()
                .includes(newBookState.title.toLowerCase()) ||
              item.title
                .toLowerCase()
                .includes(newBookState.title.toLowerCase())
          )
      );
    }
  }, [newBookState, existingBooks, props.note?.bookrefList]);

  const addBook = (event: any, _bookref: string) => {
    event?.preventDefault();
    props.onChange({
      ...props.note,
      bookrefList: [...(props.note.bookrefList || []), _bookref],
    });
  };

  const removeBook = (event: any, _bookref: string) => {
    event.preventDefault();
    props.onChange({
      ...props.note,
      bookrefList:
        props.note.bookrefList?.filter((item) => item !== _bookref) || [],
    });
  };

  const starBook = (event: any, _book: string) => {
    event.preventDefault();
    props.onChange({
      ...props.note,
      books: props.note.books,
      primaryBook: _book,
    });
  };

  return (
    <>
      <div className="book-editor">
        <Label>Books</Label>
        <div className="note-book-list book-editor__view">
          {props.note.bookrefList?.map((item) => (
            <div className="book-editor__view__item" key={item}>
              <div>{`${bookMap[item]?.title} - by ${bookMap[item]?.primaryAuthor}`}</div>
              <button onClick={(event) => removeBook(event, item)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
        </div>
        <Input
          name="searchText"
          value={newBookState.title}
          placeholder="Search or create new book"
          onInput={handleSearchTextChange}
        />
        <div className="book-editor__results">
          <FlexContainer>
            {!isEmptyOrSpaces(newBookState.title) &&
              !props.note.bookrefList?.includes(newBookState.title) &&
              !searchResultsBookref.includes(newBookState.title) && (
                <div className="note-label">
                  <div>{newBookState.title}</div>
                  <button onClick={(event) => openPopup(event)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              )}
            {!isEmptyOrSpaces(newBookState.title) &&
              searchResultsBookref.map((item) => (
                <div className="note-label" key={item}>
                  <div>{`${bookMap[item]?.title} - by ${bookMap[item]?.primaryAuthor}`}</div>
                  <button onClick={(event) => addBook(event, item)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              ))}
          </FlexContainer>
        </div>
      </div>
      <NewBook
        space={props.space}
        isOpen={isOpen}
        onClose={closePopup}
        initialTitle={newBookState.title}
      />
    </>
  );
};

export default BookLinkEditor;

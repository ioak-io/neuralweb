import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import NoteModel from "../../../../model/NoteModel";
import { Input, FlexContainer, Label } from "basicui";
import BookModel from "../../../../model/BookModel";
import { BookListState } from "../../../../simplestates/BookListState";

interface Props {
  note: NoteModel;
}

const BookLinkViewer = (props: Props) => {
  const [existingBooks, setExistingBooks] = useState<BookModel[]>([]);
  const [bookMap, setBookMap] = useState<{ [key: string]: BookModel }>({});

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

  return (
    <div className="book-link-viewer">
      <Label>Book sources</Label>
      <div className="book-link-viewer__content">
        {props.note.bookrefList?.map((item) => (
          <div className="book-link-viewer__content__item" key={item}>
            {`${bookMap[item]?.title} - by ${bookMap[item]?.primaryAuthor}`}
          </div>
        ))}
        {(!props.note.bookrefList || props.note.bookrefList?.length === 0) && (
          <div>-</div>
        )}
      </div>
    </div>
  );
};

export default BookLinkViewer;

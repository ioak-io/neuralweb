import { Subject, Observable, BehaviorSubject } from "rxjs";
import BookModel from "../model/BookModel";
import { getBooks } from "../components/Page/LibraryPage/service";

export const BookListState = new BehaviorSubject<BookModel[]>([]);

export const refreshBookListState = (space: string, authorization: any) => {
  getBooks(space, authorization).then((response: BookModel[]) => {
    BookListState.next(response);
  });
};

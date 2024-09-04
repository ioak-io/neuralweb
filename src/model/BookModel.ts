export default interface BookModel {
  _id?: string;
  title: string;
  reference?: string;
  description: string;
  authors: string[];
  primaryAuthor: string;
  categories: string[];
  isManaged: boolean;
  isbn: string;
  pageCount?: number;
  publishedDate: string;
  thumbnail?: string;
}

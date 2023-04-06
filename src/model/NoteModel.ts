export default interface NoteModel {
  _id: string;
  name: string;
  reference: string;
  content: string;
  folderId: string;
  labels: string[];
  [key: string]: any;
}

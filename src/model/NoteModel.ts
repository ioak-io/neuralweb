export default interface NoteModel {
  _id?: string;
  name: string;
  reference: string;
  content?: string;
  contentText?: string;
  summary?: string;
  autoGeneratedSummary?: string;
  labels: string[];
  primaryLabel?: string;
  type?: 'Fleeting' | 'Reference' | 'Literature' | 'Permanent';
  createdAt?: any;
  [key: string]: any;
}

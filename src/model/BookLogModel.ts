export default interface BookLogModel {
  _id?: string;
  bookref: string;
  sectionref?: string;
  sectiontype?: string;
  isRunning: boolean;
}

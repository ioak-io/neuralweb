export default interface ChapterDetailModel {
  _id?: string;
  type: string;
  customTitle?: string;
  customDescription?: string;
  chapterref?: string;
  bookref?: string;
  content: string;
}

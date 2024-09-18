export default interface ThemeDetailModel {
  _id?: string;
  type: string;
  customTitle?: string;
  customDescription?: string;
  themeref?: string;
  conceptref?: string;
  bookref?: string;
  content: string;
}

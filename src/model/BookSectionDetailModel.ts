export default interface BookSectionDetailModel {
  _id?: string;
  type: string;
  customTitle?: string;
  customDescription?: string;
  bookref?: string;
  sectionref?: string;
  content: string;
}

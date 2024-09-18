export default interface ConceptDetailModel {
  _id?: string;
  type: string;
  customTitle?: string;
  customDescription?: string;
  conceptref?: string;
  bookref?: string;
  content: any;
}

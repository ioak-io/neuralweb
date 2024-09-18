export default interface ConceptModel {
  _id?: string;
  name: string;
  description: string;
  reference?: string;
  bookref?: string;
  themes?: {
    title: string;
    description: string;
    subThemes: { title: string; description: string }[];
  }[];
}

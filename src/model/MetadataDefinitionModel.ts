export default interface MetadataDefinitionModel {
  _id?: string | null;
  name: string;
  group: string;
  reference: string;
  type: 'short-text' | 'long-text';
}

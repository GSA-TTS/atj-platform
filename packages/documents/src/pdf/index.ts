export { getDocumentFieldData } from './extract';
export * from './generate';
export { generateDummyPDF } from './generate-dummy';
export { parseAlabamaNameChangeForm } from './mock-api';

export type PDFDocument = {
  type: 'pdf';
  fields: PDFField[];
};
export type PDFField = {
  id: string;
  type: PDFFieldType;
  label: string;
  default?: any;
};
export type PDFFieldType =
  | 'TextField'
  | 'CheckBox'
  | 'Dropdown'
  | 'OptionList'
  | 'RadioGroup'
  | 'Paragraph';

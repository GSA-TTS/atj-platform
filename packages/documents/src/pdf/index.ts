export { extractFormFieldData } from './extract';
export { fillPDF } from './generate';
export { generateDummyPDF } from './generate-dummy';

export type PDFDocument = {
  type: 'pdf';
  fields: {
    id: string;
    type: PDFFieldType;
    label: string;
    default?: any;
  }[];
};
export type PDFFieldType = 'TextField' | 'CheckBox' | 'Dropdown' | 'OptionList';

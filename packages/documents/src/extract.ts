import * as pdfLib from 'pdf-lib';
import { PDFFieldType } from './generate';

export const extractFormFieldData = async (pdfBytes: Uint8Array) => {
  const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  return Object.fromEntries(
    fields.map(field => {
      return [field.getName(), getFieldValue(field)];
    })
  );
};

export type ExtractedDocumentData = Awaited<
  ReturnType<typeof extractFormFieldData>
>;

const getFieldValue = (
  field: pdfLib.PDFField
): { type: PDFFieldType | 'not-supported'; value: any } => {
  if (field instanceof pdfLib.PDFTextField) {
    return {
      type: 'TextField',
      value: field.getText(),
    };
  } else if (field instanceof pdfLib.PDFCheckBox) {
    return {
      type: 'CheckBox',
      value: field.isChecked(),
    };
  } else if (field instanceof pdfLib.PDFDropdown) {
    return {
      type: 'Dropdown',
      value: field.getSelected(),
    };
  } else if (field instanceof pdfLib.PDFOptionList) {
    return {
      type: 'OptionList',
      value: field.getSelected(),
    };
  } else {
    return {
      type: 'not-supported',
      value: 'not-supported',
    };
  }
};

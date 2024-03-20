import * as pdfLib from 'pdf-lib';

import { type DocumentFieldMap, type DocumentFieldValue } from '@atj/forms';
import { stringToBase64 } from '../util';

export const getDocumentFieldData = async (
  pdfBytes: Uint8Array
): Promise<DocumentFieldMap> => {
  const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  return Object.fromEntries(
    fields.map(field => {
      return [stringToBase64(field.getName()), getFieldValue(field)];
    })
  );
};

const getFieldValue = (field: pdfLib.PDFField): DocumentFieldValue => {
  if (field instanceof pdfLib.PDFTextField) {
    return {
      type: 'TextField',
      name: field.getName(),
      label: field.getName(),
      value: field.getText() || '',
      maxLength: field.getMaxLength(),
      required: field.isRequired(),
    };
  } else if (field instanceof pdfLib.PDFCheckBox) {
    return {
      type: 'CheckBox',
      name: field.getName(),
      label: field.getName(),
      value: field.isChecked(),
      required: field.isRequired(),
    };
  } else if (field instanceof pdfLib.PDFDropdown) {
    return {
      type: 'Dropdown',
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired(),
    };
  } else if (field instanceof pdfLib.PDFOptionList) {
    return {
      type: 'OptionList',
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired(),
    };
  } else if (field instanceof pdfLib.PDFRadioGroup) {
    return {
      type: 'RadioGroup',
      name: field.getName(),
      options: field.getOptions(),
      label: field.getName(),
      value: field.getSelected() || '', // pdfLib allows this to be undefined
      required: field.isRequired(),
    };
  } else {
    return {
      type: 'not-supported',
      name: field.getName(),
      error: `unsupported type: ${field.constructor.name}`,
    };
  }
};

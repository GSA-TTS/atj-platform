import { PDFDocument, type PDFForm } from 'pdf-lib';

import { PDFFieldType } from '.';

export const fillPDF = async (
  pdfBytes: Uint8Array,
  fieldData: Record<string, { value: any; type: PDFFieldType }>
): Promise<Result<Uint8Array>> => {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  try {
    Object.entries(fieldData).forEach(([name, value]) => {
      setFormFieldData(form, value.type, name, value.value);
    });
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'error setting PDF field',
    };
  }
  return {
    success: true,
    data: await pdfDoc.save(),
  };
};

const setFormFieldData = (
  form: PDFForm,
  fieldType: PDFFieldType,
  fieldName: string,
  fieldValue: any
) => {
  form.getField(fieldName);
  if (fieldType === 'TextField') {
    const field = form.getTextField(fieldName);
    field.setText(fieldValue);
  } else if (fieldType === 'CheckBox') {
    const field = form.getCheckBox(fieldName);
    if (fieldValue) {
      field.check();
    } else {
      field.uncheck();
    }
  } else if (fieldType === 'Dropdown') {
    const field = form.getDropdown(fieldName);
    field.select(fieldValue);
  } else if (fieldType === 'OptionList') {
    const field = form.getDropdown(fieldName);
    field.select(fieldValue);
  } else {
    const exhaustiveCheck: never = fieldType;
  }
};

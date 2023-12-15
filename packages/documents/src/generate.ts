import { PDFDocument, PDFForm } from 'pdf-lib';

type PDFFieldType = 'TextField' | 'CheckBox';

export const fillPDF = async (
  pdfBytes: Uint8Array,
  fieldData: Record<string, { value: any; type: PDFFieldType }>
) => {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  Object.entries(fieldData).forEach(([name, value]) => {
    setFormFieldData(form, value.type, name, value.value);
  });
  return await pdfDoc.save();
};

const setFormFieldData = (
  form: PDFForm,
  fieldType: PDFFieldType,
  fieldName: string,
  fieldValue: any
) => {
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
  } else {
    const exhaustiveCheck: never = fieldType;
  }
};

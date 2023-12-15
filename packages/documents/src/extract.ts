import * as pdfLib from 'pdf-lib';

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

const getFieldValue = (field: pdfLib.PDFField) => {
  if (field instanceof pdfLib.PDFTextField) {
    return field.getText();
  } else if (field instanceof pdfLib.PDFCheckBox) {
    return field.isChecked();
  } else if (field instanceof pdfLib.PDFDropdown) {
    return field.getSelected();
  } else if (field instanceof pdfLib.PDFOptionList) {
    return field.getSelected();
  } else {
    return 'not-supported';
  }
};

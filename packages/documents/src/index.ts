import { PDFDocument } from 'pdf-lib';

export const generate = async (message: string) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText(message);
  return await pdfDoc.save();
};

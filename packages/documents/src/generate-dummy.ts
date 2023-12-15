import { PDFDocument } from 'pdf-lib';

export const generateDummyPDF = async (
  formData: Record<string, any>
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText(
    JSON.stringify({
      timestamp: `Generated at ${new Date().toISOString()}`,
      ...formData,
    })
  );
  return await pdfDoc.save();
};

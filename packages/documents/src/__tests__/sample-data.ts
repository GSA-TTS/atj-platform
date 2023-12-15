import path from 'path';
import { promises as fs } from 'fs';

const samplesDirectory = path.resolve(__dirname, '../../samples');

export const loadSamplePDF = async (fileName: string) => {
  const samplePdfPath = path.join(samplesDirectory, fileName);
  return await fs.readFile(samplePdfPath);
};

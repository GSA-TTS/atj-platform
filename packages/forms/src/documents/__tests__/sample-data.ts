import path from 'path';
import { promises as fs } from 'fs';

const samplesDirectory = path.resolve(__dirname, '../../../sample-documents');

export const loadSamplePDF = async (fileName: `${string}.pdf`) => {
  const samplePdfPath = path.join(samplesDirectory, fileName);
  return await fs.readFile(samplePdfPath);
};

export const loadSampleFields = async (fileName: `${string}.json`) => {
  const sampleJsonPath = path.join(samplesDirectory, fileName);
  const data = await fs.readFile(sampleJsonPath);
  return JSON.parse(data.toString());
};

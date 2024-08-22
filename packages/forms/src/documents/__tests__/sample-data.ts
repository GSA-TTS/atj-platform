import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const samplesDirectory = path.resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../../sample-documents'
);

export const loadSamplePDF = async (fileName: `${string}.pdf`) => {
  const samplePdfPath = path.join(samplesDirectory, fileName);
  return await fs.readFile(samplePdfPath);
};

export const loadSampleFields = async (fileName: `${string}.json`) => {
  const sampleJsonPath = path.join(samplesDirectory, fileName);
  const data = await fs.readFile(sampleJsonPath);
  return JSON.parse(data.toString());
};

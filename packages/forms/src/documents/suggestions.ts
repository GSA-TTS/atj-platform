import { callExternalParser, type ParsedPdf } from './pdf/parsing-api';

export type SuggestedForm = {
  id: string;
  tag: 'input' | 'textarea';
  name: string;
  label: string;
  value?: string;
  type?: 'text';
}[];

export const getSuggestedPatterns = async (
  rawData: Uint8Array
): Promise<ParsedPdf | null> => {
  return await callExternalParser(rawData);
};

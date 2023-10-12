import { createDocassembleClient } from '.';

export const createTestDocassembleClient = () => {
  return createDocassembleClient({
    fetch,
    apiUrl: 'http://localhost:8011',
    apiKey: (import.meta as any).env.VITE_DOCASSEMBLE_API_KEY || '',
  });
};

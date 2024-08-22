import { describe, expect, it } from 'vitest';

import { getDocumentFieldData } from '../index.js';
import { loadSamplePDF } from './sample-data.js';

describe('PDF form field extraction', () => {
  it('extracts data from California UD-105 form', async () => {
    const pdfBytes = await loadSamplePDF('ca-unlawful-detainer/ud105.pdf');
    const fields = await getDocumentFieldData(pdfBytes);
    expect(fields).toBeDefined();
  });
});

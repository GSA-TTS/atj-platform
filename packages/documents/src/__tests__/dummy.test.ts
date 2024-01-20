import { describe, expect, it } from 'vitest';

import { generateDummyPDF } from '..';

describe('PDF document generation', () => {
  it('can produce a dummy PDF with a JSON dump of data', async () => {
    const pdfBytes = await generateDummyPDF({ someData: 'test data' });
    expect(pdfBytes).toBeDefined();
  });
  it('fails so I can demo an error on a PR', () => {
    expect(true).toEqual(true);
  });
});

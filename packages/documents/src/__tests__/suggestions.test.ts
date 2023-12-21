import { describe, expect, it } from 'vitest';

import { extractFormFieldData } from '..';
import { loadSampleFields, loadSamplePDF } from './sample-data';

describe('PDF form field extraction', () => {
  it('extracts data from California UD-105 form', async () => {
    const fields = loadSampleFields('ca-unlawful-detainer/ud-105.fields.json');
  });
});

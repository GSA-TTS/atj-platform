import { describe, it } from 'vitest';

import { loadSampleFields } from './sample-data';

describe('PDF form field extraction', () => {
  it('extracts data from California UD-105 form', async () => {
    const fields = loadSampleFields('ca-unlawful-detainer/ud-105.fields.json');
  });
});

import { describe, expect, it } from 'vitest';

import { Success } from '@atj/common';

import { loadSamplePDF } from './sample-data';
import { fillPDF, getDocumentFieldData } from '../pdf';
import { DocumentFieldMap } from '..';

describe('DOJ Pardon Office marijuana pardon application form', () => {
  it('produces valid PDF from imported PDF', async () => {
    const pdfBytes = await loadSamplePDF(
      'doj-pardon-marijuana/application_for_certificate_of_pardon_for_simple_marijuana_possession.pdf'
    );
    const result = (await fillPDF(pdfBytes, {
      Gender: {
        value: 'female',
        type: 'TextField',
      },
      'Docket No': {
        value: '12345',
        type: 'TextField',
      },
    })) as Success<Uint8Array>;
    expect(result.success).toEqual(true);
    const fields = await getDocumentFieldData(result.data);
    expect(getFieldByName(fields, 'Gender')).toEqual({
      label: 'Gender',
      name: 'Gender',
      maxLength: undefined,
      required: false,
      type: 'TextField',
      value: 'female',
    });
    expect(getFieldByName(fields, 'Docket No')).toEqual({
      label: 'Docket No',
      name: 'Docket No',
      maxLength: undefined,
      required: false,
      type: 'TextField',
      value: '12345',
    });
  });
});

const getFieldByName = (fields: DocumentFieldMap, name: string) => {
  for (const field of Object.values(fields)) {
    if (field.name === name) {
      return field;
    }
  }
  throw new Error(`field with name ${name} not found`);
};

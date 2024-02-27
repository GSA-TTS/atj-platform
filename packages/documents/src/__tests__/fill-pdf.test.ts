import { beforeAll, describe, expect, it } from 'vitest';

import { getDocumentFieldData, fillPDF } from '..';
import { loadSamplePDF } from './sample-data';
import { type Failure, type Success } from '@atj/common';

describe('PDF form filler', () => {
  let pdfBytes: Uint8Array;

  beforeAll(async () => {
    pdfBytes = await loadSamplePDF('dod_character.pdf');
  });

  it('generates pdf from valid form data', async () => {
    const pdfBytes = await loadSamplePDF('dod_character.pdf');

    const result = (await fillPDF(pdfBytes, {
      'CharacterName 2': { type: 'TextField', value: 'nameField' },
      'Feat+Traits': { type: 'TextField', value: 'traitsField' },
      Age: { type: 'TextField', value: 'ageField' },
      Allies: { type: 'TextField', value: 'alliesField' },
      Backstory: { type: 'TextField', value: 'backStoryField' },
      Eyes: { type: 'TextField', value: 'eyesField' },
      FactionName: { type: 'TextField', value: 'factionField' },
      Hair: { type: 'TextField', value: 'hairField' },
      Height: { type: 'TextField', value: 'heightField' },
      Skin: { type: 'TextField', value: 'skinField' },
      Treasure: { type: 'TextField', value: 'treasureField' },
      Weight: { type: 'TextField', value: 'weightField' },
    })) as Success<Uint8Array>;
    expect(result.success).toEqual(true);
    const fields = await getDocumentFieldData(result.data);
    expect(fields).toEqual({
      'CharacterName 2': {
        type: 'TextField',
        name: 'CharacterName 2',
        label: 'CharacterName 2',
        value: 'nameField',
        required: false,
      },
      Age: {
        type: 'TextField',
        name: 'Age',
        label: 'Age',
        value: 'ageField',
        required: false,
      },
      Height: {
        type: 'TextField',
        name: 'Height',
        label: 'Height',
        value: 'heightField',
        required: false,
      },
      Weight: {
        type: 'TextField',
        name: 'Weight',
        label: 'Weight',
        value: 'weightField',
        required: false,
      },
      Eyes: {
        type: 'TextField',
        name: 'Eyes',
        label: 'Eyes',
        value: 'eyesField',
        required: false,
      },
      Skin: {
        type: 'TextField',
        name: 'Skin',
        label: 'Skin',
        value: 'skinField',
        required: false,
      },
      Hair: {
        type: 'TextField',
        name: 'Hair',
        label: 'Hair',
        value: 'hairField',
        required: false,
      },
      Allies: {
        type: 'TextField',
        name: 'Allies',
        label: 'Allies',
        value: 'alliesField',
        required: false,
      },
      FactionName: {
        type: 'TextField',
        name: 'FactionName',
        label: 'FactionName',
        value: 'factionField',
        required: false,
      },
      Backstory: {
        type: 'TextField',
        name: 'Backstory',
        label: 'Backstory',
        value: 'backStoryField',
        required: false,
      },
      'Feat+Traits': {
        type: 'TextField',
        name: 'Feat+Traits',
        label: 'Feat+Traits',
        value: 'traitsField',
        required: false,
      },
      Treasure: {
        type: 'TextField',
        name: 'Treasure',
        label: 'Treasure',
        value: 'treasureField',
        required: false,
      },
      'CHARACTER IMAGE': {
        type: 'not-supported',
        name: 'CHARACTER IMAGE',
        error: 'unsupported type: PDFButton',
      },
      'Faction Symbol Image': {
        type: 'TextField',
        name: 'Faction Symbol Image',
        label: 'Faction Symbol Image',
        value: '',
        required: false,
      },
    });
  });

  it('returns an error when provided a non-existent field', async () => {
    const pdfBytes = await loadSamplePDF('dod_character.pdf');

    const result = (await fillPDF(pdfBytes, {
      fakeField: {
        type: 'TextField',
        value: 'fake data',
      },
    })) as Failure<string>;
    expect(result.success).toEqual(false);
    expect(result.error).toEqual(
      'PDFDocument has no form field with the name "fakeField"'
    );
  });
});

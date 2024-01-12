import { beforeAll, describe, expect, it } from 'vitest';

import { getDocumentFieldData, fillPDF } from '..';
import { loadSamplePDF } from './sample-data';

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
      'CHARACTER IMAGE': { type: 'not-supported', value: 'not-supported' },
      'CharacterName 2': { type: 'TextField', value: 'nameField' },
      'Faction Symbol Image': { type: 'TextField' },
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

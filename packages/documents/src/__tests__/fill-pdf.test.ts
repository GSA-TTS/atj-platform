import { describe, expect, it } from 'vitest';

import { extractFormFieldData, fillPDF } from '..';
import { loadSamplePDF } from './sample-data';

describe('PDF document generation', () => {
  it('generates pdf from form data', async () => {
    const pdfBytes = await loadSamplePDF('dod_character.pdf');
    const filledPdf = await fillPDF(pdfBytes, {
      'CharacterName 2': { type: 'TextField', value: 'nameField' },
      Age: { type: 'TextField', value: 'ageField' },
      Height: { type: 'TextField', value: 'heightField' },
      Weight: { type: 'TextField', value: 'weightField' },
      Eyes: { type: 'TextField', value: 'eyesField' },
      Skin: { type: 'TextField', value: 'skinField' },
      Hair: { type: 'TextField', value: 'hairField' },
      Allies: { type: 'TextField', value: 'alliesField' },
      FactionName: { type: 'TextField', value: 'factionField' },
      Backstory: { type: 'TextField', value: 'backStoryField' },
      'Feat+Traits': { type: 'TextField', value: 'traitsField' },
      Treasure: { type: 'TextField', value: 'treasureField' },
    });
    const fields = await extractFormFieldData(filledPdf);

    expect(fields).toEqual({
      'CharacterName 2': 'nameField',
      Age: 'ageField',
      Height: 'heightField',
      Weight: 'weightField',
      Eyes: 'eyesField',
      Skin: 'skinField',
      Hair: 'hairField',
      Allies: 'alliesField',
      FactionName: 'factionField',
      Backstory: 'backStoryField',
      'Feat+Traits': 'traitsField',
      Treasure: 'treasureField',
      'CHARACTER IMAGE': 'not-supported',
    });
  });
});

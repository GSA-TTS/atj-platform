import { type FormConfig } from '.';
import { fieldsetConfig } from './elements/fieldset';
import { inputConfig } from './elements/input';
import { paragraphConfig } from './elements/paragraph';
import { sequenceConfig } from './elements/sequence';

// This configuration reflects what a user of this library would provide for
// their usage scenarios. For now, keep here in the form service until we
// understand the usage scenarios better.
export const defaultFormConfig: FormConfig = {
  elements: {
    fieldset: fieldsetConfig,
    input: inputConfig,
    paragraph: paragraphConfig,
    sequence: sequenceConfig,
  },
};

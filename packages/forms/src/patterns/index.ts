import { type FormConfig } from '../pattern';

import { fieldsetConfig } from './fieldset';
import { inputConfig } from './input';
import { paragraphConfig } from './paragraph';
import { sequenceConfig } from './sequence';

// This configuration reflects what a user of this library would provide for
// their usage scenarios. For now, keep here in the form service until we
// understand the usage scenarios better.
export const defaultFormConfig: FormConfig = {
  patterns: {
    fieldset: fieldsetConfig,
    input: inputConfig,
    paragraph: paragraphConfig,
    sequence: sequenceConfig,
  },
};

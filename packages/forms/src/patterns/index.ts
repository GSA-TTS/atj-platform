import { type FormConfig } from '../pattern.js';

import { addressConfig } from './address/index.js';
import { checkboxConfig } from './checkbox.js';
import { fieldsetConfig } from './fieldset/index.js';
import { formSummaryConfig } from './form-summary.js';
import { inputConfig } from './input/index.js';
import { pageConfig } from './page/index.js';
import { pageSetConfig } from './page-set/index.js';
import { paragraphConfig } from './paragraph.js';
import { radioGroupConfig } from './radio-group.js';
import { sequenceConfig } from './sequence.js';

// This configuration reflects what a user of this library would provide for
// their usage scenarios. For now, keep here in the form service until we
// understand the usage scenarios better.
export const defaultFormConfig: FormConfig = {
  patterns: {
    'form-summary': formSummaryConfig,
    address: addressConfig,
    checkbox: checkboxConfig,
    fieldset: fieldsetConfig,
    input: inputConfig,
    page: pageConfig,
    'page-set': pageSetConfig,
    paragraph: paragraphConfig,
    'radio-group': radioGroupConfig,
    sequence: sequenceConfig,
  },
} as const;

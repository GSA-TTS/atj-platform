import { type FormConfig } from '../pattern';

import { addressConfig } from './address';
import { checkboxConfig } from './checkbox';
import { fieldsetConfig } from './fieldset';
import { formSummaryConfig } from './form-summary';
import { inputConfig } from './input';
import { pageConfig } from './page';
import { pageSetConfig } from './page-set';
import { paragraphConfig } from './paragraph';
import { radioGroupConfig } from './radio-group';
import { sequenceConfig } from './sequence';

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
};

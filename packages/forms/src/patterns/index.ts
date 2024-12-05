import { type FormConfig } from '../pattern.js';

import { attachmentConfig } from './attachment/index.js';
import { addressConfig } from './address/index.js';
import { checkboxConfig } from './checkbox.js';
import { dateOfBirthConfig } from './date-of-birth/date-of-birth.js';
import { emailInputConfig } from './email-input/email-input.js';
import { fieldsetConfig } from './fieldset/index.js';
import { repeaterConfig } from './repeater/index.js';
import { formSummaryConfig } from './form-summary.js';
import { inputConfig } from './input/index.js';
import { packageDownloadConfig } from './package-download/index.js';
import { pageConfig } from './page/index.js';
import { pageSetConfig } from './page-set/index.js';
import { paragraphConfig } from './paragraph.js';
import { phoneNumberConfig } from './phone-number/phone-number.js';
import { radioGroupConfig } from './radio-group.js';
import { richTextConfig } from './rich-text.js';
import { selectDropdownConfig } from './select-dropdown/select-dropdown.js';
import { sequenceConfig } from './sequence.js';
import { socialSecurityNumberConfig } from './social-security-number/social-security-number.js';

// This configuration reflects what a user of this library would provide for
// their usage scenarios. For now, keep here in the form service until we
// understand the usage scenarios better.
export const defaultFormConfig: FormConfig = {
  patterns: {
    address: addressConfig,
    attachment: attachmentConfig,
    checkbox: checkboxConfig,
    'date-of-birth': dateOfBirthConfig,
    'email-input': emailInputConfig,
    fieldset: fieldsetConfig,
    'form-summary': formSummaryConfig,
    input: inputConfig,
    'package-download': packageDownloadConfig,
    page: pageConfig,
    'page-set': pageSetConfig,
    paragraph: paragraphConfig,
    repeater: repeaterConfig,
    'phone-number': phoneNumberConfig,
    'radio-group': radioGroupConfig,
    'rich-text': richTextConfig,
    'select-dropdown': selectDropdownConfig,
    'social-security-number': socialSecurityNumberConfig,
    sequence: sequenceConfig,
  },
} as const;

export * from './attachment/index.js';
export { type AttachmentPattern } from './attachment/config.js';
export * from './attachment/file-type-options.js';
export * from './address/index.js';
export * from './checkbox.js';
export * from './date-of-birth/date-of-birth.js';
export * from './email-input/email-input.js';
export * from './fieldset/index.js';
export { type FieldsetPattern } from './fieldset/config.js';
export * from './form-summary.js';
export * from './input/index.js';
export { type InputPattern } from './input/config.js';
export * from './package-download/index.js';
export * from './page/index.js';
export { type PagePattern } from './page/config.js';
export * from './page-set/index.js';
export { type PageSetPattern } from './page-set/config.js';
export * from './paragraph.js';
export * from './phone-number/phone-number.js';
export * from './radio-group.js';
export * from './repeater/index.js';
export * from './select-dropdown/select-dropdown.js';
export * from './social-security-number/social-security-number.js';
export * from './sequence.js';

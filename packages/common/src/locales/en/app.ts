const defaults = {
  defaultFieldValue: 'Default field value',
  fieldLabel: 'Field label',
  fieldLabelRequired: 'A field label is required',
  fieldRequired: 'This field is required',
};

export const en = {
  patterns: {
    attachment: {
      ...defaults,
      displayName: 'Attachment',
      maxAttachmentsLabel: 'Max attachments',
      allowedFileTypesLabel: 'Allowable file types',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
      errorUnsupportedFileType: 'Invalid file type found.',
    },
    checkbox: {
      ...defaults,
      displayName: 'Checkbox',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    fieldset: {
      ...defaults,
      displayName: 'Fieldset',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    input: {
      ...defaults,
      displayName: 'Short answer',
      maxLength: 'Maximum length',
    },
    packageDownload: {
      ...defaults,
      displayName: 'Package download',
      fieldLabel: 'Package download label',
    },
    page: {
      fieldLabel: 'Page title',
    },
    paragraph: {
      fieldLabel: 'Paragraph text',
      displayName: 'Paragraph',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    richText: {
      fieldLabel: 'Rich text',
      displayName: 'Rich text',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    radioGroup: {
      ...defaults,
      displayName: 'Radio group label',
      fieldLabel: 'Radio group label',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    selectDropdown: {
      ...defaults,
      displayName: 'Select dropdown label',
      fieldLabel: 'Select dropdown label',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    dateOfBirth: {
      ...defaults,
      displayName: 'Date of birth label',
      fieldLabel: 'Date of birth label',
      hintLabel: 'Date of Birth Hint label',
      hint: 'For example: January 19 2000',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    emailInput: {
      ...defaults,
      displayName: 'Email Input label',
      fieldLabel: 'Email Input label',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    phoneNumber: {
      ...defaults,
      displayName: 'Phone number label',
      fieldLabel: 'Phone number label',
      hintLabel: 'Phone number hint label',
      hint: '10-digit, U.S. only, for example 999-999-9999',
    },
    ssn: {
      ...defaults,
      displayName: 'Social Security Number label',
      fieldLabel: 'Social Security Number label',
      hintLabel: 'Social Security Number hint label',
      hint: 'For example, 555-11-0000',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
  },
};

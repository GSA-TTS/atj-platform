const defaults = {
  defaultFieldValue: 'Default field value',
  fieldLabel: 'Field label',
  fieldLabelRequired: 'A field label is required',
  fieldRequired: 'This field is required',
};

export const en = {
  patterns: {
    input: {
      ...defaults,
      displayName: 'Short answer',
      maxLength: 'Maximum length',
    },
    checkbox: {
      ...defaults,
      displayName: 'Checkbox',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    page: {
      fieldLabel: 'Page title',
    },
    paragraph: {
      fieldLabel: 'Paragraph Text',
      displayName: 'Long answer',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    radioGroup: {
      ...defaults,
      displayName: 'Radio group label',
      fieldLabel: 'Radio group label',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
  },
};

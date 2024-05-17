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
      displayName: 'Text input',
      maxLength: 'Maximum length',
      requiredLabel: 'Required',
    },
    checkbox: {
      ...defaults,
      displayName: 'Checkbox input',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
    paragraph: {
      fieldLabel: 'Paragraph text',
      displayName: 'Lorem ipsum...',
      errorTextMustContainChar: 'String must contain at least 1 character(s)',
    },
  },
};

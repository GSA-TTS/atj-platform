import { describe, expect, it } from 'vitest';

import * as forms from '../src';

const question: forms.Question = {
  id: 'question-1',
  text: 'What is your favorite word?',
  initial: '',
  required: true,
};

describe('basic single question form', () => {
  it('initializes', () => {
    const form = forms.createFormContextFromQuestions([question]);
    expect(form).to.not.toBeNull();
  });

  it('non-existent field is ignored', () => {
    const form = forms.createFormContextFromQuestions([question]);
    const nextForm = forms.updateForm(form, 'fake-field-id', '');
    expect(nextForm).toEqual(form);
  });

  it('empty field value is set with error on context', () => {
    const form = forms.createFormContextFromQuestions([question]);
    const nextForm = forms.updateForm(form, question.id, '');
    expect(nextForm).toEqual({
      ...form,
      context: {
        errors: {
          'question-1': 'Required value not provided.',
        },
        values: {
          'question-1': '',
        },
      },
    });
  });

  it('valid field value is stored on context', () => {
    const form = forms.createFormContextFromQuestions([question]);
    const nextForm = forms.updateForm(
      form,
      question.id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextForm).toEqual({
      ...form,
      context: {
        errors: {},
        values: {
          'question-1': 'supercalifragilisticexpialidocious',
        },
      },
    });
  });
});

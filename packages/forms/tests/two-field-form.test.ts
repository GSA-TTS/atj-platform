import { describe, expect, it } from 'vitest';

import * as forms from '../src';

const questions: forms.Question[] = [
  {
    id: 'question-1',
    text: 'What is your first name?',
    initial: '',
    required: true,
  },
  {
    id: 'question-2',
    text: 'What is your favorite word?',
    initial: '',
    required: false,
  },
];

describe('two question form', () => {
  it('initializes', () => {
    const form = forms.createFormContextFromQuestions(questions);
    expect(form).to.not.toBeNull();
  });

  it('empty field value on required field is stored with error', () => {
    const form = forms.createFormContextFromQuestions(questions);
    const nextForm = forms.updateForm(form, questions[0].id, null);
    expect(nextForm).toEqual({
      ...form,
      context: {
        errors: {
          'question-1': 'Required value not provided.',
        },
        values: {
          'question-1': null,
          'question-2': '',
        },
      },
    });
  });

  it('valid field value is stored on context', () => {
    const form = forms.createFormContextFromQuestions(questions);
    const nextForm = forms.updateForm(
      form,
      questions[0].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextForm).toEqual({
      ...form,
      context: {
        errors: {},
        values: {
          'question-1': 'supercalifragilisticexpialidocious',
          'question-2': '',
        },
      },
    });
  });

  it('empty field value on non-required field is set with no errors on context', () => {
    const form = forms.createFormContextFromQuestions(questions);
    const form2 = forms.updateForm(
      form,
      questions[1].id,
      'supercalifragilisticexpialidocious'
    );
    const form3 = forms.updateForm(form2, questions[1].id, '');
    expect(form3).toEqual({
      ...form,
      context: {
        errors: {},
        values: {
          'question-1': '',
          'question-2': '',
        },
      },
    });
  });

  it('valid field value on non-required field is stored on context', () => {
    const form = forms.createFormContextFromQuestions(questions);
    const nextForm = forms.updateForm(
      form,
      questions[1].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextForm).toEqual({
      ...form,
      context: {
        errors: {},
        values: {
          'question-1': '',
          'question-2': 'supercalifragilisticexpialidocious',
        },
      },
    });
  });
});

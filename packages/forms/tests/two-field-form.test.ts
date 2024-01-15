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
const form = forms.createForm(
  {
    title: 'Form sample',
    description: 'Form sample created via a list of questions.',
  },
  questions
);

describe('two question form context', () => {
  it('initializes', () => {
    const context = forms.createFormContext(form);
    expect(context).to.not.toBeNull();
  });

  it('empty field value on required field is stored with error', () => {
    const context = forms.createFormContext(form);
    const nextContext = forms.updateForm(context, questions[0].id, null);
    expect(nextContext).toEqual({
      ...context,
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
    const formContext = forms.createFormContext(form);
    const nextContext = forms.updateForm(
      formContext,
      questions[0].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextContext).toEqual({
      ...formContext,
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
    const context = forms.createFormContext(form);
    const context2 = forms.updateForm(
      context,
      questions[1].id,
      'supercalifragilisticexpialidocious'
    );
    const context3 = forms.updateForm(context2, questions[1].id, '');
    expect(context3).toEqual({
      ...context,
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
    const context = forms.createFormContext(form);
    const nextContext = forms.updateForm(
      context,
      questions[1].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextContext).toEqual({
      ...context,
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

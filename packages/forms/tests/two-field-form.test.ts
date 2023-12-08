import { describe, expect, it } from 'vitest';

import * as forms from '../src';

const questions: forms.Question[] = [
  {
    id: 'question-1',
    text: 'What is your first name?',
    initial: '',
  },
  {
    id: 'question-2',
    text: 'What is your favorite word?',
    initial: '',
  },
];

describe('basic single question form', () => {
  it('initializes', () => {
    const form = forms.createForm(questions);
    expect(form).to.not.toBeNull();
  });

  it('empty field value is ignored', () => {
    const form = forms.createForm(questions);
    const nextForm = forms.updateForm(form, questions[0].id, null);
    expect(nextForm).toEqual({
      ...form,
      context: {
        error: 'Required value not provided.',
      },
    });
  });

  it('valid field value is stored on context', () => {
    const form = forms.createForm(questions);
    const nextForm = forms.updateForm(
      form,
      questions[0].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextForm).toEqual({
      ...form,
      context: {
        values: {
          'question-1': 'supercalifragilisticexpialidocious',
          'question-2': '',
        },
      },
    });
  });

  it('valid second field value is stored on context', () => {
    const form = forms.createForm(questions);
    const nextForm = forms.updateForm(
      form,
      questions[1].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextForm).toEqual({
      ...form,
      context: {
        values: {
          'question-1': '',
          'question-2': 'supercalifragilisticexpialidocious',
        },
      },
    });
  });
});

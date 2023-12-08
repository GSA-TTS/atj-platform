import { describe, expect, it } from 'vitest';

import * as forms from '../src';

const question: forms.Question = {
  id: 'question-1',
  text: 'What is your favorite word?',
};

describe('basic single question form', () => {
  it('initializes', () => {
    const form = forms.createSingleQuestionForm(question);
    expect(form).to.not.toBeNull();
  });

  it('empty field value is ignored', () => {
    const form = forms.createSingleQuestionForm(question);
    const nextForm = forms.updateForm(form, form.question.id, '');
    expect(nextForm).toEqual({
      ...form,
      context: {
        error: 'Required value not provided.',
      },
    });
  });

  it('valid field value is stored on context', () => {
    const form = forms.createSingleQuestionForm(question);
    const nextForm = forms.updateForm(
      form,
      form.question.id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextForm).toEqual({
      ...form,
      context: { value: 'supercalifragilisticexpialidocious' },
    });
  });
});

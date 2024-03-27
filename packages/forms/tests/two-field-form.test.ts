import { describe, expect, test } from 'vitest';

import * as forms from '../src';

const patterns: forms.Pattern[] = [
  {
    type: 'sequence',
    id: 'root',
    data: {
      patterns: ['pattern-1', 'pattern-2'],
    },
    initial: {
      patterns: [],
    },
  },
  {
    type: 'input',
    id: 'pattern-1',
    data: {
      text: 'What is your first name?',
      initial: '',
      required: true,
    },
    initial: '',
  },
  {
    type: 'input',
    id: 'pattern-2',
    data: {
      text: 'What is your favorite word?',
      initial: '',
      required: false,
    },
    initial: '',
  },
];
const form = forms.createForm(
  {
    title: 'Form sample',
    description: 'Form sample created via a list of patterns.',
  },
  { root: 'root', patterns }
);

describe('two element form session', () => {
  test('works', () => {
    expect(true).toBe(true);
  });

  // We need to revisit the shape of updateForm.

  /*
  test('initializes', () => {
    const session = forms.createFormSession(form);
    expect(session).to.not.toBeNull();
  });

  test('empty field value on required field is stored with error', () => {
    const session = forms.createFormSession(form);
    const nextSession = forms.updateForm(session, patterns[0].id, null);
    expect(nextSession).toEqual({
      ...session,
      data: {
        errors: {
          'pattern-1': 'Required value not provided.',
        },
        values: {
          'pattern-1': null,
          'pattern-2': '',
        },
      },
    });
  });

  test('valid field value is stored on session', () => {
    const formSession = forms.createFormSession(form);
    const nextSession = forms.updateForm(
      formSession,
      patterns[0].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextSession).toEqual({
      ...formSession,
      data: {
        errors: {},
        values: {
          'pattern-1': 'supercalifragilisticexpialidocious',
          'pattern-2': '',
        },
      },
    });
  });

  test('empty field value on non-required field is set with no errors on the session', () => {
    const session = forms.createFormSession(form);
    const session2 = forms.updateForm(
      session,
      patterns[1].id,
      'supercalifragilisticexpialidocious'
    );
    const session3 = forms.updateForm(session2, patterns[1].id, '');
    expect(session3).toEqual({
      ...session,
      data: {
        errors: {},
        values: {
          'pattern-1': '',
          'pattern-2': '',
        },
      },
    });
  });

  test('valid field value on non-required field is stored on the session', () => {
    const session = forms.createFormSession(form);
    const nextSession = forms.updateForm(
      session,
      patterns[1].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextSession).toEqual({
      ...session,
      data: {
        errors: {},
        values: {
          'pattern-1': '',
          'pattern-2': 'supercalifragilisticexpialidocious',
        },
      },
    });
  });
  */
});

/*
describe('two element prompt', () => {
  const config = forms.defaultFormConfig;
  const session = forms.createFormSession(form);
  test('includes a submit button', () => {
    const prompt = createPrompt(config, session, { validate: true });
    expect(prompt.actions).toEqual([]);
  });
});
*/

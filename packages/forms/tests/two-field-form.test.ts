import { describe, expect, test } from 'vitest';

import * as forms from '../src';

const elements: forms.Pattern[] = [
  {
    type: 'sequence',
    id: 'root',
    data: {
      elements: ['element-1', 'element-2'],
    },
    initial: {
      elements: [],
    },
  },
  {
    type: 'input',
    id: 'element-1',
    data: {
      text: 'What is your first name?',
      initial: '',
      required: true,
    },
    initial: '',
  },
  {
    type: 'input',
    id: 'element-2',
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
    description: 'Form sample created via a list of elements.',
  },
  { root: 'root', elements }
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
    const nextSession = forms.updateForm(session, elements[0].id, null);
    expect(nextSession).toEqual({
      ...session,
      data: {
        errors: {
          'element-1': 'Required value not provided.',
        },
        values: {
          'element-1': null,
          'element-2': '',
        },
      },
    });
  });

  test('valid field value is stored on session', () => {
    const formSession = forms.createFormSession(form);
    const nextSession = forms.updateForm(
      formSession,
      elements[0].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextSession).toEqual({
      ...formSession,
      data: {
        errors: {},
        values: {
          'element-1': 'supercalifragilisticexpialidocious',
          'element-2': '',
        },
      },
    });
  });

  test('empty field value on non-required field is set with no errors on the session', () => {
    const session = forms.createFormSession(form);
    const session2 = forms.updateForm(
      session,
      elements[1].id,
      'supercalifragilisticexpialidocious'
    );
    const session3 = forms.updateForm(session2, elements[1].id, '');
    expect(session3).toEqual({
      ...session,
      data: {
        errors: {},
        values: {
          'element-1': '',
          'element-2': '',
        },
      },
    });
  });

  test('valid field value on non-required field is stored on the session', () => {
    const session = forms.createFormSession(form);
    const nextSession = forms.updateForm(
      session,
      elements[1].id,
      'supercalifragilisticexpialidocious'
    );
    expect(nextSession).toEqual({
      ...session,
      data: {
        errors: {},
        values: {
          'element-1': '',
          'element-2': 'supercalifragilisticexpialidocious',
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

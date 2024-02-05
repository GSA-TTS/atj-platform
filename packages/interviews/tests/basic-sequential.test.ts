import { beforeAll, describe, expect, it } from 'vitest';

import * as interviews from '../src';

describe('basic sequential interview flow', () => {
  let interview: interviews.Interview;

  beforeAll(() => {
    interview = interviews.createSequentialInterview(sequentialInterview);
  });

  it('interview flow is correct', async () => {
    const context = interviews.createFormContext(interview);
    expect(context).toEqual({
      interview: {
        summary: sequentialInterview.summary,
        elements: {
          'element-1': {
            ...sequentialInterview.elements[0],
            id: 'element-1',
          },
          'element-2': {
            ...sequentialInterview.elements[1],
            id: 'element-2',
          },
        },
        strategy: {
          type: 'sequential',
          data: { initial: 'element-1', order: ['element-1', 'element-2'] },
        },
      },
      answers: {},
      prompt: {
        id: 'element-1',
        fields: [
          {
            id: 'element-1',
            name: 'element-1',
            type: 'boolean',
            required: false,
            title: 'Do you like true or false?',
            description:
              'If you like true, enter "yes"; otherwise, enter "no".',
            placeholder: '[yes] or [no]',
            value: 'element-1',
          },
        ],
        buttons: [
          { disabled: false, name: 'back', text: 'Back' },
          { disabled: false, name: 'next', text: 'Next' },
        ],
      },
    });
    /*
    const context2 = interviews.nextContext(context, {
      type: 'answer-element',
      elementId: 'element-1',
      value: 'q1-answer',
    });
    expect(context2).toEqual({
      interview: {
        summary: sequentialInterview.summary,
        elements: context.interview.elements,
        strategy: {
          type: 'sequential',
          data: { initial: 'element-1', order: ['element-1', 'element-2'] },
        },
      },
      answers: {
        'element-1': 'q1-answer',
      },
      prompt: {
        fields: [
          {
            id: 'element-2',
            name: 'element-2',
            type: 'boolean',
            required: true,
            title: 'Tell us your favorite color.',
            description: 'Enter red, green, or blue.',
            placeholder: 'favorite color',
            value: 'q1-answer',
          },
        ],
        buttons: [
          { disabled: false, name: 'back', text: 'Back' },
          { disabled: false, name: 'next', text: 'Next' },
        ],
      },
    });

    // Answer the last element should lead to
    const context3 = interviews.nextContext(context2, {
      type: 'answer-element',
      elementId: 'element-2',
      value: 'q2-answer',
    });
    expect(context3).toEqual({
      interview: context2.interview,
      answers: {
        'element-1': 'q1-answer',
        'element-2': 'q2-answer',
      },
      prompt: {
        fields: [],
        buttons: [{ disabled: false, name: 'back', text: 'Back' }],
        information: 'Thanks for completing this interview',
      },
    });

    // Answering a non-existent element should not transition the context, but
    // return an error.
    const context4 = interviews.nextContext(context3, {
      type: 'answer-element',
      elementId: 'element-3',
      value: 'q3-answer',
    });
    expect(context4).toEqual({
      ...context3,
      error: 'invalid element ID: element-3',
    });
    */
  });
});

const sequentialInterview: interviews.SequentialInterview = {
  summary: {
    title: 'Silly nonsense',
    description:
      'This interview helps us wire up a foundation for guided interviews',
  },
  elements: [
    {
      fact: {
        type: 'boolean',
        initial: false,
      },
      field: {
        id: 'element-1',
        name: 'element-1',
        type: 'boolean',
        required: false,
        title: 'Do you like true or false?',
        description: 'If you like true, enter "yes"; otherwise, enter "no".',
        placeholder: '[yes] or [no]',
      },
    },
    {
      fact: {
        type: 'text',
        initial: '',
      },
      field: {
        id: 'element-2',
        name: 'element-2',
        type: 'boolean',
        required: true,
        title: 'Tell us your favorite color.',
        description: 'Enter red, green, or blue.',
        placeholder: 'favorite color',
      },
    },
  ],
};

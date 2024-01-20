import { beforeAll, describe, expect, it } from 'vitest';

import * as interviews from '../src';

describe('basic sequential interview flow', () => {
  let interview: interviews.Interview;

  beforeAll(() => {
    interview = interviews.createSequentialInterview(sequentialInterview);
  });

  it('interview flow is correct', async () => {
    const context = interviews.createInterviewContext(interview);
    expect(context).toEqual({
      interview: {
        summary: sequentialInterview.summary,
        questions: {
          'question-1': {
            ...sequentialInterview.questionList[0],
            id: 'question-1',
          },
          'question-2': {
            ...sequentialInterview.questionList[1],
            id: 'question-2',
          },
        },
        strategy: {
          type: 'sequential',
          data: { initial: 'question-1', order: ['question-1', 'question-2'] },
        },
      },
      answers: {},
      prompt: {
        id: 'question-1',
        fields: [
          {
            id: 'question-1',
            name: 'question-1',
            type: 'boolean',
            required: false,
            title: 'Do you like true or false?',
            description:
              'If you like true, enter "yes"; otherwise, enter "no".',
            placeholder: '[yes] or [no]',
            value: 'question-1',
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
      type: 'answer-question',
      questionId: 'question-1',
      value: 'q1-answer',
    });
    expect(context2).toEqual({
      interview: {
        summary: sequentialInterview.summary,
        questions: context.interview.questions,
        strategy: {
          type: 'sequential',
          data: { initial: 'question-1', order: ['question-1', 'question-2'] },
        },
      },
      answers: {
        'question-1': 'q1-answer',
      },
      prompt: {
        fields: [
          {
            id: 'question-2',
            name: 'question-2',
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

    // Answer the last question should lead to
    const context3 = interviews.nextContext(context2, {
      type: 'answer-question',
      questionId: 'question-2',
      value: 'q2-answer',
    });
    expect(context3).toEqual({
      interview: context2.interview,
      answers: {
        'question-1': 'q1-answer',
        'question-2': 'q2-answer',
      },
      prompt: {
        fields: [],
        buttons: [{ disabled: false, name: 'back', text: 'Back' }],
        information: 'Thanks for completing this interview',
      },
    });

    // Answering a non-existent question should not transition the context, but
    // return an error.
    const context4 = interviews.nextContext(context3, {
      type: 'answer-question',
      questionId: 'question-3',
      value: 'q3-answer',
    });
    expect(context4).toEqual({
      ...context3,
      error: 'invalid question ID: question-3',
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
  questionList: [
    {
      fact: {
        type: 'boolean',
        initial: false,
      },
      field: {
        id: 'question-1',
        name: 'question-1',
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
        id: 'question-2',
        name: 'question-2',
        type: 'boolean',
        required: true,
        title: 'Tell us your favorite color.',
        description: 'Enter red, green, or blue.',
        placeholder: 'favorite color',
      },
    },
  ],
};

import { beforeAll, describe, expect, it, vi } from 'vitest';

import * as interviews from '../src';

describe('basic sequential interview flow', () => {
  let interview: interviews.Interview;

  beforeAll(() => {
    interview = interviews.createSequentialInterview(sequentialInterview);
  });

  it('works', async () => {
    const context = interviews.createInterviewContext(interview);
    expect(context).toEqual({
      interview: {
        summary: sequentialInterview.summary,
        questions: {
          'question-1': sequentialInterview.questionList[0],
          'question-2': sequentialInterview.questionList[1],
        },
        strategy: {
          type: 'sequential',
          data: { initial: 'question-1', order: ['question-1', 'question-2'] },
        },
      },
      current: 'question-1',
      answers: {},
    });

    const context2 = interviews.answerQuestion(
      context,
      'question-1',
      'q1-answer'
    );
    expect(context2).toEqual({
      interview: {
        summary: sequentialInterview.summary,
        questions: {
          'question-1': sequentialInterview.questionList[0],
          'question-2': sequentialInterview.questionList[1],
        },
        strategy: {
          type: 'sequential',
          data: { initial: 'question-1', order: ['question-1', 'question-2'] },
        },
      },
      current: 'question-2',
      answers: {
        'question-1': 'q1-answer',
      },
    });

    // Answer the last question should lead to
    const context3 = interviews.answerQuestion(
      context2,
      'question-2',
      'q2-answer'
    );
    expect(context3).toEqual({
      interview: context2.interview,
      current: null,
      answers: {
        'question-1': 'q1-answer',
        'question-2': 'q2-answer',
      },
    });

    // Answering a non-existent question should not transition the context, but
    // return an error.
    const context4 = interviews.answerQuestion(
      context3,
      'question-3',
      'q3-answer'
    );
    expect(context4).toEqual({
      ...context3,
      error: 'invalid question ID: question-3',
    });
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
      prompt: {
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
      prompt: {
        required: true,
        title: 'Tell us your favorite color.',
        description: 'Enter red, green, or blue.',
        placeholder: 'favorite color',
      },
    },
  ],
};

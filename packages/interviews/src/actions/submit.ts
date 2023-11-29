import { validAnswer } from '../answer';
import { Interview } from '../interview';
import { InterviewContext } from '../interview-context';
import { Button } from '../prompt';
import { Question, QuestionId } from '../question';
import { type IStrategy, processStrategy } from '../strategies';

export const handleSubmit = <
  I extends Interview,
  C extends InterviewContext<I>,
>(
  context: C,
  strategy: IStrategy<I>,
  formData: FormData
): C => {
  const submitButton = getSubmitButton(context.prompt.buttons, formData);
  //const nextContext = applyPrompt(context.prompt, formData);
  //const nextContext = answerQuestionById(context, action.questionId, formData);
  if (submitButton === 'next') {
    return {
      prompt: strategy.nextPrompt(context.interview, prompt),
    };
  }
  return context;
};

const answerQuestionById = <
  I extends Interview,
  C extends InterviewContext<I>,
  Q extends Extract<keyof I['questions'], QuestionId>,
  V extends I['questions'][Q]['fact']['initial'],
>(
  context: C,
  questionId: Q,
  formData: FormData
): InterviewContext<I> => {
  const question = context.interview.questions[questionId];
  if (question === undefined) {
    return {
      ...context,
      error: `invalid question ID: ${questionId}`,
    };
  }

  const value = getFieldValue(formData, question);
  if (!validAnswer(question, formData.get('questionId'))) {
    return {
      ...context,
      error: `invalid answer: ${value}`,
    };
  }

  return {
    interview: context.interview,
    prompt: processStrategy(context.interview, questionId, value),
    answers: {
      ...context.answers,
      [questionId]: value,
    },
  };
};

const answerQuestion = <I extends Interview, C extends InterviewContext<I>>(
  context: C,
  question: Question,
  formData: FormData
): InterviewContext<I> => {
  const value = getFieldValue(formData, question);
  if (!validAnswer(question, formData.get('questionId'))) {
    return {
      ...context,
      error: `invalid answer: ${value}`,
    };
  }

  return {
    interview: context.interview,
    prompt: processStrategy(context.interview, question.field.id, value),
    answers: {
      ...context.answers,
      [questionId]: value,
    },
  };
};

const getSubmitButton = <I extends Interview>(
  buttons: Button[],
  formData: FormData
) => {
  const matches = buttons
    .filter(button => formData.has(button.name))
    .map(button => formData.get(button.name));
  if (matches.length === 0) {
    throw new Error('no submitter provided');
  }
  if (matches.length > 1) {
    throw new Error(`more than one submitter: ${matches.join(', ')}`);
  }
  return matches[0];
};

const getFieldValue = (formData: FormData, question: Question) => {
  const field = formData.get(question.field.name);
  if (field === null) {
    throw new Error(`field not found: ${question.field.name}`);
  }
  // For expediency, hardcode some checks for now.
  if (question.fact.type === 'boolean') {
    return field.toString() === '1';
  } else if (question.fact.type === 'text') {
    return field.toString();
  }
};

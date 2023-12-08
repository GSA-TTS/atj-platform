type QuestionId = string;

export type Question = {
  id: QuestionId;
  text: string;
};

export type FormContext = {
  context: {};
  question: Question;
};

export const createSingleQuestionForm = (question: Question): FormContext => {
  return {
    context: {},
    question,
  };
};

export const updateForm = (form: FormContext, id: QuestionId, value: any) => {
  if (form.question.id !== id) {
    console.error(`Question "${id}" does not exist on form.`);
    return form;
  }
  if (!value) {
    return {
      ...form,
      context: { error: 'Required value not provided.' },
    };
  }
  return {
    ...form,
    context: { value },
  };
};

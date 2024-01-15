import { DocumentFieldMap, Form, Question, addQuestions } from '@atj/forms';
import { PDFDocument } from './pdf';

export type DocumentTemplate = PDFDocument;

export const addDocumentFieldsToForm = (
  form: Form,
  fields: DocumentFieldMap
) => {
  const questions: Question[] = [];
  Object.entries(fields).map(([key, field]) => {
    if (field.type === 'CheckBox') {
      questions.push({
        id: field.name,
        text: field.label,
        initial: field.value,
        required: field.required,
      });
    } else if (field.type === 'OptionList') {
      questions.push({
        id: field.name,
        text: field.label,
        initial: field.value,
        required: field.required,
      });
    } else if (field.type === 'Dropdown') {
      questions.push({
        id: field.name,
        text: field.label,
        initial: field.value,
        required: field.required,
      });
    } else if (field.type === 'TextField') {
      questions.push({
        id: field.name,
        text: field.label,
        initial: field.value,
        required: field.required,
      });
    } else if (field.type === 'not-supported') {
      console.error(`Skipping field: ${field.error}`);
    } else {
      const _exhaustiveCheck: never = field;
    }
  });
  return addQuestions(form, questions);
};

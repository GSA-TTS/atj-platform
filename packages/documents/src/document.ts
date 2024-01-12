import { Form, Question, addQuestions } from '@atj/forms';
import { PDFDocument } from './pdf';

export type DocumentTemplate = PDFDocument;

export type DocumentFieldValue =
  | {
      type: 'TextField';
      name: string;
      label: string;
      value: string;
      maxLength?: number;
      required: boolean;
    }
  | {
      type: 'CheckBox';
      name: string;
      label: string;
      value: boolean;
      required: boolean;
    }
  | {
      type: 'Dropdown';
      name: string;
      label: string;
      value: string[];
      required: boolean;
    }
  | {
      type: 'OptionList';
      name: string;
      label: string;
      value: string[];
      required: boolean;
    }
  | {
      type: 'not-supported';
      name: string;
      error: string;
    };

export type DocumentFieldMap = Record<string, DocumentFieldValue>;

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

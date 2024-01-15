import {
  DocumentFieldMap,
  Form,
  Question,
  addDocument,
  addQuestions,
} from '@atj/forms';
import { PDFDocument, getDocumentFieldData } from './pdf';
import { suggestFormDetails } from './suggestions';

export type DocumentTemplate = PDFDocument;

export const addDocumentAndData = async (
  form: Form,
  fileDetails: {
    name: string;
    data: Uint8Array;
  }
) => {
  const fields = await getDocumentFieldData(fileDetails.data);
  const fieldMap = suggestFormDetails(fields);
  const withFields = addDocumentFieldsToForm(form, fieldMap);
  const updatedForm = addDocument(withFields, {
    data: fileDetails.data,
    path: fileDetails.name,
    fields,
    formFields: fieldMap,
  });
  return {
    newFields: fields,
    updatedForm,
  };
};

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

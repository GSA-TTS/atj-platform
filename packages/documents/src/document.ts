import {
  DocumentFieldMap,
  FormDefinition,
  FormElement,
  addFormOutput,
  addFormElements,
} from '@atj/forms';
import { PDFDocument, getDocumentFieldData } from './pdf';
import { suggestFormDetails } from './suggestions';

export type DocumentTemplate = PDFDocument;

export const addDocument = async (
  form: FormDefinition,
  fileDetails: {
    name: string;
    data: Uint8Array;
  }
) => {
  const fields = await getDocumentFieldData(fileDetails.data);
  const fieldMap = suggestFormDetails(fields);
  const formWithFields = addDocumentFieldsToForm(form, fieldMap);
  const updatedForm = addFormOutput(formWithFields, {
    data: fileDetails.data,
    path: fileDetails.name,
    fields,
    // TODO: for now, reuse the field IDs from the PDF. we need to generate
    // unique ones, instead.
    formFields: Object.fromEntries(
      Object.keys(fieldMap).map(field => [field, field])
    ),
  });
  return {
    newFields: fields,
    updatedForm,
  };
};

export const addDocumentFieldsToForm = (
  form: FormDefinition,
  fields: DocumentFieldMap
) => {
  const elements: FormElement[] = [];
  Object.entries(fields).map(([key, field]) => {
    if (field.type === 'CheckBox') {
      elements.push({
        type: 'input',
        id: field.name,
        text: field.label,
        initial: field.value,
        required: field.required,
      });
    } else if (field.type === 'OptionList') {
      elements.push({
        type: 'input',
        id: field.name,
        text: field.label,
        initial: field.value,
        required: field.required,
      });
    } else if (field.type === 'Dropdown') {
      elements.push({
        type: 'input',
        id: field.name,
        text: field.label,
        initial: field.value,
        required: field.required,
      });
    } else if (field.type === 'TextField') {
      elements.push({
        type: 'input',
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
  elements.push({
    id: 'root',
    type: 'sequence',
    elements: elements.map(element => element.id),
  });
  return addFormElements(form, elements, 'root');
};

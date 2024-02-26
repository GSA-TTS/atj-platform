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
  console.log('fields', fields);

  const fieldMap = await suggestFormDetails(fileDetails.data, fields);
  console.log('fieldMap', fieldMap);

  const formWithFields = addDocumentFieldsToForm(form, fieldMap);
  console.log('formWithFields', formWithFields);

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
  console.log('updatedForm', updatedForm);

  return {
    newFields: fields,
    updatedForm,
  };
};

export const addDocumentFieldsToForm = (
  form: FormDefinition,
  fields: DocumentFieldMap
) => {
  const elements: FormElement<any>[] = [];
  Object.entries(fields).map(([key, field]) => {
    if (field.type === 'CheckBox') {
      elements.push({
        type: 'input',
        id: field.name,
        data: {
          text: field.label,
          maxLength: 128,
        },
        default: field.value,
        required: field.required,
      });
    } else if (field.type === 'OptionList') {
      elements.push({
        type: 'input',
        id: field.name,
        data: {
          text: field.label,
          maxLength: 128,
        },
        default: field.value,
        required: field.required,
      });
    } else if (field.type === 'Dropdown') {
      elements.push({
        type: 'input',
        id: field.name,
        data: {
          text: field.label,
          maxLength: 128,
        },
        default: field.value,
        required: field.required,
      });
    } else if (field.type === 'TextField') {
      elements.push({
        type: 'input',
        id: field.name,
        data: {
          text: field.label,
          instructions: field.instructions,
          maxLength: 128,
        },
        default: field.value,
        required: field.required,
      });
    } else if (field.type === 'RadioGroup') {
      elements.push({
        type: 'input',
        id: field.name,
        data: {
          text: field.label,
          instructions: field.instructions,
          maxLength: 128,
        },
        default: field.value,
        required: field.required,
      });
    } else if (field.type === 'Paragraph') {
      elements.push({
        type: 'paragraph',
        id: field.name,
        data: {
          text: field.value,
        },
        default: 'remove me from FormElement', // TODO: remove default from FormElement
        required: false, // TODO: remove required from FormElement
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
    data: {
      elements: elements.map(element => element.id),
    },
    default: [],
    required: true,
  });
  return addFormElements(form, elements, 'root');
};

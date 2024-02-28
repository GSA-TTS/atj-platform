import {
  DocumentFieldMap,
  FormDefinition,
  FormElement,
  addFormOutput,
  addFormElements,
} from '@atj/forms';
import { PDFDocument, getDocumentFieldData } from './pdf';
import { getSuggestedFormElementsFromCache } from './suggestions';

export type DocumentTemplate = PDFDocument;

export const addDocument = async (
  form: FormDefinition,
  fileDetails: {
    name: string;
    data: Uint8Array;
  }
) => {
  const fields = await getDocumentFieldData(fileDetails.data);
  const cachedPdf = await getSuggestedFormElementsFromCache(fileDetails.data);

  if (cachedPdf) {
    const withElements = addFormElements(
      form,
      [
        ...cachedPdf.elements,
        {
          id: 'root',
          type: 'sequence',
          data: {
            elements: cachedPdf.elements.map(element => element.id),
          },
          default: {
            elements: [],
          },
          required: true,
        },
      ],
      'root'
    );
    const updatedForm = addFormOutput(withElements, {
      data: fileDetails.data,
      path: fileDetails.name,
      fields: cachedPdf.outputs,
      formFields: Object.fromEntries(
        Object.keys(fields).map(field => [field, field])
      ),
    });
    // TODO: add form outputs
    return {
      newFields: fields,
      updatedForm,
    };
  } else {
    const formWithFields = addDocumentFieldsToForm(form, fields);
    const updatedForm = addFormOutput(formWithFields, {
      data: fileDetails.data,
      path: fileDetails.name,
      fields,
      // TODO: for now, reuse the field IDs from the PDF. we need to generate
      // unique ones, instead.
      formFields: Object.fromEntries(
        Object.keys(fields).map(field => [field, field])
      ),
    });
    return {
      newFields: fields,
      updatedForm,
    };
  }
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

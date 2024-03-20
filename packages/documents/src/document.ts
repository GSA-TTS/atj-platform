import {
  DocumentFieldMap,
  FormDefinition,
  FormElement,
  addFormOutput,
  addFormElements,
  addFormElementMap,
  updateFormSummary,
} from '@atj/forms';
import { PDFDocument, getDocumentFieldData } from './pdf';
import { getSuggestedFormElementsFromCache } from './suggestions';
import { InputElement } from '@atj/forms/src/config/elements/input';
import { stringToBase64 } from './util';

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
    form = updateFormSummary(form, {
      title: cachedPdf.title,
      description: '',
    });
    form = addFormElementMap(form, cachedPdf.elements, cachedPdf.root);
    const updatedForm = addFormOutput(form, {
      data: fileDetails.data,
      path: fileDetails.name,
      fields: cachedPdf.outputs,
      formFields: Object.fromEntries(
        Object.keys(cachedPdf.outputs).map(output => {
          console.log(cachedPdf.outputs[output]);
          return [output, cachedPdf.outputs[output].name];
        })
      ),
    });
    console.log(updatedForm);
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
        Object.keys(fields).map(field => {
          return [field, fields[field].name];
        })
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
  Object.entries(fields).map(([elementId, field]) => {
    if (field.type === 'CheckBox') {
      elements.push({
        type: 'input',
        id: elementId,
        data: {
          label: field.label,
        },
        default: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
        required: field.required,
      } satisfies InputElement);
    } else if (field.type === 'OptionList') {
      elements.push({
        type: 'input',
        id: elementId,
        data: {
          label: field.label,
        },
        default: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
        required: field.required,
      } satisfies InputElement);
    } else if (field.type === 'Dropdown') {
      elements.push({
        type: 'input',
        id: elementId,
        data: {
          label: field.label,
        },
        default: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
        required: field.required,
      } satisfies InputElement);
    } else if (field.type === 'TextField') {
      elements.push({
        type: 'input',
        id: elementId,
        data: {
          label: field.label,
        },
        default: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
        required: field.required,
      } satisfies InputElement);
    } else if (field.type === 'RadioGroup') {
      elements.push({
        type: 'input',
        id: elementId,
        data: {
          label: field.label,
        },
        default: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
        required: field.required,
      } satisfies InputElement);
    } else if (field.type === 'Paragraph') {
      // skip purely presentational fields
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

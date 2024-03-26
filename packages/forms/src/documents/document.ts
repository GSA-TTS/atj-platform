import {
  FormDefinition,
  Pattern,
  addFormOutput,
  addPatterns,
  addPatternMap,
  updateFormSummary,
} from '..';
import { InputElement } from '../config/elements/input';
import { PDFDocument, getDocumentFieldData } from './pdf';
import { getSuggestedPatternsFromCache } from './suggestions';
import { DocumentFieldMap } from './types';

export type DocumentTemplate = PDFDocument;

export const addDocument = async (
  form: FormDefinition,
  fileDetails: {
    name: string;
    data: Uint8Array;
  }
) => {
  const fields = await getDocumentFieldData(fileDetails.data);
  const cachedPdf = await getSuggestedPatternsFromCache(fileDetails.data);

  if (cachedPdf) {
    form = updateFormSummary(form, {
      title: cachedPdf.title,
      description: '',
    });
    form = addPatternMap(form, cachedPdf.elements, cachedPdf.root);
    const updatedForm = addFormOutput(form, {
      data: fileDetails.data,
      path: fileDetails.name,
      fields: cachedPdf.outputs,
      formFields: Object.fromEntries(
        Object.keys(cachedPdf.outputs).map(output => {
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
  const elements: Pattern[] = [];
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
  return addPatterns(form, elements, 'root');
};

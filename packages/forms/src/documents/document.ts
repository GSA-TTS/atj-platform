import {
  Blueprint,
  Pattern,
  addFormOutput,
  addPatterns,
  addPatternMap,
  updateFormSummary,
} from '..';
import { InputPattern } from '../patterns/input';
import { PDFDocument, getDocumentFieldData } from './pdf';
import { getSuggestedPatternsFromCache } from './suggestions';
import { DocumentFieldMap } from './types';

export type DocumentTemplate = PDFDocument;

export const addDocument = async (
  form: Blueprint,
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
    form = addPatternMap(form, cachedPdf.patterns, cachedPdf.root);
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
  form: Blueprint,
  fields: DocumentFieldMap
) => {
  const patterns: Pattern[] = [];
  Object.entries(fields).map(([patternId, field]) => {
    if (field.type === 'CheckBox') {
      patterns.push({
        type: 'input',
        id: patternId,
        data: {
          label: field.label,
        },
        initial: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
      } satisfies InputPattern);
    } else if (field.type === 'OptionList') {
      patterns.push({
        type: 'input',
        id: patternId,
        data: {
          label: field.label,
        },
        initial: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
      } satisfies InputPattern);
    } else if (field.type === 'Dropdown') {
      patterns.push({
        type: 'input',
        id: patternId,
        data: {
          label: field.label,
        },
        initial: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
      } satisfies InputPattern);
    } else if (field.type === 'TextField') {
      patterns.push({
        type: 'input',
        id: patternId,
        data: {
          label: field.label,
        },
        initial: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
      } satisfies InputPattern);
    } else if (field.type === 'RadioGroup') {
      patterns.push({
        type: 'input',
        id: patternId,
        data: {
          label: field.label,
        },
        initial: {
          label: '',
          initial: '',
          required: false,
          maxLength: 128,
        },
      } satisfies InputPattern);
    } else if (field.type === 'Paragraph') {
      // skip purely presentational fields
    } else if (field.type === 'not-supported') {
      console.error(`Skipping field: ${field.error}`);
    } else {
      const _exhaustiveCheck: never = field;
    }
  });
  patterns.push({
    id: 'root',
    type: 'sequence',
    data: {
      patterns: patterns.map(pattern => pattern.id),
    },
    initial: [],
  });
  return addPatterns(form, patterns, 'root');
};

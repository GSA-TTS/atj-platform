import {
  Blueprint,
  Pattern,
  addFormOutput,
  addPatterns,
  addPatternMap,
  updateFormSummary,
} from '..';
import { InputPattern } from '../patterns/input';
import { SequencePattern } from '../patterns/sequence';
import { PDFDocument, getDocumentFieldData } from './pdf';
import { getSuggestedPatterns } from './suggestions';
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
  const parsedPdf = await getSuggestedPatterns(fileDetails.data);

  if (parsedPdf) {
    form = updateFormSummary(form, {
      title: parsedPdf.title || fileDetails.name,
      description: '',
    });
    form = addPatternMap(form, parsedPdf.patterns, parsedPdf.root);
    const updatedForm = addFormOutput(form, {
      data: fileDetails.data,
      path: fileDetails.name,
      fields: parsedPdf.outputs,
      formFields: Object.fromEntries(
        Object.keys(parsedPdf.outputs).map(output => {
          return [output, parsedPdf.outputs[output].name];
        })
      ),
    });
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
  } satisfies SequencePattern);
  return addPatterns(form, patterns, 'root');
};

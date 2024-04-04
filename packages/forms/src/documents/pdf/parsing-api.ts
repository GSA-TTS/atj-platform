import * as z from 'zod';

import { type PatternId, type PatternMap } from '../..';

import { type FieldsetPattern } from '../../patterns/fieldset';
import { type InputPattern } from '../../patterns/input';
import { type ParagraphPattern } from '../../patterns/paragraph';
import { type SequencePattern } from '../../patterns/sequence';

import { stringToBase64, uint8ArrayToBase64 } from '../util';
import { type DocumentFieldMap } from '../types';

const TxInput = z.object({
  input_type: z.literal('Tx'),
  input_params: z.object({
    text: z.string(),
    text_style: z.string(),
    output_id: z.string(),
    placeholder: z.string(),
    instructions: z.string(),
    required: z.boolean(),
    options: z.array(z.string()),
  }),
});

const BtnInput = z.object({
  input_type: z.literal('Btn'),
  input_params: z.object({
    text: z.string(),
    text_style: z.string(),
    output_id: z.string(),
    placeholder: z.string(),
    instructions: z.string(),
    required: z.boolean(),
    options: z.array(z.string()),
  }),
});

const ExtractedInput = z.discriminatedUnion('input_type', [TxInput, BtnInput]);
type ExtractedInput = z.infer<typeof ExtractedInput>;

const ExtractedElement = z.object({
  id: z.string(),
  group_id: z.number(),
  element_type: z.string(),
  element_params: z.object({
    text: z.string(),
    text_style: z.string(),
    options: z.string().array().nullable(),
  }),
  inputs: ExtractedInput.array(),
  parent: z.string().nullable(),
});
type ExtractedElement = z.infer<typeof ExtractedElement>;

const RawTxField = z.object({
  type: z.literal('/Tx'),
  var_name: z.string(),
  field_dict: z.object({
    font_info: z.string(),
    field_type: z.string(),
    coordinates: z.number().array().optional(),
    field_label: z.string(),
    field_instructions: z.string(),
  }),
});

const RawBtnField = z.object({
  type: z.literal('/Btn'),
  var_name: z.string(),
  field_dict: z.object({
    font_info: z.string(),
    flags: z.number(),
    field_type: z.string(),
    field_label: z.string(),
    child_fields: z.array(z.object({ coordinates: z.number().array() })),
    num_children: z.number(),
  }),
});

const ExtractedObject = z.object({
  raw_text: z.string(),
  title: z.string(),
  description: z.string(),
  elements: ExtractedElement.array(),
  raw_fields: z.discriminatedUnion('type', [RawTxField, RawBtnField]).array(),
});

type ExtractedObject = z.infer<typeof ExtractedObject>;

export type ParsedPdf = {
  patterns: PatternMap;
  outputs: DocumentFieldMap; // to populate FormOutput
  root: PatternId;
  title: string;
};

export const callExternalParser = async (
  rawData: Uint8Array
): Promise<ParsedPdf> => {
  const base64 = await uint8ArrayToBase64(rawData);

  // TODO: set this with deploy vars...
  const endpoint =
    'https://10x-atj-doc-automation-staging.app.cloud.gov/api/parse';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pdf: base64,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();

  console.log('json.parsed_pdf.elements is:\n', json.parsed_pdf.elements);

  const extracted: ExtractedObject = ExtractedObject.parse(json.parsed_pdf);

  const parsedPdf: ParsedPdf = {
    patterns: {},
    outputs: {},
    root: 'root',
    title: extracted.title,
  };

  const rootSequence: PatternId[] = [];
  for (const element of extracted.elements) {
    const fieldsetPatterns: PatternId[] = [];
    if (element.inputs.length === 0) {
      parsedPdf.patterns[element.id] = {
        type: 'paragraph',
        id: element.id,
        data: {
          text: element.element_params.text,
          maxLength: 2048,
        },
      } satisfies ParagraphPattern;
      rootSequence.push(element.id);
      continue;
    }
    for (const input of element.inputs) {
      if (input.input_type === 'Tx') {
        const id = stringToBase64(input.input_params.output_id);
        parsedPdf.patterns[id] = {
          type: 'input',
          id,
          data: {
            label: input.input_params.instructions,
            required: false,
            initial: '',
            maxLength: 128,
          },
        } satisfies InputPattern;
        fieldsetPatterns.push(id);
        parsedPdf.outputs[id] = {
          type: 'TextField',
          name: input.input_params.output_id,
          label: input.input_params.instructions,
          value: '',
          maxLength: 1024,
          required: input.input_params.required,
        };
      }
    }
    if (fieldsetPatterns.length > 0) {
      parsedPdf.patterns[element.id] = {
        id: element.id,
        type: 'fieldset',
        data: {
          legend: element.element_params.text,
          patterns: fieldsetPatterns,
        },
      } satisfies FieldsetPattern;
      rootSequence.push(element.id);
    }
  }
  parsedPdf.patterns['root'] = {
    id: 'root',
    type: 'sequence',
    data: {
      patterns: rootSequence,
    },
  } satisfies SequencePattern;
  return parsedPdf;
};

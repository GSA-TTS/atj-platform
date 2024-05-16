import * as z from 'zod';

import { type PatternId, type PatternMap } from '../..';

import { type FieldsetPattern } from '../../patterns/fieldset';
import { type InputPattern } from '../../patterns/input';
import { type ParagraphPattern } from '../../patterns/paragraph';
import { type SequencePattern } from '../../patterns/sequence';

import { stringToBase64, uint8ArrayToBase64 } from '../util';
import { type DocumentFieldMap } from '../types';

/** API v1 response format
 * // formSummary json
 * {
 *   "component_type": "form_summary",
 *   "title": "", // The title of the form.
 *   "description": "" // A brief description of the form.
 * }
 *
 * // TxInput json
 * {
 *   "component_type": "text_input",
 *   "id": "", // A unique identifier for the text input.
 *   "label": "", // The label text for the text input.
 *   "default_value": "", // The default value of the text input.
 *   "required": true // Whether the text input is required.
 * }
 *
 * // checkbox json
 * {
 *   "component_type": "checkbox",
 *   "id": "", // A unique identifier for the checkbox.
 *   "label": "", // The label text for the checkbox.
 *   "default_checked": false // Whether the checkbox is checked by default.
 * }
 *
 * // radioGroup json
 * {
 *   "component_type": "radio_group",
 *   "legend": "", // The legend for the radio group.
 *   "options": [
 *     {
 *       "id": "", // A unique identifier for each option.
 *       "label": "", // The label text for the option.
 *       "name": "", // The name shared by all options in the group.
 *       "default_checked": false // Whether the option is checked by default.
 *     }
 *   ]
 * }
 *
 * // paragraph json
 * {
 *   "component_type": "paragraph",
 *   "text": "" // The text content of the paragraph.
 * }
 *
 * // fieldset json
 * {
 *   "component_type": "fieldset",
 *   "legend": "", // The legend for the field set.
 *   "fields": [] // An array of elements, can include text inputs and checkboxes.
 * }
 */

const FormSummary = z.object({
  component_type: z.literal('form_summary'),
  title: z.string(),
  description: z.string(),
});

const TxInput = z.object({
  component_type: z.literal('text_input'),
  id: z.string(),
  label: z.string(),
  default_value: z.string(),
  required: z.boolean(),
});

const Checkbox = z.object({
  component_type: z.literal('checkbox'),
  id: z.string(),
  label: z.string(),
  default_checked: z.boolean(),
});

const RadioGroupOption = z.object({
  id: z.string(),
  label: z.string(),
  name: z.string(),
  default_checked: z.boolean(),
});

const RadioGroup = z.object({
  component_type: z.literal('radio_group'),
  legend: z.string(),
  options: RadioGroupOption.array(),
});

const Paragraph = z.object({
  component_type: z.literal('paragraph'),
  text: z.string(),
});

const Fieldset = z.object({
  component_type: z.literal('fieldset'),
  legend: z.string(),
  fields: z.union([TxInput, Checkbox]).array(),
});

const ExtractedObject = z.object({
  raw_text: z.string(),
  form_summary: FormSummary,
  elements: z
    .union([TxInput, Checkbox, RadioGroup, Paragraph, Fieldset])
    .array(),
});

type ExtractedObject = z.infer<typeof ExtractedObject>;

export type ParsedPdf = {
  patterns: PatternMap;
  outputs: DocumentFieldMap; // to populate FormOutput
  root: PatternId;
  title: string;
};

export const callExternalParser = async (
  rawData: Uint8Array,
  endpointUrl: string = 'https://10x-atj-doc-automation-staging.app.cloud.gov/api/v1/parse'
): Promise<ParsedPdf> => {
  const base64 = await uint8ArrayToBase64(rawData);

  const response = await fetch(endpointUrl, {
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
  const extracted: ExtractedObject = ExtractedObject.parse(json.parsed_pdf);

  const parsedPdf: ParsedPdf = {
    patterns: {},
    outputs: {},
    root: 'root',
    title: extracted.form_summary.title,
  };

  const rootSequence: PatternId[] = [];

  for (const element of extracted.elements) {
    const random_id = Math.random().toString(36).substring(2, 18); // TODO: verify we like this
    const fieldsetPatterns: PatternId[] = [];

    // Add paragraph elements
    if (element.component_type === 'paragraph') {
      parsedPdf.patterns[random_id] = {
        type: 'paragraph',
        id: random_id,
        data: {
          text: element.text,
        },
      } satisfies ParagraphPattern;
      rootSequence.push(random_id);
      continue;
    }

    // Add fieldset elements to parsedPdf.patterns directly and to fieldsetPatterns
    // TODO: Aren't we adding to parsedPdf.patterns twice?
    if (element.component_type === 'fieldset') {
      for (const input of element.fields) {
        if (input.component_type === 'text_input') {
          const id = stringToBase64(input.id);

          parsedPdf.patterns[id] = {
            type: 'input',
            id,
            data: {
              label: input.label,
              required: false,
              initial: '',
              maxLength: 128,
            },
          } satisfies InputPattern;

          fieldsetPatterns.push(id);

          parsedPdf.outputs[id] = {
            type: 'TextField',
            name: input.id,
            label: input.label,
            value: '',
            maxLength: 1024,
            required: input.required,
          };
        }
        // TODO: Look for checkbox or other element types
      }
    }

    // Add fieldset to parsedPdf.patterns and rootSequence
    if (element.component_type === 'fieldset' && fieldsetPatterns.length > 0) {
      parsedPdf.patterns[random_id] = {
        id: random_id,
        type: 'fieldset',
        data: {
          legend: element.legend,
          patterns: fieldsetPatterns,
        },
      } satisfies FieldsetPattern;
      rootSequence.push(random_id);
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

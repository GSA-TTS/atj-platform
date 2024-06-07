import * as z from 'zod';

import {
  type FormConfig,
  type FormErrors,
  type Pattern,
  type PatternId,
  type PatternMap,
  createPattern,
  defaultFormConfig,
} from '../..';

import { type FieldsetPattern } from '../../patterns/fieldset';
import { type InputPattern } from '../../patterns/input';
import { type ParagraphPattern } from '../../patterns/paragraph';
import { type CheckboxPattern } from '../../patterns/checkbox';
import { type RadioGroupPattern } from '../../patterns/radio-group';
import { type FormSummary } from '../../patterns/form-summary';

import { uint8ArrayToBase64 } from '../util';
import { type DocumentFieldMap } from '../types';
import { PagePattern } from '../../patterns/page/config';
import { PageSetPattern } from '../../patterns/page-set/config';

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
  page: z.number(),
});

const Checkbox = z.object({
  component_type: z.literal('checkbox'),
  id: z.string(),
  label: z.string(),
  default_checked: z.boolean(),
  page: z.number(),
});

const RadioGroupOption = z.object({
  id: z.string(),
  label: z.string(),
  name: z.string(),
  default_checked: z.boolean(),
});

const RadioGroup = z.object({
  id: z.string(),
  component_type: z.literal('radio_group'),
  legend: z.string(),
  options: RadioGroupOption.array(),
  page: z.number(),
});

const Paragraph = z.object({
  component_type: z.literal('paragraph'),
  text: z.string(),
  page: z.number(),
});

const Fieldset = z.object({
  component_type: z.literal('fieldset'),
  legend: z.string(),
  fields: z.union([TxInput, Checkbox]).array(),
  page: z.number(),
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
  errors: {
    type: Pattern['type'];
    data: Pattern['data'];
    errors: FormErrors;
  }[];
  outputs: DocumentFieldMap; // to populate FormOutput
  root: PatternId;
  title: string;
  description: string;
};

export type FetchPdfApiResponse = (
  rawData: Uint8Array,
  url?: string
) => Promise<any>;

export const fetchPdfApiResponse: FetchPdfApiResponse = async (
  rawData: Uint8Array,
  url: string = 'https://10x-atj-doc-automation-staging.app.cloud.gov/api/v1/parse'
) => {
  const base64 = await uint8ArrayToBase64(rawData);
  const response = await fetch(url, {
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
  return await response.json();
};

export const processApiResponse = async (json: any): Promise<ParsedPdf> => {
  const extracted: ExtractedObject = ExtractedObject.parse(json.parsed_pdf);
  const rootSequence: PatternId[] = [];
  const pagePatterns: Record<PatternId, PatternId[]> = {};
  const parsedPdf: ParsedPdf = {
    patterns: {},
    errors: [],
    outputs: {},
    root: 'root',
    title: extracted.form_summary.title || 'Default Form Title',
    description:
      extracted.form_summary.description || 'Default Form Description',
  };

  const summary = processPatternData(
    defaultFormConfig,
    parsedPdf,
    'form-summary',
    {
      title: extracted.form_summary.title || 'Default Form Title',
      description:
        extracted.form_summary.description || 'Default Form Description',
    }
  );
  if (summary) {
    rootSequence.push(summary.id);
  }

  for (const element of extracted.elements) {
    const fieldsetPatterns: PatternId[] = [];

    // Add paragraph elements
    if (element.component_type === 'paragraph') {
      const paragraph = processPatternData<ParagraphPattern>(
        defaultFormConfig,
        parsedPdf,
        'paragraph',
        {
          text: element.text,
        }
      );
      if (paragraph) {
        pagePatterns[element.page] = (pagePatterns[element.page] || []).concat(
          paragraph.id
        );
      }
      continue;
    }

    if (element.component_type === 'checkbox') {
      const checkboxPattern = processPatternData<CheckboxPattern>(
        defaultFormConfig,
        parsedPdf,
        'checkbox',
        {
          label: element.label,
          defaultChecked: element.default_checked,
        }
      );
      if (checkboxPattern) {
        pagePatterns[element.page] = (pagePatterns[element.page] || []).concat(
          checkboxPattern.id
        );
        parsedPdf.outputs[checkboxPattern.id] = {
          type: 'CheckBox',
          name: element.id,
          label: element.label,
          value: false,
          required: true,
        };
      }
      continue;
    }

    if (element.component_type === 'radio_group') {
      const radioGroupPattern = processPatternData<RadioGroupPattern>(
        defaultFormConfig,
        parsedPdf,
        'radio-group',
        {
          label: element.legend,
          options: element.options.map(option => ({
            id: option.id,
            label: option.label,
            name: option.name,
            defaultChecked: option.default_checked,
          })),
        }
      );
      if (radioGroupPattern) {
        pagePatterns[element.page] = (pagePatterns[element.page] || []).concat(
          radioGroupPattern.id
        );
        rootSequence.push(radioGroupPattern.id);
        parsedPdf.outputs[radioGroupPattern.id] = {
          type: 'RadioGroup',
          name: element.id,
          label: element.legend,
          options: element.options.map(option => ({
            id: option.id,
            label: option.label,
            name: option.name,
            defaultChecked: option.default_checked,
          })),
          value: '',
          required: true,
        };
      }
      continue;
    }

    if (element.component_type === 'fieldset') {
      for (const input of element.fields) {
        if (input.component_type === 'text_input') {
          const inputPattern = processPatternData<InputPattern>(
            defaultFormConfig,
            parsedPdf,
            'input',
            {
              label: input.label,
              required: false,
              initial: '',
              maxLength: 128,
            }
          );
          if (inputPattern) {
            fieldsetPatterns.push(inputPattern.id);
            parsedPdf.outputs[inputPattern.id] = {
              type: 'TextField',
              name: input.id,
              label: input.label,
              value: '',
              maxLength: 1024,
              required: input.required,
            };
          }
        }
        if (input.component_type === 'checkbox') {
          const checkboxPattern = processPatternData<CheckboxPattern>(
            defaultFormConfig,
            parsedPdf,
            'checkbox',
            {
              label: input.label,
              defaultChecked: false,
            }
          );
          if (checkboxPattern) {
            fieldsetPatterns.push(checkboxPattern.id);
            parsedPdf.outputs[checkboxPattern.id] = {
              type: 'CheckBox',
              name: input.id,
              label: input.label,
              value: false,
              required: true,
            };
          }
        }
      }
    }

    // Add fieldset to parsedPdf.patterns and rootSequence
    if (element.component_type === 'fieldset' && fieldsetPatterns.length > 0) {
      const fieldset = processPatternData<FieldsetPattern>(
        defaultFormConfig,
        parsedPdf,
        'fieldset',
        {
          legend: element.legend,
          patterns: fieldsetPatterns,
        }
      );
      if (fieldset) {
        pagePatterns[element.page] = (pagePatterns[element.page] || []).concat(
          fieldset.id
        );
      }
    }
  }

  // Create a pattern for the single, first page.
  const pages: PatternId[] = Object.entries(pagePatterns)
    .map(([page, patterns]) => {
      const pagePattern = processPatternData<PagePattern>(
        defaultFormConfig,
        parsedPdf,
        'page',
        {
          title: `Page ${parseInt(page) + 1}`,
          patterns,
        },
        undefined,
        parseInt(page)
      );
      return pagePattern?.id;
    })
    .filter(page => page !== undefined) as PatternId[];

  // Assign the page to the root page set.
  const rootPattern = processPatternData<PageSetPattern>(
    defaultFormConfig,
    parsedPdf,
    'page-set',
    {
      pages,
    },
    'root'
  );
  if (rootPattern) {
    parsedPdf.patterns['root'] = rootPattern;
  }
  return parsedPdf;
};

const processPatternData = <T extends Pattern>(
  config: FormConfig,
  parsedPdf: ParsedPdf,
  patternType: T['type'],
  patternData: T['data'],
  patternId?: PatternId,
  page?: number
) => {
  const result = createPattern<T>(config, patternType, patternData, patternId);
  if (!result.success) {
    parsedPdf.errors.push({
      type: patternType,
      data: patternData,
      errors: result.error,
    });
    return;
  }
  parsedPdf.patterns[result.data.id] = result.data;
  return result.data;
};

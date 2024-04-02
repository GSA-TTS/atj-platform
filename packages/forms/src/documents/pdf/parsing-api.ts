import * as z from 'zod';

import {
  type FormElement,
  type FormElementId,
  type FormElementMap,
} from '../..';

import { ParagraphElement } from '../../config/elements/paragraph';
import { InputElement } from '../../config/elements/input';
import { FieldsetElement } from '../../config/elements/fieldset';

import { stringToBase64 } from '../util';
import { DocumentFieldMap } from '../types';

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
  elements: FormElementMap;
  outputs: DocumentFieldMap; // to populate FormOutput
  root: FormElementId;
  title: string;
};

export const callExternalParser = async (
  rawData: Uint8Array
): Promise<ParsedPdf> => {
  const base64 = btoa(String.fromCharCode(...rawData));

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
    elements: {},
    outputs: {},
    root: 'root',
    title: extracted.title,
  };

  const rootSequence: FormElementId[] = [];
  for (const element of extracted.elements) {
    const fieldsetElements: FormElementId[] = [];
    if (element.inputs.length === 0) {
      parsedPdf.elements[element.id] = {
        type: 'paragraph',
        id: element.id,
        default: {
          text: '',
          maxLength: 2048,
        },
        data: {
          text: element.element_params.text,
          style: element.element_params.text_style,
        },
        required: false,
      } satisfies ParagraphElement;
      rootSequence.push(element.id);
      continue;
    }
    for (const input of element.inputs) {
      if (input.input_type === 'Tx') {
        const id = stringToBase64(input.input_params.output_id);
        parsedPdf.elements[id] = {
          type: 'input',
          id,
          default: {
            required: false,
            label: '',
            initial: '',
            maxLength: 128,
          },
          data: {
            label: input.input_params.instructions,
          },
          required: false,
        } satisfies InputElement;
        fieldsetElements.push(id);
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
    if (fieldsetElements.length > 0) {
      parsedPdf.elements[element.id] = {
        id: element.id,
        type: 'fieldset',
        data: {
          legend: element.element_params.text,
          elements: fieldsetElements,
        },
        default: {
          elements: [],
        },
        required: true,
      } as FieldsetElement;
      rootSequence.push(element.id);
    }
  }
  parsedPdf.elements['root'] = {
    id: 'root',
    type: 'sequence',
    data: {
      elements: rootSequence,
    },
    default: {
      elements: [],
    },
    required: true,
  };
  return parsedPdf;
};

const getElementInputs = (element: ExtractedElement): FormElement[] => {
  return element.inputs
    .map((input: ExtractedInput) => {
      if (input.input_type === 'Tx') {
        return {
          type: 'input',
          id: input.input_params.output_id,
          default: {} as unknown as any,
          data: {
            label: input.input_params.instructions,
          },
          required: true,
        } satisfies InputElement;
      }
      return null as unknown as FormElement;
    })
    .filter((item): item is NonNullable<FormElement> => item !== null);
};

// const PdfFieldMap: Record<string, string> = {
//   County_Name1: 'users1_address_county',
//   Current_First_Name1: 'users1_name_first',
//   Current_Middle_Name1: 'users1_name_middle',
//   Current_Last_Name1: 'users1_name_last',
//   Current_First_Name2: 'users1_name_first__2',
//   Current_Middle_Name2: 'users1_name_middle__2',
//   Current_Last_Name2: 'users1_name_last__2',
//   Street_Address: 'users1_address_line_one',
//   City: 'users1_address_city',
//   State: 'users1_address_state',
//   Zip: 'users1_address_zip',
//   Home_Phone: 'users1_phone',
//   Work_Phone: 'work_phone',
//   DOB: 'users1_birthdate',
//   Birth_First_Name: 'user1_preferred_name_first',
//   Birth_Middle_Name: 'user1_preferred_name_middle',
//   Birth_Last_Name: 'user1_preferred_name_last',
//   County_Name2: 'user1_address_county__2',
//   PhotoID: 'photo_id',
//   'DL#': 'driver_license_number',
//   'ID#': 'non_driver_id_number',
//   Why_change_name1: 'reasons_for_change', // pdf-lib combines the three input lines into a single input
//   Why_change_name2: 'reasons_for_change',
//   Why_change_name3: 'reasons_for_change',
//   New_First_Name: 'users1_previous_names1_first',
//   New_Middle_Name: 'users1_previous_names1_middle',
//   New_Last_Name: 'users1_previous_names1_last',
// };

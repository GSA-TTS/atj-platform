import * as z from 'zod';

import {
  type DocumentFieldMap,
  type FormElement,
  type FormElementId,
  type FormElementMap,
} from '@atj/forms';
import { type InputElement } from '@atj/forms/src/config/elements/input';

import json from './al_name_change.json' assert { type: 'json' };
import { FieldsetElement } from '@atj/forms/src/config/elements/fieldset';

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
    options: z.null(),
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
};

export const parseAlabamaNameChangeForm = (): ParsedPdf => {
  const extracted: ExtractedObject = ExtractedObject.parse(json);
  const parsedPdf: ParsedPdf = {
    elements: {},
    outputs: {},
    root: 'root',
  };
  const rootSequence: FormElementId[] = [];
  for (const element of extracted.elements) {
    const fieldsetElements: FormElementId[] = [];
    for (const input of element.inputs) {
      if (input.input_type === 'Tx') {
        const id = input.input_params.output_id.toLowerCase();
        fieldsetElements.push(id);
        parsedPdf.elements[id] = {
          type: 'input',
          id,
          default: {} as unknown as any,
          data: {
            label: input.input_params.instructions,
          },
          required: false,
        } satisfies FormElement<InputElement>;
        parsedPdf.outputs[id] = {
          type: 'TextField',
          name: input.input_params.text,
          label: input.input_params.instructions,
          value: '',
          maxLength: 1024,
          required: input.input_params.required,
        };
      }
    }
    if (fieldsetElements.length === 1) {
      rootSequence.push(fieldsetElements[0]);
    } else if (fieldsetElements.length > 1) {
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

/*
function parseJson(obj: ExtractedJsonType): Array<any> {
  return parseElements(obj.elements);
}

function parseInputs(
  inputs: ExtractedJsonType['elements'][0]['inputs']
): Array<Record<string, any>> {
  const output = inputs.reduce((acc: any[], input) => {
    const params = input['input_params'];

    // const formElementType should be 'Textfield' if inputType is 'Tx'
    // const formElementType should be 'RadioGroup' if inputType is 'Btn'
    // const formElementType should be 'Checkbox' if inputType is 'Ch'
    // const formElementType should be 'Dropdown' if inputType is 'Dr'

    if (input['input_type'] === 'Tx') {
      const value: DocumentFieldValue = {
        type: 'TextField', // modify api so we can use inputType directly here
        //elementType: 'input',
        //inputType: input['input_type'],
        //inputText: params.text,
        //inputTextStyle: params.text_style,
        name: params.output_id,
        label: params.output_id,
        value: 'Short answer', // modify api to provide this
        //inputPlaceholder: params.placeholder,
        instructions: params.instructions,
        required: true, // api should check if there's a mix, default to true? Can't all be false...
        ///inputOptions: params.options,
      };
      acc.push(value);
    }

    return acc;
  }, []);

  return output;
}

function parseElements(
  pdfElements: ExtractedJsonType['elements']
): FormElement[] {
  const output = pdfElements.reduce((acc, element) => {
    const elementOutput = {
      type: 'Paragraph',
      name: element.id,
      groupId: element.group_id,
      value: element.element_params['text'],
      elementTextStyle: element.element_params.text_style,
      elementOptions: element.element_params.options,
      elementType: element.element_params.elementType,
    };

    const parsedInputs = parseInputs(element['inputs']);
    parsedInputs.forEach(input => {
      input['groupId'] = element.group_id;
    });

    if (!element.element_params.text) {
      acc.push(...parsedInputs);
      return acc;
    }

    acc.push(elementOutput, ...parsedInputs);

    return acc;
  }, []);

  pdfElements.map(pdfElement => {
    const inputs = getElementInputs(pdfElement);
  });

  return output;
}
*/

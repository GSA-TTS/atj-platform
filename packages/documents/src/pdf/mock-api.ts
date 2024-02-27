import * as z from 'zod';

import json from './al_name_change.json' assert { type: 'json' };
import { type DocumentFieldValue } from '@atj/forms';
import { PDFField } from '.';

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

const Element = z.object({
  id: z.string(),
  group_id: z.number(),
  element_type: z.string(),
  element_params: z.object({
    text: z.string(),
    text_style: z.string(),
    options: z.null(),
  }),
  inputs: z.discriminatedUnion('input_type', [TxInput, BtnInput]).array(),
  parent: z.string().nullable(),
});

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
  elements: Element.array(),
  raw_fields: z.discriminatedUnion('type', [RawTxField, RawBtnField]).array(),
});

type ExtractedJsonType = z.infer<typeof ExtractedObject>;

const parsedJson: ExtractedJsonType = ExtractedObject.parse(json);
export const parsedPDF = parseJson(parsedJson);

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

function parseElements(elements: ExtractedJsonType['elements']): Array<any> {
  const output = elements.reduce((acc, element) => {
    const elementId = element.id;
    const groupId = element.group_id;

    const elementOutput = {
      type: 'Paragraph',
      name: elementId,
      groupId,
      value: element.element_params['text'],
      elementTextStyle: element.element_params.text_style,
      elementOptions: element.element_params.options,
      elementType: element.element_params.elementType,
    };

    const parsedInputs = parseInputs(element['inputs']);
    parsedInputs.forEach(input => {
      input['groupId'] = groupId;
    });

    if (!element.element_params.text) {
      acc.push(...parsedInputs);
      return acc;
    }

    acc.push(elementOutput, ...parsedInputs);

    return acc;
  }, []);

  return output;
}

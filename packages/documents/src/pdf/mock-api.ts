import json from './al_name_change.json' assert { type: 'json' };

export function parseJson(obj: any): Array<any> {
  const elements = obj['elements'];
  const output = parseElements(elements);
  return output;
}

export const parsedPDF = parseJson(json);

export function parseInputs(inputs: Array<any>): Array<Record<string, any>> {
  const output = inputs.reduce((acc, input) => {
    const inputType = input['input_type'];
    const params = input['input_params'];
    const inputText = params['text'];
    const inputTextStyle = params['text_style'];
    const inputId = params['output_id'];
    const inputPlaceholder = params['placeholder'];
    const inputInstructions = params['instructions'];
    const inputRequired = params['required'];
    const inputOptions = params['options'];

    // const formElementType should be 'Textfield' if inputType is 'Tx'
    // const formElementType should be 'RedioGroup' if inputType is 'Btn'
    // const formElementType should be 'Checkbox' if inputType is 'Ch'
    // const formElementType should be 'Dropdown' if inputType is 'Dr'

    if (inputType === 'Btn') {
      return acc;
    }

    const output = {
      type: 'TextField', // modify api so we can use inputType directly here
      elementType: 'input',
      inputType,
      inputText,
      inputTextStyle,
      name: inputId,
      label: inputId,
      value: 'Short answer', // modify api to provide this
      inputPlaceholder,
      instructions: inputInstructions,
      required: true, // api should check if there's a mix, default to true? Can't all be false...
      inputOptions,
    };

    acc.push(output);

    return acc;
  }, []);

  return output;
}

export function parseElements(elements: Array<any>): Array<any> {
  const output = elements.reduce((acc, element) => {
    const elementId = element['id'];
    const groupId = element['group_id'];
    const elementParams = element['element_params'];
    const elementText = elementParams['text'];
    const elementTextStyle = elementParams['text_style'];
    const elementOptions = elementParams['options'];
    const elementType = element['element_type'];

    const elementOutput = {
      type: 'Paragraph',
      name: elementId,
      groupId,
      value: elementText,
      elementTextStyle,
      elementOptions,
      elementType,
    };

    const inputs = element['inputs'];
    const parsedInputs = parseInputs(inputs);

    parsedInputs.forEach(input => {
      input['groupId'] = groupId;
    });

    // these elements are garbage should be removed when creating the json
    if (!elementText) {
      acc.push(...parsedInputs);
      return acc;
    }

    acc.push(elementOutput, ...parsedInputs);

    return acc;
  }, []);

  return output;
}

// const example_flat_elements_array = [
//   {
//     'cbcaef47-cde7-4067-8902-65b2fa1a3b75': {
//       elementId: 'cbcaef47-cde7-4067-8902-65b2fa1a3b75',
//       groupId: 15,
//       elementText: 'My name at birth was: ',
//       elementTextStyle: 'JTUTCJ+ArialMT 8.879999999999995',
//       elementOptions: null,
//       elementType: 'text',
//     },
//   },
//   {
//     Birth_First_Name: {
//       elementType: 'input',
//       inputType: 'Tx',
//       inputText:
//         '<input label=Birth_First_Name instructions=Type the first name you were given at birth>',
//       intputTextStyle: 'Helv 10 Tf 0 g',
//       inputId: 'Birth_First_Name',
//       inputPlaceholder: '',
//       intputInstructions: 'Type the first name you were given at birth',
//       intputRequired: false,
//       intputOptions: [],
//       groupId: 15,
//     },
//   },
// ];

// const existing = [
//   {
//     Some_random_key_name: {
//       type: 'Paragraph',
//       name: 'Some_random_key_name',
//       value: 'Your current name: ',
//       groupId: 3,
//     },
//     Current_First_Name1: {
//       type: 'TextField',
//       name: 'Current_First_Name1',
//       label: 'Current_First_Name1',
//       value: 'Short answer',
//       groupId: 3,
//       instructions: 'Type your current first name.',
//       required: true,
//     },
//     Current_Middle_Name1: {
//       type: 'TextField',
//       name: 'Current_Middle_Name1',
//       label: 'Current_Middle_Name1',
//       value: 'Short answer',
//       groupId: 3,
//       instructions: 'Type your current middle name.',
//       required: true,
//     },
//     Current_Last_Name1: {
//       type: 'TextField',
//       name: 'Current_Last_Name1',
//       label: 'Current_Last_Name1',
//       value: 'Short answer',
//       groupId: 3,
//       instructions: 'Type your current last name.',
//       required: true,
//     },
//   },
// ];

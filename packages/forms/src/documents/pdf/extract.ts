import {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFArray,
  PDFRef,
  PDFTextField,
  PDFField,
  PDFCheckBox,
  PDFDropdown,
  PDFOptionList,
  PDFRadioGroup,
} from 'pdf-lib';

import { stringToBase64 } from '../util.js';
import type { DocumentFieldValue, DocumentFieldMap } from '../types.js';

// TODO: copied from pdf-lib acrofield internals, check if it's already exposed outside of acroform somewhere
export const getWidgets = async (pdfDoc: PDFDocument): Promise<PDFDict[]> => {
  return pdfDoc.context
    .enumerateIndirectObjects()
    .map(([, obj]) => obj)
    .filter(
      obj =>
        obj instanceof PDFDict &&
        obj.get(PDFName.of('Type')) === PDFName.of('Annot') &&
        obj.get(PDFName.of('Subtype')) === PDFName.of('Widget')
    )
    .map(obj => obj as PDFDict);
};

export const getDocumentFieldData = async (
  pdfBytes: Uint8Array
): Promise<DocumentFieldMap> => {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const widgets = await getWidgets(pdfDoc);

  pdfDoc.catalog.set(
    PDFName.of('AcroForm'),
    pdfDoc.context.obj({
      Fields: widgets.map(widget => pdfDoc.context.getObjectRef(widget)), // array of widget refs
    })
  );

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  console.log('fields:', fields);

  // // iterate over fields where field instanceof PDFRadioGroup, and put into an array
  // const radioGroupFields = fields.filter(
  //   field => field instanceof PDFRadioGroup
  // );

  // // iterate over radioGroupFields and log the field name, options and the selected option
  // radioGroupFields.forEach(field => {
  //   const name = field.getName();
  //   const value = field.getSelected();
  //   const options = field.getOptions();
  //   console.log(
  //     `PDFRadioGroup Field name: ${name}, options: ${options}, selected: ${value}`
  //   );
  //   const acroField = field.acroField;
  //   const acroname = acroField.getFullyQualifiedName();
  //   const partialName = acroField.getPartialName();
  //   const parent = acroField.getParent();
  //   const parentName = parent?.getFullyQualifiedName();

  //   // make sure length of options is one
  //   if (options.length === 1) {
  //     acroField.setPartialName(`${options[0]}`);
  //     const newAcroname = acroField.getFullyQualifiedName();
  //     console.log(`new acroField name: ${newAcroname}`);
  //     const newName = field.getName();
  //     console.log(`new field name: ${newName}`);
  //   }
  // });

  return Object.fromEntries(
    fields.map(field => {
      return [stringToBase64(field.getName()), getFieldValue(field, pdfDoc)];
    })
  );
};

const getFieldValue = (
  field: PDFField,
  pdfDoc: PDFDocument
): DocumentFieldValue => {
  const acroField = field.acroField;
  const acroname = acroField.getFullyQualifiedName();
  const partialName = acroField.getPartialName();
  const parent = acroField.getParent();
  const parentName = parent?.getFullyQualifiedName();

  const fieldDict = pdfDoc.context.lookup(acroField.ref);

  // Helper function to convert a hexadecimal string to a readable string
  const hexToString = (hex: string): string => {
    // Remove the leading '<' and trailing '>'
    let cleanHex = hex.slice(1, -1);
    // Convert the hex string to a byte array
    let bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.slice(i, i + 2), 16);
    }
    // Decode the byte array as UTF-16
    return new TextDecoder('utf-16').decode(bytes);
  };

  const logFieldDictionary = (dict: PDFDict, level: number = 0): string => {
    const indent = '  '.repeat(level);
    let logEntries = '';

    dict.keys().forEach((key: PDFName) => {
      const value = dict.get(key);
      if (value && 'dict' in value) {
        logEntries += `${indent}${key}:\n`;
        logEntries += logFieldDictionary(value as any, level + 1);
      } else if (value && '<' in value && '>' in value) {
        console.log('Found hex value', value);
        const stringValue = hexToString(value as unknown as string);
        logEntries += `${indent}${key}: ${stringValue}\n`;
      } else {
        logEntries += `${indent}${key}: ${value}\n`;
      }
    });

    if (level === 0) {
      console.log(logEntries.trim()); // Only output at the top level to avoid multiple logs in recursion
    }
    return logEntries;
  };

  const logKidFieldDictionary = (fieldDict: PDFDict, pdfDoc: any) => {
    const kids = fieldDict.lookup(PDFName.of('Kids'));
    if (kids instanceof PDFArray) {
      for (let i = 0; i < kids.size(); i++) {
        const k = kids.get(i);
        const kidDict = pdfDoc.context.lookup(k);
        if (kidDict instanceof PDFDict) {
          console.log('kid Field Dictionary:');
          logFieldDictionary(kidDict);
        }
      }
    }
  };

  // log checkbox fields
  if (field instanceof PDFCheckBox) {
    const name = field.getName();
    const value = field.isChecked();
    console.log(`PDFCheckBox Field name: ${name}, value: ${value}`);

    if (fieldDict instanceof PDFDict) {
      logFieldDictionary(fieldDict);
      logKidFieldDictionary(fieldDict, pdfDoc);
    }
  }

  // log radiogroup fields
  if (field instanceof PDFRadioGroup) {
    const name = field.getName();
    const value = field.getSelected();
    const options = field.getOptions();
    console.log(
      `PDFRadioGroup Field name: ${name}, options: ${options}, selected: ${value}`
    );
    // log acroField name and parent name
    console.log(
      `acroField name: ${acroname}, parent name: ${parentName}, partialName: ${partialName}`
    );

    if (fieldDict instanceof PDFDict) {
      logFieldDictionary(fieldDict);
      logKidFieldDictionary(fieldDict, pdfDoc);
    }
  }

  if (field instanceof PDFTextField) {
    return {
      type: 'TextField',
      name: field.getName(),
      label: field.getName(),
      value: field.getText() || '',
      maxLength: field.getMaxLength(),
      required: field.isRequired(),
    };
  } else if (field instanceof PDFCheckBox) {
    return {
      type: 'CheckBox',
      name: field.getName(),
      label: field.getName(),
      value: field.isChecked(),
      required: field.isRequired(),
    };
  } else if (field instanceof PDFDropdown) {
    return {
      type: 'Dropdown',
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired(),
    };
  } else if (field instanceof PDFOptionList) {
    return {
      type: 'OptionList',
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired(),
    };
  } else if (field instanceof PDFRadioGroup) {
    return {
      type: 'RadioGroup',
      name: field.getName(),
      options: field.getOptions(),
      label: field.getName(),
      value: field.getSelected() || '', // pdfLib allows this to be undefined
      required: field.isRequired(),
    };
  } else {
    return {
      type: 'not-supported',
      name: field.getName(),
      error: `unsupported type: ${field.constructor.name}`,
    };
  }
};

// const getFieldValue = (field: PDFField): DocumentFieldValue => {
//   if (field instanceof PDFTextField) {
//     return {
//       type: 'TextField',
//       name: field.getName(),
//       label: field.getName(),
//       value: field.getText() || '',
//       maxLength: field.getMaxLength(),
//       required: field.isRequired(),
//     };
//   } else if (field instanceof PDFCheckBox) {
//     return {
//       type: 'CheckBox',
//       name: field.getName(),
//       label: field.getName(),
//       value: field.isChecked(),
//       required: field.isRequired(),
//     };
//   } else if (field instanceof PDFDropdown) {
//     return {
//       type: 'Dropdown',
//       name: field.getName(),
//       label: field.getName(),
//       value: field.getSelected(),
//       required: field.isRequired(),
//     };
//   } else if (field instanceof PDFOptionList) {
//     return {
//       type: 'OptionList',
//       name: field.getName(),
//       label: field.getName(),
//       value: field.getSelected(),
//       required: field.isRequired(),
//     };
//   } else if (field instanceof PDFRadioGroup) {
//     return {
//       type: 'RadioGroup',
//       name: field.getName(),
//       options: field.getOptions(),
//       label: field.getName(),
//       value: field.getSelected() || '', // pdfLib allows this to be undefined
//       required: field.isRequired(),
//     };
//   } else {
//     return {
//       type: 'not-supported',
//       name: field.getName(),
//       error: `unsupported type: ${field.constructor.name}`,
//     };
//   }
// };

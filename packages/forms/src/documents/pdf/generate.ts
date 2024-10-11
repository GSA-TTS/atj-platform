import {
  PDFDocument,
  PDFName,
  PDFRadioGroup,
  PDFDict,
  PDFArray,
  PDFString,
  createPDFAcroFields,
  PDFAcroCheckBox,
  type PDFForm,
  PDFCheckBox,
} from 'pdf-lib';

import { Result } from '@atj/common';
import { type FormOutput } from '../../index.js';
import { type PDFFieldType } from './index.js';
import { getWidgets } from './extract.js';

export const createFormOutputFieldData = (
  output: FormOutput,
  formData: Record<string, string>
): Record<string, { value: any; type: PDFFieldType }> => {
  const results = {} as Record<string, { value: any; type: PDFFieldType }>;
  Object.entries(output.fields).forEach(([patternId, docField]) => {
    if (docField.type === 'not-supported') {
      console.error(`unsupported field: ${patternId}: ${docField}`);
      return;
    }
    const outputFieldId = output.formFields[patternId];
    if (outputFieldId === '') {
      console.error(`empty outputFieldId for field: ${patternId}: ${docField}`);
      return;
    }
    results[outputFieldId] = {
      type: docField.type,
      value: formData[patternId],
    };
  });
  return results;
};

export const fillPDF = async (
  pdfBytes: Uint8Array,
  fieldData: Record<string, { value: any; type: PDFFieldType }>
): Promise<Result<Uint8Array>> => {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  // pdf-lib's loader doesn't correctly extract all fields, so we have to do it ourselves
  // TODO: we should wrap PDFDocument.load to do this every time
  const widgets = await getWidgets(pdfDoc);
  // pdfDoc.catalog.set(
  //   PDFName.of('AcroForm'),
  //   pdfDoc.context.obj({
  //     Fields: widgets.map(widget => pdfDoc.context.getObjectRef(widget)), // array of widget refs
  //   })
  // );
  const form = pdfDoc.getForm();
  console.log('fillPDF fieldData is:', fieldData);
  const fieldDataNames = Object.keys(fieldData); // names we got from API
  const fields = form.getFields();
  console.log('fillPDF fields are:', fields);

  // iterate over fields where field instanceof PDFRadioGroup, and put into an array
  const radioGroupFields = fields.filter(
    field => field instanceof PDFRadioGroup
  );

  // iterate over radioGroupFields and log the field name, options and the selected option
  radioGroupFields.forEach(field => {
    const name = field.getName();
    const value = field.getSelected();
    const options = field.getOptions();
    console.log(
      `PDFRadioGroup Field name: ${name}, options: ${options}, selected: ${value}`
    );
    field.select(options[0]);
    console.log(
      `After .select() PDFRadioGroup Field name: ${name}, options: ${options}, selected: ${field.getSelected()}`
    );
    field.select(`${options[0]}`);
    console.log(
      `After .select() as string PDFRadioGroup Field name: ${name}, options: ${options}, selected: ${field.getSelected()}`
    );
    // const acroField = field.acroField;
    // const acroname = acroField.getFullyQualifiedName();
    // const partialName = acroField.getPartialName();
    // const parent = acroField.getParent();
    // const parentName = parent?.getFullyQualifiedName();

    // // make sure length of options is one
    // if (options.length === 1) {
    //   acroField.setPartialName(`${options[0]}`);
    //   const newAcroname = acroField.getFullyQualifiedName();
    //   console.log(`new acroField name: ${newAcroname}`);
    //   const newName = field.getName();
    //   console.log(`new field name: ${newName}`);
    // }
  });

  const fieldNames = fields.map(field => field.getName()); // fieldnames we ripped from the PDF

  // Combine the two arrays with an indication of their source
  const combinedNames = [
    ...fieldDataNames.map(name => ({ name, source: 'API' })),
    ...fieldNames.map(name => ({ name, source: 'pdf-lib' })),
  ];

  // Use a Map to keep track of unique names and their sources
  const uniqueNamesMap = new Map();

  combinedNames.forEach(({ name, source }) => {
    if (!uniqueNamesMap.has(name)) {
      uniqueNamesMap.set(name, []);
    }
    uniqueNamesMap.get(name).push(source);
  });

  // Convert the Map to an array of objects and sort it alphabetically by name
  const uniqueNamesArray = Array.from(uniqueNamesMap.entries())
    .map(([name, sources]) => ({ name, sources }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Console log the resulting array
  console.log('uniqueNamesArray:', uniqueNamesArray);

  try {
    Object.entries(fieldData).forEach(([name, value]) => {
      setFormFieldData(form, value.type, name, value.value);
    });
  } catch (error: any) {
    if (error?.message) {
      return {
        success: false,
        error: error?.message || 'error setting PDF field',
      };
    }

    return {
      success: false,
      error: error?.message || 'error setting PDF field',
    };
  }
  return {
    success: true,
    data: await pdfDoc.save(),
  };
};

const setFormFieldData = (
  form: PDFForm,
  fieldType: PDFFieldType,
  fieldName: string,
  fieldValue: any
) => {
  if (fieldType === 'TextField') {
    const field = form.getTextField(fieldName);
    field.setText(fieldValue);
  } else if (fieldType === 'CheckBox') {
    const field = form.getCheckBox(fieldName);
    if (fieldValue) {
      field.check();
    } else {
      field.uncheck();
    }
  } else if (fieldType === 'Dropdown') {
    const field = form.getDropdown(fieldName);
    field.select(fieldValue);
  } else if (fieldType === 'OptionList') {
    const field = form.getDropdown(fieldName);
    field.select(fieldValue);
  } else if (fieldType === 'RadioGroup') {
    // This logic should work even if pdf-lib misidentifies the field type
    // TODO: radioParent should contain the name, not the id
    const [radioParent, radioChild] = fieldValue.split('.');
    if (radioChild) {
      // TODO: resolve import failure when spaces are present in name, id
      const radioChildWithSpace = radioChild.replace('_', ' ');
      const field = form.getField(fieldName);
      const acroField = field.acroField;
      acroField.dict.set(PDFName.of('V'), PDFName.of(radioChildWithSpace));
      const kids = createPDFAcroFields(acroField.Kids()).map(_ => _[0]);
      kids.forEach(kid => {
        kid.dict.set(PDFName.of('AS'), PDFName.of(radioChildWithSpace));
      });
    } else {
      // do nothing
    }
  } else if (fieldType === 'Paragraph' || fieldType === 'RichText') {
    // do nothing
  } else {
    const exhaustiveCheck: never = fieldType;
  }
};

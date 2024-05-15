import {
  PDFDocument,
  PDFName,
  PDFWidgetAnnotation,
  PDFArray,
  PDFDict,
  PDFString,
  PDFTextField,
  PDFField,
  PDFCheckBox,
  PDFDropdown,
  PDFOptionList,
  PDFRadioGroup,
  PDFObject,
} from 'pdf-lib';

import { stringToBase64 } from '../util';
import type { DocumentFieldValue, DocumentFieldMap } from '../types';

export const getDocumentFieldData = async (
  pdfBytes: Uint8Array
): Promise<DocumentFieldMap> => {
  var pdfDoc = await PDFDocument.load(pdfBytes);

  // These are *all* possible PDF annotation types
  const annotationSubtypes = [
    // PDFName.of('Text'),
    // PDFName.of('Link'),
    // PDFName.of('FreeText'),
    // PDFName.of('Line'),
    // PDFName.of('Square'),
    // PDFName.of('Circle'),
    // PDFName.of('Polygon'),
    // PDFName.of('PolyLine'),
    // PDFName.of('Highlight'),
    // PDFName.of('Underline'),
    // PDFName.of('Squiggly'),
    // PDFName.of('StrikeOut'),
    // PDFName.of('Stamp'),
    // PDFName.of('Caret'),
    // PDFName.of('Ink'),
    // PDFName.of('Popup'),
    // PDFName.of('FileAttachment'),
    // PDFName.of('Sound'),
    // PDFName.of('Movie'),
    PDFName.of('Widget'),
    // PDFName.of('Screen'),
    // PDFName.of('PrinterMark'),
    // PDFName.of('TrapNet'),
    // PDFName.of('Watermark'),
    // PDFName.of('3D'),
    // PDFName.of('Redact'),
  ];

  const getWidgets = (pdfDoc: PDFDocument) =>
    pdfDoc.context
      .enumerateIndirectObjects()
      .map(([, obj]) => obj)
      .filter(
        obj =>
          obj instanceof PDFDict &&
          obj.get(PDFName.of('Type')) === PDFName.of('Annot') &&
          obj.get(PDFName.of('Subtype')) === PDFName.of('Widget')
      )
      .map(obj => obj as PDFDict);

  const newFields = [];
  for (const widget of getWidgets(pdfDoc)) {
    const field = widget.get(PDFName.of('T'));
    const value = widget.get(PDFName.of('V'));
    const widgetDictRef = pdfDoc.context.getObjectRef(widget);
    console.log('FIELD:', field, 'VALUE:', value, 'REF:', widgetDictRef);
    console.log(widget);
    newFields.push(widgetDictRef);
  }

  pdfDoc.catalog.set(
    PDFName.of('AcroForm'),
    pdfDoc.context.obj({
      // SigFlags: 3,
      Fields: newFields,
    })
  );

  const modifiedPdfBytes = await pdfDoc.save({ useObjectStreams: false });
  pdfDoc = await PDFDocument.load(modifiedPdfBytes);

  const pages = pdfDoc.getPages();
  const form = pdfDoc.getForm();
  const fields = form.getFields();

  // const page1AnnotsRaw = pages[0].node.lookupMaybe(
  //   PDFName.of('Annots'),
  //   PDFArray
  // );
  // const page1Annots = page1AnnotsRaw ? page1AnnotsRaw.asArray() : [];

  // const page2AnnotsRaw = pages[1].node.lookupMaybe(
  //   PDFName.of('Annots'),
  //   PDFArray
  // );
  // const page2Annots = page2AnnotsRaw ? page2AnnotsRaw.asArray() : [];

  // console.log('PAGE_1_ANNOTS:', page1Annots.map(String));
  // console.log('PAGE_2_ANNOTS:', page2Annots.map(String));

  // fields.forEach(field => {
  //   if (page1Annots.includes(field.ref)) {
  //     console.log(`${field.getName()} belongs to page 1`);
  //   }
  //   if (page2Annots.includes(field.ref)) {
  //     console.log(`${field.getName()} belongs to page 2`);
  //   }
  // });

  for (const field of fields) {
    console.log(`Name: ${field.getName()}:`, field);
    // const kids = pdfLib
    //   .createPDFAcroFields(field.acroField.Kids())
    //   .map(_ => _[0]);
    // kids.forEach(kid => {
    //   console.log(`kid:`, kid);
    // });
  }

  return Object.fromEntries(
    fields.map(field => {
      return [stringToBase64(field.getName()), getFieldValue(field)];
    })
  );
};

const getFieldValue = (field: PDFField): DocumentFieldValue => {
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

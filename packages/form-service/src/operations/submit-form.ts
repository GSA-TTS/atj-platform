import { createDocumentFieldData, fillPDF } from '@atj/documents';

import { getFormFromStorage } from '../context/browser/form-repo';

export const submitForm = async (
  ctx: { storage: Storage },
  formId: string,
  formData: Record<string, string>
) => {
  const form = getFormFromStorage(ctx.storage, formId);
  if (form === null) {
    return Promise.resolve({
      success: false as const,
      error: 'Form not found',
    });
  }
  const errors = new Array<string>();
  const documents = new Array<{ fileName: string; data: Uint8Array }>();
  for (const document of form.documents) {
    const response = await fetch(document.path);
    const pdfBytes = new Uint8Array(await response.arrayBuffer());
    const docFieldData = createDocumentFieldData(
      document.fields,
      document.formFields,
      formData
    );
    const pdfDocument = await fillPDF(pdfBytes, docFieldData);
    if (!pdfDocument.success) {
      errors.push(pdfDocument.error);
    } else {
      documents.push({
        fileName: document.path,
        data: pdfDocument.data,
      });
    }
  }
  if (errors.length > 0) {
    return {
      success: false as const,
      error: errors.join('\n'),
    };
  }
  return {
    success: true as const,
    data: documents,
  };
};

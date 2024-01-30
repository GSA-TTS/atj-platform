import { useNavigate } from 'react-router-dom';

import { addDocument } from '@atj/documents';
import { createForm } from '@atj/forms';
import { type FormService, createBrowserFormService } from '@atj/form-service';

export const useDocumentImporter = (baseUrl: string) => {
  const navigate = useNavigate();
  const formService = createBrowserFormService();

  return {
    actions: {
      stepOneSelectPdfByUrl: async (url: string) => {
        const result = await stepOneSelectPdfByUrl(
          { formService, baseUrl },
          url
        );
        if (result.success) {
          navigate(`/${result.data}/edit`);
        }
      },
      stepOneSelectPdfByUpload: async (fileDetails: {
        name: string;
        data: Uint8Array;
      }) => {
        const result = await stepOneSelectPdfByUpload(
          { formService },
          fileDetails
        );
        if (result.success) {
          navigate(`/${result.data}/edit`);
        }
      },
    },
  };
};

export const stepOneSelectPdfByUrl = async (
  ctx: { formService: FormService; baseUrl: string },
  url: string
) => {
  const completeUrl = `${ctx.baseUrl}${url}`;
  const response = await fetch(completeUrl);
  const blob = await response.blob();
  const data = new Uint8Array(await blob.arrayBuffer());

  const { updatedForm } = await addDocument(
    createForm({
      title: url,
      description: '',
    }),
    {
      name: url,
      data,
    }
  );
  return ctx.formService.addForm(updatedForm);
};

export const stepOneSelectPdfByUpload = async (
  ctx: { formService: FormService },
  fileDetails: {
    name: string;
    data: Uint8Array;
  }
) => {
  const { updatedForm } = await addDocument(
    createForm({
      title: fileDetails.name,
      description: '',
    }),
    fileDetails
  );
  return ctx.formService.addForm(updatedForm);
};

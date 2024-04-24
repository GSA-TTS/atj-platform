import { type StateCreator } from 'zustand';

import { BlueprintBuilder } from '@atj/forms';
import { type FormManagerContext } from '../../FormManager';
import { type Result } from '@atj/common';

type StoreContext = {
  context: FormManagerContext;
};

export type FormListSlice = {
  context: FormManagerContext;
  createNewFormByPDFUrl: (url: string) => Promise<Result<string>>;
  createNewFormByPDFUpload: (fileDetails: {
    name: string;
    data: Uint8Array;
  }) => Promise<Result<string>>;
};

type FormListSliceCreator = StateCreator<FormListSlice, [], [], FormListSlice>;
export const createFormListSlice =
  ({ context }: StoreContext): FormListSliceCreator =>
  () => ({
    context,
    createNewFormByPDFUrl: async url => {
      const data = await fetchUint8Array(`${context.baseUrl}${url}`);

      const builder = new BlueprintBuilder();
      builder.setFormSummary({
        title: url,
        description: '',
      });
      await builder.addDocument({
        name: url,
        data,
      });
      return context.formService.addForm(builder.form);
    },
    createNewFormByPDFUpload: async fileDetails => {
      const builder = new BlueprintBuilder();
      builder.setFormSummary({
        title: fileDetails.name,
        description: '',
      });
      await builder.addDocument(fileDetails);
      return await context.formService.addForm(builder.form);
    },
  });

const fetchUint8Array = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Uint8Array(await blob.arrayBuffer());
};

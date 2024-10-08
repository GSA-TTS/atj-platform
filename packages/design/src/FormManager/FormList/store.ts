import { type StateCreator } from 'zustand';

import { BlueprintBuilder } from '@atj/forms';
import { type FormManagerContext } from '../../FormManager/index.js';
import { type Result, failure } from '@atj/common';

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

      const builder = new BlueprintBuilder(context.config);
      builder.setFormSummary({
        title: url,
        description: '',
      });
      await builder.addDocument({
        name: url,
        data,
      });
      const result = await context.formService.addForm(builder.form);
      if (result.success) {
        return {
          success: true,
          data: result.data.id,
        };
      } else {
        return failure(result.error.message);
      }
    },
    createNewFormByPDFUpload: async fileDetails => {
      const builder = new BlueprintBuilder(context.config);
      builder.setFormSummary({
        title: fileDetails.name,
        description: '',
      });
      await builder.addDocument(fileDetails);
      const result = await context.formService.addForm(builder.form);
      if (result.success) {
        return {
          success: true,
          data: result.data.id,
        };
      } else {
        return failure(result.error.message);
      }
    },
  });

const fetchUint8Array = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Uint8Array(await blob.arrayBuffer());
};

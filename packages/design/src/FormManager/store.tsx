import React from 'react';
import { type StoreApi, type StateCreator, create } from 'zustand';
import { createContext } from 'zustand-utils';

import { BlueprintBuilder, type Blueprint } from '@atj/forms';

import { type FormEditSlice, createFormEditSlice } from './FormEdit/store';
import { type FormListSlice, createFormListSlice } from './FormList/store';
import { type FormManagerContext } from '.';
import { Result } from '@atj/common';

type StoreContext = {
  context: FormManagerContext;
  form: Blueprint;
};

type FormManagerStore = FormEditSlice & FormListSlice & FormManagerSlice;
const { Provider, useStore } = createContext<StoreApi<FormManagerStore>>();
export const useFormManagerStore = useStore;

const createStore = ({ context, form }: StoreContext) =>
  create<FormManagerStore>((...args) => ({
    ...createFormEditSlice({ context, form })(...args),
    ...createFormListSlice({ context })(...args),
    ...createFormManagerSlice({ context, form })(...args),
  }));

export const FormManagerProvider = (props: {
  context: FormManagerContext;
  form: Blueprint;
  children: React.ReactNode;
}) => {
  return (
    <Provider createStore={() => createStore(props)}>{props.children}</Provider>
  );
};

type FormManagerSlice = {
  context: FormManagerContext;
  form: Blueprint;
  lastSaved?: Date;
  createNewForm: () => Promise<Result<string>>;
  saveForm: (formId: string, blueprint: Blueprint) => void;
};

type FormManagerSliceCreator = StateCreator<
  FormManagerSlice,
  [],
  [],
  FormManagerSlice
>;
const createFormManagerSlice =
  ({ context, form }: StoreContext): FormManagerSliceCreator =>
  (set, get) => ({
    context,
    form,
    createNewForm: async () => {
      const builder = new BlueprintBuilder();
      builder.setFormSummary({
        title: `My form - ${new Date().toISOString()}`,
        description: '',
      });
      return await context.formService.addForm(builder.form);
    },
    saveForm: async (formId, blueprint) => {
      const { context } = get();
      const result = await context.formService.saveForm(formId, blueprint);
      if (result.success) {
        set({ lastSaved: result.data.timestamp });
      }
    },
  });

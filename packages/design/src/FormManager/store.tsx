import React from 'react';
import {
  type StoreApi,
  type StateCreator,
  create,
  UseBoundStore,
} from 'zustand';
import { createContext } from 'zustand-utils';

import { Result } from '@atj/common';
import { BlueprintBuilder, type Blueprint } from '@atj/forms';

import { type FormEditSlice, createFormEditSlice } from './FormEdit/store';
import { type FormListSlice, createFormListSlice } from './FormList/store';
import { type FormManagerContext } from '.';

type StoreContext = {
  context: FormManagerContext;
  formId?: string;
  form: Blueprint;
  savePeriodically?: boolean;
};

type FormManagerStore = FormEditSlice & FormListSlice & FormManagerSlice;
const { Provider, useStore } = createContext<StoreApi<FormManagerStore>>();
export const useFormManagerStore = useStore;

const createStore = ({
  context,
  formId,
  form,
  savePeriodically,
}: StoreContext) => {
  const store = create<FormManagerStore>((...args) => ({
    ...createFormEditSlice({ context, form })(...args),
    ...createFormListSlice({ context })(...args),
    ...createFormManagerSlice({ context, formId, form })(...args),
  }));
  if (savePeriodically) {
    initializePeriodicSave(store);
  }
  return store;
};

export const FormManagerProvider = (props: {
  context: FormManagerContext;
  formId?: string;
  form: Blueprint;
  savePeriodically?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Provider createStore={() => createStore(props)}>{props.children}</Provider>
  );
};

type FormManagerSlice = {
  context: FormManagerContext;
  form: Blueprint;
  formId?: string;
  saveStatus: {
    inProgress: boolean;
    lastSaved?: Date;
  };
  createNewForm: () => Promise<Result<string>>;
  saveForm: (blueprint: Blueprint) => void;
};

type FormManagerSliceCreator = StateCreator<
  FormManagerSlice,
  [],
  [],
  FormManagerSlice
>;
const createFormManagerSlice =
  ({ context, formId, form }: StoreContext): FormManagerSliceCreator =>
  (set, get) => ({
    context,
    form,
    formId,
    saveStatus: {
      inProgress: false,
    },
    createNewForm: async function () {
      const builder = new BlueprintBuilder(context.config);
      builder.setFormSummary({
        title: `My form - ${new Date().toISOString()}`,
        description: '',
      });
      const result = await context.formService.addForm(builder.form);
      if (!result.success) {
        return result;
      }
      return {
        success: true,
        data: result.data.id,
      };
    },
    saveForm: async blueprint => {
      const { context, formId, saveStatus } = get();
      if (saveStatus.inProgress) {
        return;
      }
      set({
        saveStatus: { inProgress: true, lastSaved: saveStatus.lastSaved },
      });
      if (formId === undefined) {
        const result = await context.formService.addForm(blueprint);
        if (result.success) {
          set({
            formId: result.data.id,
            saveStatus: { inProgress: false, lastSaved: result.data.timestamp },
          });
        }
      } else {
        const result = await context.formService.saveForm(formId, blueprint);
        if (result.success) {
          set({
            saveStatus: { inProgress: false, lastSaved: result.data.timestamp },
          });
        }
      }
    },
  });

const initializePeriodicSave = (
  store: UseBoundStore<StoreApi<FormManagerStore>>
) => {
  let lastForm: Blueprint;
  setInterval(async () => {
    const { form, saveForm } = store.getState();
    if (form && form !== lastForm) {
      await saveForm(form);
      lastForm = form;
    }
  }, 5000);
};

import React from 'react';
import { StoreApi, create } from 'zustand';
import { createContext } from 'zustand-utils';

import { type Blueprint, type Pattern, type PatternId } from '@atj/forms';

import {
  type FormEditUIContext,
  type FormEditSlice,
  createFormEditSlice,
} from './FormEdit/store';

const { Provider, useStore } = createContext<StoreApi<FormEditSlice>>();

export const useFormEditStore = useStore;

export const usePattern = <T extends Pattern = Pattern>(id: PatternId) =>
  useFormEditStore(state => state.form.patterns[id] as T);

export const useIsPatternSelected = (id: PatternId) =>
  useFormEditStore(state => state.focusedPattern?.id === id);

export const FormEditProvider = (props: {
  context: FormEditUIContext;
  form: Blueprint;
  children: React.ReactNode;
}) => {
  return (
    <Provider createStore={() => createStore(props)}>{props.children}</Provider>
  );
};

type StoreContext = {
  context: FormEditUIContext;
  form: Blueprint;
};

const createStore = ({ context, form }: StoreContext) =>
  create<FormEditSlice>((...args) => ({
    ...createFormEditSlice({ context, form })(...args),
  }));

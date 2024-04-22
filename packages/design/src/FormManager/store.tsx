import React from 'react';
import { StoreApi, create } from 'zustand';
import { createContext } from 'zustand-utils';

import { type Blueprint } from '@atj/forms';

import { type FormEditSlice, createFormEditSlice } from './FormEdit/store';
import { type FormManagerContext } from '.';

const { Provider, useStore } = createContext<StoreApi<FormEditSlice>>();

export const useFormEditStore = useStore;

export const FormEditProvider = (props: {
  context: FormManagerContext;
  form: Blueprint;
  children: React.ReactNode;
}) => {
  return (
    <Provider createStore={() => createStore(props)}>{props.children}</Provider>
  );
};

type StoreContext = {
  context: FormManagerContext;
  form: Blueprint;
};

const createStore = ({ context, form }: StoreContext) =>
  create<FormEditSlice>((...args) => ({
    ...createFormEditSlice({ context, form })(...args),
  }));

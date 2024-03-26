import React from 'react';
import { StoreApi, create } from 'zustand';
import { createContext } from 'zustand-utils';

import {
  type FormDefinition,
  type PatternMap,
  type PatternProps,
  getPattern,
  FormBuilder,
  Pattern,
} from '@atj/forms';
import { type FormEditUIContext } from './types';

const { Provider, useStore } = createContext<StoreApi<FormEditState>>();

export const useFormEditStore = useStore;

export const FormEditProvider = (props: {
  context: FormEditUIContext;
  form: FormDefinition;
  children: React.ReactNode;
}) => {
  return (
    <Provider createStore={() => createFormEditStore(props)}>
      {props.children}
    </Provider>
  );
};

type FormEditState = {
  context: FormEditUIContext;
  form: FormDefinition;
  selectedElement?: Pattern;

  handleEditClick: (pattern: PatternProps) => void;
  setSelectedElement: (element?: Pattern) => void;
  updateSelectedPattern: (formData: PatternMap) => void;
};

const createFormEditStore = ({
  context,
  form,
}: {
  context: FormEditUIContext;
  form: FormDefinition;
}) =>
  create<FormEditState>((set, get) => ({
    context,
    form,
    handleEditClick: (pattern: PatternProps) => {
      const state = get();
      if (state.selectedElement?.id === pattern._elementId) {
        set({ selectedElement: undefined });
      } else {
        const elementToSet = getPattern(state.form, pattern._elementId);
        set({ selectedElement: elementToSet });
      }
    },
    setSelectedElement: selectedElement => set({ selectedElement }),
    updateSelectedPattern: (formData: PatternMap) => {
      const state = get();
      if (state.selectedElement === undefined) {
        console.warn('No selected element');
        return;
      }
      const builder = new FormBuilder(state.form);
      const success = builder.updatePattern(
        state.context.config,
        state.selectedElement,
        formData
      );
      if (success) {
        set({ form: builder.form, selectedElement: undefined });
      }
    },
  }));

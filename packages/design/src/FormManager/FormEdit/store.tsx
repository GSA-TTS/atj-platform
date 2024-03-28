import React from 'react';
import { StoreApi, create } from 'zustand';
import { createContext } from 'zustand-utils';

import {
  type Blueprint,
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
  form: Blueprint;
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
  form: Blueprint;
  selectedPattern?: Pattern;
  availablePatterns: {
    patternType: string;
    displayName: string;
  }[];

  addPattern: (patternType: string) => void;
  handleEditClick: (pattern: PatternProps) => void;
  setSelectedPattern: (element?: Pattern) => void;
  updateSelectedPattern: (formData: PatternMap) => void;
};

const createFormEditStore = ({
  context,
  form,
}: {
  context: FormEditUIContext;
  form: Blueprint;
}) =>
  create<FormEditState>((set, get) => ({
    context,
    form,
    availablePatterns: Object.entries(context.config.patterns).map(
      ([patternType, patternConfig]) => ({
        patternType,
        displayName: patternConfig.displayName,
      })
    ),
    addPattern: (patternType: string) => {
      const state = get();
      const builder = new FormBuilder(state.form);
      const newPattern = builder.addPattern(state.context.config, patternType);
      set({ form: builder.form, selectedPattern: newPattern });
    },
    handleEditClick: (pattern: PatternProps) => {
      const state = get();
      if (state.selectedPattern?.id === pattern._patternId) {
        set({ selectedPattern: undefined });
      } else {
        const elementToSet = getPattern(state.form, pattern._patternId);
        set({ selectedPattern: elementToSet });
      }
    },
    setSelectedPattern: selectedPattern => set({ selectedPattern }),
    updateSelectedPattern: (formData: PatternMap) => {
      const state = get();
      if (state.selectedPattern === undefined) {
        console.warn('No selected element');
        return;
      }
      const builder = new FormBuilder(state.form);
      const success = builder.updatePattern(
        state.context.config,
        state.selectedPattern,
        formData
      );
      if (success) {
        set({ form: builder.form, selectedPattern: undefined });
      }
    },
  }));

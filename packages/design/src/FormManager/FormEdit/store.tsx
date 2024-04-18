import React from 'react';
import { StoreApi, create } from 'zustand';
import { createContext } from 'zustand-utils';

import {
  type Blueprint,
  type Pattern,
  type PatternId,
  type PatternMap,
  getPattern,
  BlueprintBuilder,
} from '@atj/forms';
import { type FormEditUIContext } from './types';

const { Provider, useStore } = createContext<StoreApi<FormEditState>>();

export const useFormEditStore = useStore;

export const usePattern = (id: PatternId) =>
  useFormEditStore(state => getPattern(state.form, id));

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
  focusedPattern?: Pattern;
  availablePatterns: {
    patternType: string;
    displayName: string;
  }[];

  addPattern: (patternType: string) => void;
  deleteSelectedPattern: () => void;
  setFocus: (patternId: PatternId) => void;
  setSelectedPattern: (element?: Pattern) => void;
  updatePattern: (data: Pattern) => void;
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
      const builder = new BlueprintBuilder(state.form);
      const newPattern = builder.addPattern(state.context.config, patternType);
      set({ form: builder.form, focusedPattern: newPattern });
    },
    deleteSelectedPattern: () => {
      const state = get();
      if (state.focusedPattern === undefined) {
        return;
      }
      const builder = new BlueprintBuilder(state.form);
      builder.removePattern(state.context.config, state.focusedPattern.id);
      set({ focusedPattern: undefined, form: builder.form });
    },
    setFocus: (patternId: PatternId) => {
      const state = get();
      if (state.focusedPattern?.id === patternId) {
        return;
      }
      const elementToSet = getPattern(state.form, patternId);
      set({ focusedPattern: elementToSet });
    },
    setSelectedPattern: focusedPattern => set({ focusedPattern }),
    updatePattern: (pattern: Pattern) => {
      const state = get();
      const builder = new BlueprintBuilder(state.form);
      const success = builder.updatePattern(
        state.context.config,
        state.form.patterns[pattern.id],
        {
          [pattern.id]: pattern,
        }
      );
      if (success) {
        set({ form: builder.form, focusedPattern: undefined });
      }
    },
    updateSelectedPattern: (formData: PatternMap) => {
      const state = get();
      if (state.focusedPattern === undefined) {
        console.warn('No selected element');
        return;
      }
      const builder = new BlueprintBuilder(state.form);
      const success = builder.updatePattern(
        state.context.config,
        state.focusedPattern,
        formData
      );
      if (success) {
        set({ form: builder.form, focusedPattern: undefined });
      }
    },
  }));

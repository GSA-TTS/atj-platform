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
import { type FormEditUIContext } from './FormEdit/types';

const { Provider, useStore } = createContext<StoreApi<FormEditState>>();

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
  updatePatternById: (id: PatternId, formData: PatternMap) => void;
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
    addPattern: patternType => {
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
    setFocus: patternId => {
      const state = get();
      if (state.focusedPattern?.id === patternId) {
        return;
      }
      const elementToSet = getPattern(state.form, patternId);
      set({ focusedPattern: elementToSet });
    },
    setSelectedPattern: focusedPattern => set({ focusedPattern }),
    updatePattern: pattern => {
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
    updatePatternById: (id, formData) => {
      const state = get();
      const builder = new BlueprintBuilder(state.form);
      const success = builder.updatePatternById(
        state.context.config,
        id,
        formData
      );
      if (success) {
        set({ form: builder.form });
      }
    },
    updateSelectedPattern: formData => {
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

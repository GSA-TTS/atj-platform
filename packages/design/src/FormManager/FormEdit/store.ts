import { StateCreator } from 'zustand';

import {
  type Blueprint,
  type Pattern,
  type PatternId,
  type PatternMap,
  getPattern,
  BlueprintBuilder,
} from '@atj/forms';
import { type FormEditUIContext } from './types';

export { type FormEditUIContext } from './types';

export type FormEditSlice = {
  context: FormEditUIContext;
  form: Blueprint;
  focusedPattern?: Pattern;
  availablePatterns: {
    patternType: string;
    displayName: string;
  }[];

  addPattern: (patternType: string) => void;
  deleteSelectedPattern: () => void;
  saveForm: (formId: string, blueprint: Blueprint) => void;
  setFocus: (patternId: PatternId) => void;
  setSelectedPattern: (element?: Pattern) => void;
  updatePattern: (data: Pattern) => void;
  updatePatternById: (id: PatternId, formData: PatternMap) => void;
  updateSelectedPattern: (formData: PatternMap) => void;
};

type FormEditStoreContext = {
  context: FormEditUIContext;
  form: Blueprint;
};

type FormEditStoreCreator = StateCreator<FormEditSlice, [], [], FormEditSlice>;

export const createFormEditSlice =
  ({ context, form }: FormEditStoreContext): FormEditStoreCreator =>
  (set, get) => ({
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
    saveForm: (formId, blueprint) => {
      const { context } = get();
      context.formService.saveForm(formId, blueprint);
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
  });

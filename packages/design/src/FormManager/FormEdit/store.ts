import { StateCreator } from 'zustand';

import {
  type Blueprint,
  type Pattern,
  type PatternId,
  type PatternMap,
  getPattern,
  BlueprintBuilder,
} from '@atj/forms';
import { type FormManagerContext } from '..';

export type FormEditSlice = {
  context: FormManagerContext;
  form: Blueprint;
  focusedPattern?: Pattern;
  availablePatterns: {
    patternType: string;
    displayName: string;
  }[];

  addPattern: (patternType: string) => void;
  deleteSelectedPattern: () => void;
  setFocus: (patternId: PatternId) => void;
  updatePattern: (data: Pattern) => void;
  updatePatternById: (id: PatternId, formData: PatternMap) => void;
};

type FormEditStoreContext = {
  context: FormManagerContext;
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
    setFocus: patternId => {
      const state = get();
      if (state.focusedPattern?.id === patternId) {
        return;
      }
      const elementToSet = getPattern(state.form, patternId);
      set({ focusedPattern: elementToSet });
    },
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
      const result = builder.updatePatternById(
        state.context.config,
        id,
        formData
      );
      if (result.success) {
        set({ form: builder.form });
      }
    },
  });

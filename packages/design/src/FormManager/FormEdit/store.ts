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
import { type PatternFocus } from './types';
import { NotificationSlice, createNotificationsSlice } from '../Notifications';

export type FormEditSlice = {
  context: FormManagerContext;
  form: Blueprint;
  focus?: PatternFocus;
  availablePatterns: {
    patternType: string;
    displayName: string;
  }[];

  addPage: () => void;
  addPattern: (patternType: string) => void;
  clearFocus: () => void;
  deleteSelectedPattern: () => void;
  setFocus: (patternId: PatternId) => boolean;
  updatePattern: (data: Pattern) => void;
  updateActivePattern: (formData: PatternMap) => void;
} & NotificationSlice;

type FormEditStoreContext = {
  context: FormManagerContext;
  form: Blueprint;
};

type FormEditStoreCreator = StateCreator<FormEditSlice, [], [], FormEditSlice>;

export const createFormEditSlice =
  ({ context, form }: FormEditStoreContext): FormEditStoreCreator =>
  (set, get, store) => ({
    ...createNotificationsSlice()(set, get, store),
    context,
    form,
    availablePatterns: Object.entries(context.config.patterns).map(
      ([patternType, patternConfig]) => ({
        patternType,
        displayName: patternConfig.displayName,
      })
    ),
    addPage: () => {
      const state = get();
      const builder = new BlueprintBuilder(state.context.config, state.form);
      const newPage = builder.addPage();
      set({ form: builder.form, focus: { pattern: newPage } });
      state.addNotification('success', 'New page added successfully.');
    },
    addPattern: patternType => {
      const state = get();
      const builder = new BlueprintBuilder(state.context.config, state.form);
      const newPattern = builder.addPatternToFirstPage(patternType);
      set({ form: builder.form, focus: { pattern: newPattern } });
      state.addNotification('success', 'Element added successfully.');
    },
    clearFocus: () => {
      set({ focus: undefined });
    },
    deleteSelectedPattern: () => {
      const state = get();
      if (state.focus === undefined) {
        return;
      }
      const builder = new BlueprintBuilder(state.context.config, state.form);
      builder.removePattern(state.focus.pattern.id);
      set({ focus: undefined, form: builder.form });
      state.addNotification('success', 'Element removed successfully.');
    },
    setFocus: function (patternId) {
      const state = get();
      if (state.focus?.pattern.id === patternId) {
        return true;
      }
      if (state.focus?.errors) {
        console.log(state.focus.errors);
        return false;
      }
      const elementToSet = getPattern(state.form, patternId);
      if (elementToSet) {
        set({ focus: { errors: undefined, pattern: elementToSet } });
      } else {
        set({ focus: undefined });
      }
      return true;
    },
    updatePattern: pattern => {
      const state = get();
      const builder = new BlueprintBuilder(state.context.config, state.form);
      const success = builder.updatePattern(state.form.patterns[pattern.id], {
        [pattern.id]: pattern,
      });
      if (success) {
        set({ form: builder.form, focus: undefined });
      }
    },
    updateActivePattern: formData => {
      const state = get();
      if (state.focus === undefined) {
        return;
      }
      const builder = new BlueprintBuilder(state.context.config, state.form);
      const result = builder.updatePatternById(
        state.focus.pattern.id,
        formData
      );
      if (result.success) {
        set({
          form: builder.form,
          focus: {
            pattern: state.focus.pattern,
            errors: undefined,
          },
        });
      } else {
        set({
          focus: {
            pattern: state.focus.pattern,
            errors: result.error,
          },
        });
      }
    },
  });

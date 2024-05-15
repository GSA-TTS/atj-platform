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
import {
  NotificationSlice,
  createNotificationsSlice,
} from '../common/Notifications';

export type FormEditSlice = {
  context: FormManagerContext;
  form: Blueprint;
  focus?: PatternFocus;
  availablePatterns: {
    patternType: string;
    displayName: string;
  }[];

  addPattern: (patternType: string) => void;
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
    addPattern: patternType => {
      const state = get();
      const builder = new BlueprintBuilder(state.form);
      const newPattern = builder.addPattern(state.context.config, patternType);
      set({ form: builder.form, focus: { pattern: newPattern } });
      state.addNotification('info', 'Pattern added.');
    },
    deleteSelectedPattern: () => {
      const state = get();
      if (state.focus === undefined) {
        return;
      }
      const builder = new BlueprintBuilder(state.form);
      builder.removePattern(state.context.config, state.focus.pattern.id);
      set({ focus: undefined, form: builder.form });
      state.addNotification('warning', 'Pattern deleted.');
    },
    setFocus: function (patternId) {
      const state = get();
      if (state.focus?.pattern.id === patternId) {
        return true;
      }
      if (state.focus?.errors) {
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
      const builder = new BlueprintBuilder(state.form);
      const success = builder.updatePattern(
        state.context.config,
        state.form.patterns[pattern.id],
        {
          [pattern.id]: pattern,
        }
      );
      if (success) {
        set({ form: builder.form, focus: undefined });
      }
    },
    updateActivePattern: formData => {
      const state = get();
      if (state.focus === undefined) {
        return;
      }
      const builder = new BlueprintBuilder(state.form);
      const result = builder.updatePatternById(
        state.context.config,
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

import { StateCreator } from 'zustand';

import {
  type Pattern,
  type PatternId,
  type PatternMap,
  type FormSession,
  getPattern,
  BlueprintBuilder,
  mergeSession,
} from '@atj/forms';
import { type FormManagerContext } from '..';
import { type PatternFocus } from './types';
import {
  type NotificationSlice,
  createNotificationsSlice,
} from '../Notifications';

export type FormEditSlice = {
  context: FormManagerContext;
  focus?: PatternFocus;
  availablePatterns: {
    patternType: string;
    displayName: string;
  }[];
  session: FormSession;

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
  session: FormSession;
};

type FormEditStoreCreator = StateCreator<FormEditSlice, [], [], FormEditSlice>;

export const createFormEditSlice =
  ({ context, session }: FormEditStoreContext): FormEditStoreCreator =>
  (set, get, store) => ({
    ...createNotificationsSlice()(set, get, store),
    context,
    availablePatterns: Object.entries(context.config.patterns).map(
      ([patternType, patternConfig]) => ({
        patternType,
        displayName: patternConfig.displayName,
      })
    ),
    session,
    addPage: () => {
      const state = get();
      const builder = new BlueprintBuilder(
        state.context.config,
        state.session.form
      );
      const newPage = builder.addPage();
      set({
        session: mergeSession(state.session, { form: builder.form }),
        focus: { pattern: newPage },
      });
      state.addNotification('success', 'New page added successfully.');
    },
    addPattern: patternType => {
      const state = get();
      const builder = new BlueprintBuilder(
        state.context.config,
        state.session.form
      );
      const newPattern = builder.addPatternToFirstPage(patternType);
      set({
        session: mergeSession(state.session, { form: builder.form }),
        focus: { pattern: newPattern },
      });
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
      const builder = new BlueprintBuilder(
        state.context.config,
        state.session.form
      );
      builder.removePattern(state.focus.pattern.id);
      set({
        focus: undefined,
        session: mergeSession(state.session, { form: builder.form }),
      });
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
      const elementToSet = getPattern(state.session.form, patternId);
      if (elementToSet) {
        set({ focus: { errors: undefined, pattern: elementToSet } });
      } else {
        set({ focus: undefined });
      }
      return true;
    },
    updatePattern: pattern => {
      const state = get();
      const builder = new BlueprintBuilder(
        state.context.config,
        state.session.form
      );
      const success = builder.updatePattern(
        state.session.form.patterns[pattern.id],
        {
          [pattern.id]: pattern,
        }
      );
      if (success) {
        set({
          session: mergeSession(state.session, { form: builder.form }),
          focus: undefined,
        });
      }
    },
    updateActivePattern: formData => {
      const state = get();
      if (state.focus === undefined) {
        return;
      }
      const builder = new BlueprintBuilder(
        state.context.config,
        state.session.form
      );
      const result = builder.updatePatternById(
        state.focus.pattern.id,
        formData
      );
      if (result.success) {
        set({
          session: mergeSession(state.session, { form: builder.form }),
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

import { type FormRoute } from '@atj/forms';
import { create } from 'zustand';

import { getAppContext, type AppContext } from '../../context.js';
import {
  type FormSessionResponse,
  getFormSession,
} from './actions/get-form-session.js';
import { onSubmitForm } from './actions/on-submit-form.js';

type IStore = {
  ctx: AppContext;

  // State
  formId: string;
  formSessionResponse: FormSessionResponse;

  // Actions
  initialize: (opts: { formId: string; route: FormRoute }) => void;
  onSubmitData: (data: Record<string, string>) => void;
};

export const useFormPageStore = create<IStore>((set, get) => ({
  ctx: getAppContext(),

  // State
  formId: '',
  formSessionResponse: { status: 'loading' } as FormSessionResponse,

  // Actions
  initialize(opts) {
    const { ctx } = get();
    // Get the session ID from local storage so we can use it on page reload.
    const sessionId =
      window.localStorage.getItem('form_session_id') || undefined;
    window;
    getFormSession(
      {
        formService: ctx.formService,
        onGetFormSessionResult: result =>
          set({
            formSessionResponse: result,
            formId: opts.formId,
          }),
      },
      { formId: opts.formId, route: opts.route, sessionId }
    );
  },
  onSubmitData: data => {
    const { ctx, formId, formSessionResponse } = get();
    onSubmitForm(ctx, {
      formId,
      data,
      formSessionResponse,
      onSubmitComplete: data => {
        set({
          formSessionResponse: {
            status: 'loaded',
            formSession: data.session,
            sessionId: data.sessionId,
          },
        });
        // Save the session ID to local storage so we can use it on page reload.
        window.localStorage.setItem('form_session_id', data.sessionId);
      },
    });
  },
}));

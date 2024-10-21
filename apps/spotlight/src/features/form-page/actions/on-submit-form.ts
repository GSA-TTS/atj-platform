import {
  type FormRoute,
  type FormSession,
  type FormSessionId,
} from '@atj/forms';
import { type AppContext } from '../../../context.js';
import { type FormSessionResponse } from './get-form-session.js';

type SubmitFormOptions = {
  formId: string;
  sessionId?: string;
  data: Record<string, string>;
  formSessionResponse: FormSessionResponse;
  onSubmitComplete: (data: {
    sessionId: FormSessionId;
    session: FormSession;
    documents?: {
      fileName: string;
      data: Uint8Array;
    }[];
  }) => void;
};

export type OnSubmitForm = (ctx: AppContext, opts: SubmitFormOptions) => void;

export const onSubmitForm: OnSubmitForm = async (ctx, opts) => {
  if (opts.formSessionResponse.status !== 'loaded') {
    console.error("Can't submit data. Form session not loaded");
    return;
  }
  /*const newSession = applyPromptResponse(
                    config,
                    session,
                    response
                  );*/
  const submission = await ctx.formService.submitForm(
    opts.sessionId,
    opts.formId,
    opts.data,
    opts.formSessionResponse.formSession.route
  );
  if (submission.success) {
    for (const document of submission.data.documents || []) {
      downloadPdfDocument(document.fileName, document.data);
    }
    opts.onSubmitComplete(submission.data);
  } else {
    console.error(submission.error);
  }
};

export const downloadPdfDocument = (fileName: string, pdfData: Uint8Array) => {
  const blob = new Blob([pdfData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

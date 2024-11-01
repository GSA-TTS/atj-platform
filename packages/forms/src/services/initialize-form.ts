import { type Result, failure, success } from '@atj/common';

import { BlueprintBuilder } from '../builder/index.js';
import { type FormServiceContext } from '../context/index.js';
import type { FormSummary } from '../types.js';

type InitializeFormError = {
  status: number;
  message: string;
};
type InitializeFormResult = {
  timestamp: string;
  id: string;
};

export type InitializeForm = (
  ctx: FormServiceContext,
  opts: {
    summary?: FormSummary;
    document?: { fileName: string; data: Uint8Array };
  }
) => Promise<Result<InitializeFormResult, InitializeFormError>>;

export const initializeForm: InitializeForm = async (
  ctx,
  { summary, document }
) => {
  if (!ctx.isUserLoggedIn()) {
    return failure({
      status: 401,
      message: 'You must be logged in to initialize a new form',
    });
  }

  const builder = new BlueprintBuilder(ctx.config);

  if (document !== undefined) {
    const parsePdfResult = await ctx
      .parsePdf(document.data)
      .then(result => success(result))
      .catch(err =>
        failure({
          status: 400,
          message: `Failed to parse PDF: ${err.message}`,
        })
      );
    if (!parsePdfResult.success) {
      return parsePdfResult;
    }
    const { parsedPdf } = parsePdfResult.data;

    builder.setFormSummary({
      title: parsedPdf.title || document.fileName,
      description: parsedPdf.description,
    });

    const addDocumentResult = await ctx.repository.addDocument({
      fileName: document.fileName,
      data: document.data,
      extract: parsePdfResult.data,
    });
    if (!addDocumentResult.success) {
      return failure({
        status: 500,
        message: `Failed to add document: ${addDocumentResult.error}`,
      });
    }
    await builder.addDocumentRef({
      id: addDocumentResult.data.id,
      extract: parsedPdf,
    });
  }

  if (summary) {
    builder.setFormSummary(summary);
  }

  const result = await ctx.repository.addForm(builder.form);
  if (!result.success) {
    console.error('Failed to add form:', result.error);
    return failure({
      status: 500,
      message: result.error,
    });
  }
  return result;
};

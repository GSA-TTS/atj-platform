import type { APIRoute } from 'astro';

import { getAstroAppContext } from '../../context.js';

export const POST: APIRoute = async context => {
  const formData = await context.request.formData();
  const formDataObject: Record<string, string> = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value.toString();
  });

  const ctx = await getAstroAppContext(context);
  const session = {} as any;
  const formId = {} as any;
  const result = await ctx.formService.submitForm(
    session,
    formId,
    formDataObject
  );
  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: result.success ? 200 : 500,
  });
};

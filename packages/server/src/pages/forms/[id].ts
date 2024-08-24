import type { APIRoute } from 'astro';

import { getAstroAppContext } from '../../context.js';

export const POST: APIRoute = async context => {
  /*
  const formData = await context.request.formData();
  const formDataObject: Record<string, string> = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value.toString();
  });
  */
  const { formData, session } = await context.request.json();

  const ctx = await getAstroAppContext(context);
  const formId = context.params.id;
  if (formId === undefined) {
    return new Response('Form ID is required', {
      status: 400,
    });
  }
  const result = await ctx.formService.submitForm(session, formId, formData);
  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: result.success ? 200 : 500,
  });
};

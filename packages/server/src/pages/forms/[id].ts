import type { APIRoute } from 'astro';
import { getAstroAppContext } from '../../context';

export const POST: APIRoute = async context => {
  const form = await context.request.json();
  const formData = await context.request.formData();
  const formDataObject: Record<string, string> = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value.toString();
  });
  return new Response();
  /*
  const ctx = await getAstroAppContext(context);
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
  */
};

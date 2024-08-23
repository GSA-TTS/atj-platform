import type { APIRoute } from 'astro';
import { getAstroAppContext } from '../../../context.js';

export const GET: APIRoute = async context => {
  const ctx = await getAstroAppContext(context);
  const formList = await ctx.formService.getFormList();
  return new Response(JSON.stringify(formList), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: formList.success ? 200 : 500,
  });
};

export const POST: APIRoute = async context => {
  const form = await context.request.json();
  const ctx = await getAstroAppContext(context);
  const result = await ctx.formService.addForm(form);
  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: result.success ? 200 : 500,
  });
};

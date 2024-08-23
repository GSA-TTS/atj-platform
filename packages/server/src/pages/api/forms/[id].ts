import type { APIRoute } from 'astro';
import { getAstroAppContext } from '../../../context.js';

export const GET: APIRoute = async context => {
  const ctx = await getAstroAppContext(context);
  const formId = context.params.id;
  if (formId === undefined) {
    return new Response('Form ID is required', {
      status: 400,
    });
  }

  const form = await ctx.formService.getForm(formId);
  return new Response(JSON.stringify(form), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: form.success ? 200 : 500,
  });
};

export const DELETE: APIRoute = async context => {
  const ctx = await getAstroAppContext(context);
  const formId = context.params.id;
  if (formId === undefined) {
    return new Response('Form ID is required', {
      status: 400,
    });
  }

  const result = await ctx.formService.deleteForm(formId);
  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: result.success ? 200 : 500,
  });
};

export const PUT: APIRoute = async context => {
  const ctx = await getAstroAppContext(context);

  const formId = context.params.id;
  if (formId === undefined) {
    return new Response('Form ID is required', {
      status: 400,
    });
  }

  const form = await context.request.json();
  const result = await ctx.formService.saveForm(formId, form);
  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: result.success ? 200 : 500,
  });
};

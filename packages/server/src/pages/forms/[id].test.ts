import { describe, expect, test } from 'vitest';

import { createForm } from '@atj/forms';

import {
  type ServerOptions,
  createTestServerOptions,
} from '../../config/options.js';
import { createServerFormService } from '../../config/services.js';
import { createAstroContainer } from '../../config/testing.js';

import FormPage from './[id].astro';

describe('Form page', () => {
  test('Returns 404 with non-existent form', async () => {
    const serverOptions = await createTestServerOptions();
    const response = await renderFormPage(serverOptions, 'does-not-exist');
    expect(response.status).toBe(404);
  });

  test('Renders html form', async () => {
    const serverOptions = await createTestServerOptions();
    const formService = createServerFormService(serverOptions, {
      isUserLoggedIn: () => true,
    });
    const result = await formService.addForm(
      createForm({ title: 'Form', description: 'Test form' })
    );
    if (!result.success) {
      expect.fail('Failed to add test form');
    }

    const response = await renderFormPage(serverOptions, result.data.id);
    expect(response.status).toBe(200);
    expect(await response.text()).toContain('Form');
  });
});

const renderFormPage = async (serverOptions: ServerOptions, id: string) => {
  const container = await createAstroContainer();
  return await container.renderToResponse(FormPage, {
    locals: {
      serverOptions,
      session: null,
      user: null,
    },
    params: { id },
    request: new Request(`http://localhost/forms/${id}`, {
      method: 'GET',
    }),
  });
};

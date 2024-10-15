import { getAllByRole } from '@testing-library/dom';
import { JSDOM } from 'jsdom';
import { describe, expect, test } from 'vitest';

import {
  type FormService,
  type InputPattern,
  type PagePattern,
  type PageSetPattern,
  createForm,
} from '@atj/forms';

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
    const { formService, serverOptions } = await createTestContext();
    const formResult = await createTestForm(formService);

    const response = await renderFormPage(serverOptions, formResult.data.id);

    expect(response.status).toBe(200);
    expect(await response.text()).toContain('Form');
  });

  test('Handles form submission', async () => {
    const { formService, serverOptions } = await createTestContext();
    const formResult = await createTestForm(formService);

    const pom = new FormPagePOM(serverOptions);
    const document = await pom.loadFormPage(formResult.data.id);

    const inputs = getAllByRole(document.body, 'textbox');
    expect(inputs).toHaveLength(2);
  });
});

const createTestContext = async () => {
  const serverOptions = await createTestServerOptions();
  const formService = createServerFormService(serverOptions, {
    isUserLoggedIn: () => true,
  });
  return {
    formService,
    serverOptions,
  };
};

const createTestForm = async (formService: FormService) => {
  const testForm = createTestBlueprint();
  const result = await formService.addForm(testForm);
  if (!result.success) {
    expect.fail('Failed to add test form');
  }
  return result;
};

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

class FormPagePOM {
  constructor(private serverOptions: ServerOptions) {}

  async loadFormPage(id: string): Promise<Document> {
    const response = await renderFormPage(this.serverOptions, id);
    const text = await response.text();
    const dom = new JSDOM(text);
    return dom.window.document;
  }
}

export const createTestBlueprint = () => {
  return createForm(
    {
      title: 'Test form',
      description: 'Test description',
    },
    {
      root: 'root',
      patterns: [
        {
          type: 'page-set',
          id: 'root',
          data: {
            pages: ['page-1'],
          },
        } satisfies PageSetPattern,
        {
          type: 'page',
          id: 'page-1',
          data: {
            title: 'Page 1',
            patterns: ['element-1', 'element-2'],
          },
        } satisfies PagePattern,
        {
          type: 'input',
          id: 'element-1',
          data: {
            label: 'Pattern 1',
            initial: '',
            required: true,
            maxLength: 128,
          },
        } satisfies InputPattern,
        {
          type: 'input',
          id: 'element-2',
          data: {
            label: 'Pattern 2',
            initial: 'test',
            required: true,
            maxLength: 128,
          },
        } satisfies InputPattern,
      ],
    }
  );
};

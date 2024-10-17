import { getByRole } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { type DOMWindow, JSDOM } from 'jsdom';
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

  test('Renders expected form', async () => {
    const { formService, serverOptions } = await createTestContext();
    const formResult = await createTestForm(formService);
    const pom = new FormPagePOM(serverOptions);
    const { document, FormData } = await pom.loadFormPage(formResult.data.id);

    await userEvent.type(
      getByRole(document.body, 'textbox', { name: 'Pattern 1' }),
      'pattern one value'
    );
    await userEvent.type(
      getByRole(document.body, 'textbox', { name: 'Pattern 2' }),
      'pattern one value'
    );

    const form = getByRole<HTMLFormElement>(document.body, 'form', {
      name: 'Test form',
    });
    const submit = getByRole(document.body, 'button', { name: 'Submit' });
    const formData = new FormData(form, submit);
    const values = Object.fromEntries(formData.entries());
    expect(values).toEqual({
      action: 'submit',
      'element-1': 'pattern one value',
      'element-2': 'pattern one value',
    });
    const postResponse = await pom.postForm(formResult.data.id, formData);
    expect(postResponse.status).toBe(302);
    expect(postResponse.headers.get('Location')).toEqual(
      `/forms/${formResult.data.id}`
    );

    const { document: document2 } = await pom.loadFormPage(formResult.data.id);
    const input1 = getByRole(document2.body, 'textbox', { name: 'Pattern 1' });
    const input2 = getByRole(document2.body, 'textbox', { name: 'Pattern 2' });
    expect(input1).toHaveValue('pattern one value');
    expect(input2).toHaveValue('pattern one value');
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

const postFormPage = async (
  serverOptions: ServerOptions,
  id: string,
  body: FormData
) => {
  const container = await createAstroContainer();
  return await container.renderToResponse(FormPage, {
    locals: {
      serverOptions,
      session: null,
      user: null,
    },
    params: { id },
    request: new Request(`http://localhost/forms/${id}`, {
      method: 'POST',
      body,
    }),
  });
};

class FormPagePOM {
  constructor(private serverOptions: ServerOptions) {}

  async loadFormPage(id: string): Promise<DOMWindow> {
    const response = await renderFormPage(this.serverOptions, id);
    const text = await response.text();
    const dom = new JSDOM(text);
    return dom.window;
  }

  async postForm(id: string, body: FormData) {
    return postFormPage(this.serverOptions, id, body);
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

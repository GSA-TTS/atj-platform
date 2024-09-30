import { type Result } from '@atj/common';
import { FormSession, type Blueprint, type FormService } from '@atj/forms';
import { type FormServiceContext } from '@atj/forms/context';

type FormServiceClientContext = {
  baseUrl: string;
};

export class FormServiceClient implements FormService {
  constructor(private ctx: FormServiceClientContext) {}

  async addForm(form: Blueprint) {
    const response = await fetch(`${this.ctx.baseUrl}api/forms`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async deleteForm(formId: string) {
    const response = await fetch(`${this.ctx.baseUrl}api/forms/${formId}`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  async getForm(formId: string) {
    const response = await fetch(`${this.ctx.baseUrl}api/forms/${formId}`);
    return await response.json();
  }

  async getFormList() {
    const response = await fetch(`${this.ctx.baseUrl}api/forms`);
    return await response.json();
  }

  async saveForm(formId: string, form: Blueprint) {
    const response = await fetch(`${this.ctx.baseUrl}api/forms/${formId}`, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async submitForm(
    sessionId: string | undefined,
    formId: string,
    formData: Record<string, string>,
    queryString?: string
  ): Promise<
    Result<
      {
        fileName: string;
        data: Uint8Array;
      }[]
    >
  > {
    const payload: any = { formId, formData };
    if (sessionId !== undefined) {
      payload['sessionId'] = sessionId;
    }
    if (queryString !== undefined) {
      payload['queryString'] = queryString;
    }

    const response = await fetch(`${this.ctx.baseUrl}forms/${formId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  getContext() {
    return {} as unknown as FormServiceContext;
  }
}

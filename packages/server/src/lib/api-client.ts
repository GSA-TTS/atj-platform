import { type Result } from '@atj/common';
import { FormSession, type Blueprint, type FormService } from '@atj/forms';

type FormServiceClientContext = {
  baseUrl: string;
};

export class FormServiceClient implements FormService {
  constructor(private ctx: FormServiceClientContext) {}

  addForm(form: Blueprint) {
    return fetch(`${this.ctx.baseUrl}api/forms`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  }

  deleteForm(formId: string) {
    return fetch(`${this.ctx.baseUrl}api/forms/${formId}`, {
      method: 'DELETE',
    }).then(res => res.json());
  }

  getForm(formId: string) {
    return fetch(`${this.ctx.baseUrl}api/forms/${formId}`).then(res =>
      res.json()
    );
  }

  getFormList() {
    return fetch(`${this.ctx.baseUrl}api/forms`).then(res => res.json());
  }

  saveForm(formId: string, form: Blueprint) {
    return fetch(`${this.ctx.baseUrl}api/forms/${formId}`, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  }

  submitForm(
    session: FormSession, // TODO: load session from storage by ID
    formId: string,
    formData: Record<string, string>
  ): Promise<
    Result<
      {
        fileName: string;
        data: Uint8Array;
      }[]
    >
  > {
    throw new Error('Not implemented');
  }
}

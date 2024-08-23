import { type Result, type VoidResult, createService } from '@atj/common';
import { type DatabaseContext } from '@atj/database';

import { type Blueprint } from '../index.js';

import { addForm } from './add-form.js';
import { deleteForm } from './delete-form.js';
import { getFormList } from './get-form-list.js';
import { getForm } from './get-form.js';
import { saveForm } from './save-form.js';

export interface FormRepository {
  addForm(form: Blueprint): Promise<Result<{ timestamp: string; id: string }>>;
  deleteForm(formId: string): Promise<VoidResult>;
  getForm(id?: string): Promise<Blueprint | null>;
  getFormList(): Promise<
    | {
        id: string;
        title: string;
        description: string;
      }[]
    | null
  >;
  saveForm(formId: string, form: Blueprint): Promise<VoidResult>;
}

export const createFormsRepository = (ctx: DatabaseContext): FormRepository =>
  createService(ctx, {
    addForm,
    deleteForm,
    getFormList,
    getForm,
    saveForm,
  });

import { createService, type Result, type VoidResult } from '@atj/common';

import type { DatabaseContext } from '../../context/types';
import { addForm } from './add-form';
import { deleteForm } from './delete-form';
import { getFormList } from './get-form-list';
import { getForm } from './get-form';
import { saveForm } from './save-form';

export interface FormRepository {
  addForm(
    form: any /*Blueprint*/
  ): Promise<Result<{ timestamp: Date; id: string }>>;
  deleteForm(formId: string): Promise<VoidResult>;
  getForm(id?: string): Promise</*Blueprint*/ any | null>;
  getFormList(): Promise<
    | {
        id: string;
        title: string;
        description: string;
      }[]
    | null
  >;
  saveForm(formId: string, form: /*Blueprint*/ any): Promise<VoidResult>;
}

export const createFormsRepository = (ctx: DatabaseContext): FormRepository =>
  createService(ctx, {
    addForm,
    deleteForm,
    getFormList,
    getForm,
    saveForm,
  });

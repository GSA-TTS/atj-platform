import { createService } from '@atj/common';

import { type FormServiceContext } from '../context/index.js';

import { addForm } from './add-form.js';
import { deleteForm } from './delete-form.js';
import { getForm } from './get-form.js';
import { getFormList } from './get-form-list.js';
import { saveForm } from './save-form.js';
import { submitForm } from './submit-form.js';

export const createFormService = (ctx: FormServiceContext) =>
  createService(ctx, {
    addForm,
    deleteForm,
    getForm,
    getFormList,
    saveForm,
    submitForm,
  });
/*
export type FormService = Omit<
  ReturnType<typeof createFormService>,
  'getContext'
>;
*/
export type FormService = ReturnType<typeof createFormService>;

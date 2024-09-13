import { beforeEach, expect, it } from 'vitest';

import { type DbTestContext, describeDatabase } from '@atj/database/testing';

import { type Blueprint } from '..';
import { createTestBlueprint } from '../builder/builder.test';
import { type FormSession } from '../session';

import { addForm } from './add-form';
import { upsertFormSession } from './upsert-form-session';

type UpsertTestContext = DbTestContext & {
  form: Blueprint;
  formId: string;
  sessionData: FormSession;
};

describeDatabase('upsertFormSession', () => {
  beforeEach<UpsertTestContext>(async ctx => {
    ctx.form = createTestBlueprint();
    const addFormResult = await addForm(ctx.db.ctx, ctx.form);
    if (!addFormResult.success) {
      expect.fail('Failed to add test form');
    }

    ctx.formId = addFormResult.data.id;
    ctx.sessionData = {
      data: { errors: {}, values: {} },
      form: ctx.form,
    } satisfies FormSession;
  });

  it<UpsertTestContext>('creates and updates form session', async ctx => {
    const result = await upsertFormSession(ctx.db.ctx, {
      formId: ctx.formId,
      data: ctx.sessionData,
    });
    if (!result.success) {
      expect.fail(result.error);
    }

    const kysely = await ctx.db.ctx.getKysely();
    const formSession = await kysely
      .selectFrom('form_sessions')
      .select(['data'])
      .where('id', '=', result.data.id)
      .where('form_id', '=', ctx.formId)
      .executeTakeFirstOrThrow();
    expect(JSON.parse(formSession.data)).toEqual(ctx.sessionData);

    // Upsert a second time
    const result2 = await upsertFormSession(ctx.db.ctx, {
      id: result.data.id,
      formId: ctx.formId,
      data: {},
    });
    if (!result2.success) {
      expect.fail(result2.error);
    }

    const formSession2 = await kysely
      .selectFrom('form_sessions')
      .select(['data'])
      .where('id', '=', result.data.id)
      .where('form_id', '=', ctx.formId)
      .executeTakeFirstOrThrow();
    expect(JSON.parse(formSession2.data)).toEqual({});
  });
});

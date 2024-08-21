import { beforeAll, expect, it, vi } from 'vitest';

import { type DbTestContext, describeDatabase } from '../../testing.js';
import { deleteForm } from './delete-form.js';

describeDatabase('delete form', () => {
  const today = new Date(2000, 1, 1);

  beforeAll(async () => {
    vi.setSystemTime(today);
  });

  it<DbTestContext>('works with valid form ID', async ({ db }) => {
    const kysely = await db.ctx.getKysely();
    await kysely
      .insertInto('forms')
      .values({
        id: '45c66187-64e2-4d75-a45a-e80f1d035bc5',
        data: '{"summary":{"title":"Test form","description":"Test description"},"root":"root","patterns":{"root":{"type":"sequence","id":"root","data":{"patterns":[]}}},"outputs":[]}',
      })
      .execute();

    const result = await deleteForm(
      db.ctx,
      '45c66187-64e2-4d75-a45a-e80f1d035bc5'
    );
    if (result.success === false) {
      expect.fail('addForm failed');
    }

    const selectResult = await kysely
      .selectFrom('forms')
      .select(kysely.fn.count('id').as('count'))
      .executeTakeFirst();
    if (selectResult === undefined) {
      expect.fail('getting forms count failed');
    }
    expect(Number(selectResult?.count)).toEqual(0);
  });

  it<DbTestContext>('fails with invalid form ID', async ({ db }) => {
    const result = await deleteForm(
      db.ctx,
      '45c66187-64e2-4d75-a45a-e80f1d035bc5'
    );
    expect(result.success).toBe(false);
  });
});

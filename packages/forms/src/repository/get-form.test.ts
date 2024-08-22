import { expect, it } from 'vitest';

import { type DbTestContext, describeDatabase } from '@atj/database/testing';
import { getForm } from './get-form.js';

describeDatabase('getForm', () => {
  it<DbTestContext>('retrieves form successfully', async ({ db }) => {
    const kysely = await db.ctx.getKysely();
    await kysely
      .insertInto('forms')
      .values({
        id: '45c66187-64e2-4d75-a45a-e80f1d035bc5',
        data: '{"summary":{"title":"Test form","description":"Test description"},"root":"root","patterns":{"root":{"type":"sequence","id":"root","data":{"patterns":[]}}},"outputs":[]}',
      })
      .execute();

    const result = await getForm(
      db.ctx,
      '45c66187-64e2-4d75-a45a-e80f1d035bc5'
    );
    expect(result).toEqual({
      outputs: [],
      patterns: {
        root: {
          data: {
            patterns: [],
          },
          id: 'root',
          type: 'sequence',
        },
      },
      root: 'root',
      summary: {
        description: 'Test description',
        title: 'Test form',
      },
    });
  });

  it<DbTestContext>('return null with non-existent form', async ({ db }) => {
    const result = await getForm(
      db.ctx,
      '45c66187-64e2-4d75-a45a-e80f1d035bc5'
    );
    expect(result).toBeNull();
  });
});

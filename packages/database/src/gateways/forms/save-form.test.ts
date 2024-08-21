import { expect, it } from 'vitest';

import { type DbTestContext, describeDatabase } from '../../testing';
import { saveForm } from './save-form';

describeDatabase('saveForm', () => {
  it<DbTestContext>('saves form successfully', async ({ db }) => {
    const id = '45c66187-64e2-4d75-a45a-e80f1d035bc5';
    const form = {
      summary: {
        title: 'Test form',
        description: 'Test description',
      },
      root: 'root',
      patterns: {
        root: {
          type: 'sequence',
          id: 'root',
          data: {
            patterns: [],
          },
        },
      },
      outputs: [],
    };

    await saveForm(db.ctx, id, form);

    const kysely = await db.ctx.getKysely();
    const result = await kysely
      .selectFrom('forms')
      .select(['id', 'data'])
      .where('id', '=', id)
      .execute();

    expect(result).toEqual([
      {
        id,
        data: '{"summary":{"title":"Test form","description":"Test description"},"root":"root","patterns":{"root":{"type":"sequence","id":"root","data":{"patterns":[]}}},"outputs":[]}',
      },
    ]);
  });
});

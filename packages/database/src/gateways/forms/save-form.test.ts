import { expect, it } from 'vitest';

import { type DbTestContext, describeDatabase } from '../../testing';
import { saveForm } from './save-form';
import { addForm } from './add-form';

const TEST_FORM = {
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

describeDatabase('saveForm', () => {
  it<DbTestContext>('saves pre-existing form successfully', async ({ db }) => {
    const kysely = await db.ctx.getKysely();
    const addResult = await addForm(db.ctx, TEST_FORM);
    if (!addResult.success) {
      throw new Error('Failed to add form');
    }

    const saveResult = await saveForm(db.ctx, addResult.data.id, {
      ...TEST_FORM,
      summary: { title: 'Updated title', description: 'Updated description' },
    });
    if (!saveResult.success) {
      expect.fail('Failed to save form', saveResult.error);
    }

    const result = await kysely
      .selectFrom('forms')
      .select(['id', 'data'])
      .where('id', '=', addResult.data.id)
      .execute();

    expect(result[0].id).toEqual(addResult.data.id);
    expect(result[0].data).toEqual(
      '{"summary":{"title":"Updated title","description":"Updated description"},"root":"root","patterns":{"root":{"type":"sequence","id":"root","data":{"patterns":[]}}},"outputs":[]}'
    );
  });
});

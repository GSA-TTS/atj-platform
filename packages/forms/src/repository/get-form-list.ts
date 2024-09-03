import { type DatabaseContext } from '@atj/database';

export const getFormList = async (ctx: DatabaseContext) => {
  const db = await ctx.getKysely();
  const rows = await db.selectFrom('forms').select(['id', 'data']).execute();

  return rows.map(row => {
    const form = JSON.parse(row.data);
    return {
      id: row.id,
      title: form.summary.title,
      description: form.summary.description,
    };
  });
};

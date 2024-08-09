import { type DatabaseContext } from '../context/types';

export const migrateDatabase = async (ctx: DatabaseContext) => {
  const db = await ctx.getKnex();
  await db.migrate.latest();
  return () => db.migrate.rollback();
};

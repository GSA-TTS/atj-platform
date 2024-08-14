import { Knex } from 'knex';
import { Kysely } from 'kysely';

import { type Database, type Engine } from '../clients/kysely/types';

export interface DatabaseContext {
  readonly engine: Engine;
  getKnex: () => Promise<Knex>;
  getKysely: () => Promise<Kysely<Database>>;
  destroy: () => Promise<void>;
}

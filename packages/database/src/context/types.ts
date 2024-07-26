import { Knex } from 'knex';
import { Kysely } from 'kysely';
import { Lucia } from 'lucia';

import { Database } from '../clients/kysely';

export interface DatabaseContext {
  getKnex: () => Promise<Knex>;
  getKysely: () => Promise<Kysely<Database>>;
  getLucia: () => Promise<Lucia>;
}

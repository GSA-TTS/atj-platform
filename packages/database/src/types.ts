import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  person: PersonTable;
  pet: PetTable;
}

export interface PersonTable {
  id: Generated<number>;
  first_name: string;
  gender: 'man' | 'woman' | 'other';
  last_name: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
  metadata: JSONColumnType<{
    login_at: string;
    ip: string | null;
    agent: string | null;
    plan: 'free' | 'premium';
  }>;
}

export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;

export interface PetTable {
  id: Generated<number>;
  name: string;
  owner_id: number;
  species: 'dog' | 'cat';
}

export type Pet = Selectable<PetTable>;
export type NewPet = Insertable<PetTable>;
export type PetUpdate = Updateable<PetTable>;

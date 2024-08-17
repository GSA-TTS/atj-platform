import { type Engine } from './types.js';

/**
 * With Postgres, use TIMESTAMP, which Kysely will accept a Date object for.
 * With SQLite, use INTEGER, which Kysely will accept a number for.
 */
export const dateValue = <E extends Engine>(engine: E, date: Date) =>
  dbValue(engine, date, {
    postgres: date => date,
    sqlite: date => Math.floor(date.getTime() / 1000),
  });
export type DbDate<E extends Engine> = ReturnType<typeof dateValue<E>>;

/**
 * Helper function to map native Typescript values/types to database
 * values/types.
 */
const dbValue = <
  T,
  E extends Engine,
  PostgresReturnValue,
  SqliteReturnValue,
  ReturnValue = E extends 'postgres'
    ? PostgresReturnValue
    : E extends 'sqlite'
      ? SqliteReturnValue
      : never,
>(
  engine: E,
  value: T,
  transformers: {
    postgres: (val: T) => PostgresReturnValue;
    sqlite: (val: T) => SqliteReturnValue;
  }
): ReturnValue => {
  if (engine === 'postgres') {
    return transformers.postgres(value) as unknown as ReturnValue;
  } else if (engine === 'sqlite') {
    return transformers.sqlite(value) as unknown as ReturnValue;
  } else {
    throw new Error(`Unsupported engine: ${engine}`);
  }
};

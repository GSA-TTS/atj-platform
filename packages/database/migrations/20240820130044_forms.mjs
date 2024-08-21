/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('forms', table => {
    table.uuid('id').primary();
    // We don't have an immediate need to query over the form, so we'll just
    // store it as `json` rather than `jsonb`
    table.text('data').notNullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('forms');
}

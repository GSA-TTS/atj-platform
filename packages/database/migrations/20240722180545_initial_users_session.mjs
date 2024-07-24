/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary(); //.defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').notNullable().unique();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('sessions', table => {
    table.uuid('id').primary(); //.defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('session_token').notNullable().unique();
    table.datetime('expires_at').notNullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('sessions');
  await knex.schema.dropTableIfExists('users');
}

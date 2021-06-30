import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('park_log', (table) => {
    table.increments('id').primary().unique().comment('Internal integer ID.');
    table.uuid('uuid').unique().notNullable().comment('Globally unique ID.');
    table.integer('building_id').notNullable().comment('Building ID where bike will be parked');
    table.integer('biker_registration_id').notNullable().comment('Foreign Key with Biker registration table.');
    table.timestamp('entry_time').defaultTo(knex.fn.now()).comment('Time bike has entered the parking lot');
    table.timestamp('exit_time').comment('Time bike has exited the parking lot');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Time this record was created in UTC.');
    table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Time this record was updated in UTC.');
    table.timestamp('deleted_at').nullable().comment('Time this record was deleted in UTC. Null if not deleted.');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('park_log');
}

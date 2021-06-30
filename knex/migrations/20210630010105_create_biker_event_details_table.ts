import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('biker_event_details', (table) => {
    table.increments('id').primary().unique().comment('Internal integer ID.');
    table.uuid('uuid').unique().notNullable().comment('Globally unique ID.');
    table.integer('biker_registration_id').notNullable().comment('Foreign Key with Biker registration table.');
    table.integer('event_id').notNullable().comment('Foreign Key with Event table.');
    table.boolean('is_waiver_signed').notNullable().defaultTo(false).comment('Has Biker waived off liability?');
    table.boolean('has_biker_reported').notNullable().defaultTo(false).comment('Has Biker reported in the event?');
    table.boolean('has_biker_completed').notNullable().defaultTo(false).comment('Has Biker completed the event?');
    table.timestamp('start_time').nullable().comment('Start time recorded in UTC; should be same as event start time ideally');
    table.timestamp('end_time').nullable().comment('Completion time recorded in UTC.');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Time this record was created in UTC.');
    table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Time this record was updated in UTC.');
    table.timestamp('deleted_at').nullable().comment('Time this record was deleted in UTC. Null if not deleted.');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('biker_event_details');
}

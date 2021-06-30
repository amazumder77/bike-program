import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('event', (table) => {
    table.increments('id').primary().unique().comment('Internal integer ID.');
    table.uuid('uuid').unique().notNullable().comment('Globally unique ID.');
    table
      .enu('type', ['BIKE', 'WALK', 'RUN'])
      .notNullable()
      .comment('Type of event, (BIKE, WALK, RUN)');
    table.string('title').notNullable().comment('Event title');
    table.string('description').notNullable().comment('Event description');
    table.string('url').nullable().comment('Publised event url');
    table.string('google_route_link').nullable().comment('Publised event route for google map usage');
    table.timestamp('start_time').notNullable().comment('Start Time in UTC.');
    table.timestamp('end_time').notNullable().comment('End Time in UTC.');
    table.boolean('is_approved').notNullable().defaultTo(false).comment('Is Event approved by Landlord or Landlord representative?');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Time this record was created in UTC.');
    table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Time this record was updated in UTC.');
    table.timestamp('deleted_at').nullable().comment('Time this record was deleted in UTC. Null if not deleted.');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('event');
}

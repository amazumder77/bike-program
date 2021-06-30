import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('event_organizers', (table) => {
    table.increments('id').primary().unique().comment('Internal integer ID.');
    table.uuid('uuid').unique().notNullable().comment('Globally unique ID.');
    table.integer('event_id').notNullable().comment('FK with Event table.');
    table.string('first_name').notNullable().comment('Phone number of the event organizer');
    table.string('last_name').notNullable().comment('Phone number of the event organizer');
    table.string('phone', 25).notNullable().comment('Phone number of the event organizer');
    table.string('email').nullable().comment('Point of contact from the event organizers');
    table.boolean('is_primary_contact').notNullable().defaultTo(false).comment('Is this primary contact for the event?');
    table.boolean('is_tenant').notNullable().defaultTo(true).comment('Is Event Organizer a tenant in the building?');
    table.string('company').nullable().comment('Company name associated with Event Organizer');
    table.string('company_phone', 25).notNullable().comment('Company Phone associated with Event Organizer');
    table.boolean('has_building_access').notNullable().defaultTo(false).comment('Does this person has building access?');
    table.boolean('is_verified').notNullable().defaultTo(false).comment('Is Event Organizer verified?');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Time this record was created in UTC.');
    table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Time this record was updated in UTC.');
    table.timestamp('deleted_at').nullable().comment('Time this record was deleted in UTC. Null if not deleted.');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('event_organizers');
}

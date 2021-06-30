import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('biker_registration', (table) => {
    table.increments('id').primary().unique().comment('Internal integer ID.');
    table.uuid('uuid').unique().notNullable().comment('Globally unique ID.');
    table.string('first_name').notNullable().comment('First name of biker.');
    table.string('last_name').notNullable().comment('Last name of biker.');
    table.string('phone', 25).notNullable().comment('Phone number of the Biker');
    table.string('email').nullable().comment('Email id of the Biker');
    table.integer('building_id').notNullable().comment('Building ID where bike will be parked');
    table.boolean('is_tenant').notNullable().defaultTo(true).comment('Is biker a tenant in the building?');
    table.boolean('is_admin').notNullable().defaultTo(false).comment('Is biker an admin in the building?');
    table.boolean('is_visitor').notNullable().defaultTo(false).comment('Is biker a visitor in the building?');
    table.string('company').nullable().comment('Company name associated with Biker');
    table.boolean('is_verified').notNullable().defaultTo(false).comment('Are biker details verified?');
    table.boolean('has_building_access').notNullable().defaultTo(true).comment('Does Biker have building access?');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Time this record was created in UTC.');
    table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Time this record was updated in UTC.');
    table.timestamp('deleted_at').nullable().comment('Time this record was deleted in UTC. Null if not deleted.');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('biker_registration');
}

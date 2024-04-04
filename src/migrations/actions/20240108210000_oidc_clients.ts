import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.createTable('oidcClients', (table) => {
    table.increments('id').primary();
    table.string('client_id');
    table.string('client_secret');
    table.json('grant_types');
    table.json('redirect_uris');
    table.string('scope');
  });
};

export const down = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('oidcClients');
};

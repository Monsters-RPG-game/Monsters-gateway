import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('keys');
};

export const down = async (): Promise<void> => {
  return new Promise((resolve) => {
    // Do nothing
    resolve();
  });
};

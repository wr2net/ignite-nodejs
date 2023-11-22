import setupKnex, {Knex} from 'knex';
import {env} from './env';

export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT === 'sqlite' ?
      {
        filename: env.DATABASE_URL,
      } : env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: env.DATABASE_MIGRATION,
    }
};

export const knex = setupKnex(config);

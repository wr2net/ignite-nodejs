import setupKnex, {Knex} from 'knex'

export const config: Knex.Config = {
	client: 'sqlite',
	connection: {
		filename: './db/app.db',
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
	}
}

export const knex = setupKnex(config)

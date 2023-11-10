import {knex} from "../database";
import * as crypto from 'crypto';
import {FastifyInstance} from "fastify";
import {z} from "zod";

export async function transactionsRoutes(app: FastifyInstance) {

	/*
	Method: GET
	Index
	List Transactions
	 */
	app.get('/', async () => {
		const transactions = await knex('transactions').select();
		return {
			transactions,
		}
	});

	/*
	Method: GET
	Show
	Show a Transactions
	 */
	app.get('/:id', async (request, response) => {
		const getTransactionParamsSchema = z.object({
			id: z.string().uuid(),
		})
		const { id } = getTransactionParamsSchema.parse(request.params)
		const transaction = await knex('transactions').where('id', id).first()

		if (transaction === undefined) {
			return response.status(404).send({
				'status': 404,
				'message': 'Transaction not found!'
			})
		}

		return response.status(200).send({transaction})
	})

	/*
	Method: GET
	Store
	Persist a Transactions
	 */
	app.post('/', async (request, response) => {

		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit'])
		})

		const { title, amount, type } = createTransactionBodySchema.parse(request.body)

		await knex('transactions').insert({
			id: crypto.randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1
		}).returning('*');

		return response.status(201).send()
	});


}

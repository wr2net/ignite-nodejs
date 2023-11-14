import {knex} from "../database";
import * as crypto from 'crypto';
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {randomUUID} from "crypto";
import {checkSessionIdExists} from "../middlewares/check-session-id-exists";

export async function transactionsRoutes(app: FastifyInstance) {

	/*
	Method: GET
	Index
	List Transactions
	 */
	app.get('/',
		{
			preHandler: checkSessionIdExists
		},
		async (request, response) => {

		const { sessionId } = request.cookies

		const transactions = await knex('transactions')
			.where('session_id', sessionId)
			.select();
		return {
			transactions,
		}
	});

	/*
	Method: GET
	Show
	Show a Transactions
	 */
	app.get('/:id',
		{
			preHandler: checkSessionIdExists
		},
		async (request, response) => {
		const getTransactionParamsSchema = z.object({
			id: z.string().uuid(),
		})
			const { sessionId } = request.cookies
			const { id } = getTransactionParamsSchema.parse(request.params)
			const transaction = await knex('transactions')
				.where({
					'session_id': sessionId,
					id
				})
				.first()

		if (transaction === undefined) {
			return response.status(404).send({
				'status': 404,
				'message': 'Transaction not found!'
			})
		}

		return response.status(200).send({transaction})
	})

	/*
	Method: POST
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

		let sessionId = request.cookies.sessionId
		if (!sessionId) {
			sessionId = randomUUID()

			response.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
			})
		}

		await knex('transactions').insert({
			id: crypto.randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
			session_id: sessionId,
		}).returning('*');

		return response.status(201).send()
	});

	/**
	 * Method: GET
	 * Amount
	 * Show account amount
	 */
	app.get('/summary',
		{
			preHandler: checkSessionIdExists
		},
		async (request) => {
			const { sessionId } = request.cookies
		const summary = await knex('transactions')
			.where('session_id', sessionId)
			.sum('amount', {as: 'amount'})
			.first()

		return { summary }
	})

}

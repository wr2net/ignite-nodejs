import { test, beforeAll, afterAll } from 'vitest'
// @ts-ignore
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
	await app.ready()
})

afterAll(async () => {
	await app.close()
})

test('user can create a new transaction', async () => {
	await request(app.server)
		.post('/transaction')
		.send({
			title: 'New transaction',
			amount: 5000,
			type: 'credit',
		})
		.expect(201)
})

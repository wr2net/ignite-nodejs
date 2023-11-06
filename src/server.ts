import fastify from 'fastify';
import { knex } from './database';
import * as crypto from "crypto";
import {env} from "./env";

const app = fastify();

app.get('/status', () => {
    return {
        'status': 200,
        'message': 'It`s running!'
    };
});

app.get('/schema', async () => {
    const tables = await knex('sqlite_schema').select('*');

    return {
        'status': 200,
        'message': 'Success',
        'content': tables,
    };
});

app.post('/transaction', async () => {
    const transaction = await knex('transactions').insert({
        id: crypto.randomUUID(),
        title: 'Transação de teste',
        amount: 1000
    }).returning('*')

    return transaction
})

app.get('/transaction', async () => {
    return knex('transactions').select('*');
})

app.listen({
    port: env.PORT
}).then(() => {
    console.log('HTTP Server Running!');
});

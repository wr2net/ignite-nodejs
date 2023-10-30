import fastify from 'fastify';
import { knex } from './database';

const app = fastify();

app.get('/status', () => {
    return {
        'status': 200,
        'message': 'It`s running!'
    };
});

app.get('/schema', async () => {

    const tables = await knex('sqlite_schema').select('*')

    return {
        'status': 200,
        'message': 'Success',
        'content': tables,
    };
});

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server Running!');
});

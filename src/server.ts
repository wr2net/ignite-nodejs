import fastify from 'fastify';
import { knex } from './database';
import {transactionsRoutes} from "./routes/transactions";
import * as fastifyCookie from "@fastify/cookie";


const app = fastify();

app.register(fastifyCookie)

app.register(
  transactionsRoutes,
  {
      prefix: 'transaction'
  }
)

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



app.listen({
    port: parseInt(process.env.PORT, 10)
}).then(() => {
    console.log('HTTP Server Running!');
});

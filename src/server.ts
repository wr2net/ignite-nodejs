import fastify from 'fastify';

const app = fastify();

app.get('/status', () => {
    return {
        'status': 200,
        'message': 'It`s running!'
    };
});

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server Running!');
});

import { app } from './app'

app.listen({
    port: parseInt(process.env.PORT, 10)
}).then(() => {
    console.log('HTTP Server Running!');
});

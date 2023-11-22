import { app } from './app'
import { env } from './env';

app.listen({
    port: parseInt(env.PORT, 10)
}).then(() => {
    console.log('HTTP Server Running!');
});

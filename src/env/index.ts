import 'dotenv/config';
import { z } from 'zod'

const WARNING = 'Invalid environment variables!'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
	PORT: z.number().default(3333),
	DATABASE_URL: z.string(),
	DATABASE_MIGRATION: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error(WARNING, _env.error.format())
	throw new Error(WARNING)
}

export const env = _env.data;

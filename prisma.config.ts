import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
	datasource: {
		url: env('DATABASE_URL'),
	},
	schema: 'server/src/prisma/schema.prisma',
	migrations: {
		path: 'server/src/prisma/migrations',
		seed: 'tsx server/src/prisma/seed.ts',
	},
});

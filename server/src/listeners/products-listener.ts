import { Client } from 'pg';
import { prisma } from './../prisma/prisma';

export let productsForSearch: Array<{ id: number; name: string; translit: string | null }> = [];

const refreshCache = async () => {
	productsForSearch = await prisma.product.findMany({
		select: { id: true, name: true, translit: true },
	});
};

export const startProductsListener = async () => {
	// PostgreSQL client для LISTEN/NOTIFY
	const client = new Client({ connectionString: process.env.DATABASE_URL });
	await client.connect();

	// Слушаем уведомления
	await client.query('LISTEN product_change');

	// Инициализация кеша при старте
	await refreshCache();

	client.on('notification', async msg => {
		console.log('Product table changed! Обновляем кеш…');
		await refreshCache();
	});

	console.log('✅ Product listener started.');
};

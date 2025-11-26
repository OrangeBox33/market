import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
	console.log('Seeding…');

	// --- USER ---
	const user = await prisma.user.create({
		data: {
			phone: '+70000000000',
			role: 'admin',
			name: 'Simpson',
			email: 'admin@example.com',
			contacts: [{ type: 'telegram', value: '@admin' }],
		},
	});

	// --- CATEGORIES & PRODUCTS ---
	const categoriesData = [
		{
			name: 'Electronics',
			slug: 'electronics',
			products: [
				{
					name: 'Smartphone X',
					translit: 'smartphone-x',
					description: 'Powerful smartphone',
					price: 29900,
					stock: 50,
					images: ['img1.jpg', 'img2.jpg'],
				},
				{
					name: 'Laptop Pro',
					translit: 'laptop-pro',
					description: 'Compact and powerful',
					price: 89900,
					stock: 20,
					images: ['laptop1.jpg'],
				},
				{
					name: 'Smartwatch',
					translit: 'smartwatch',
					description: 'Fitness and notifications',
					price: 12000,
					stock: 35,
					images: ['watch1.jpg'],
				},
				{
					name: 'Bluetooth Headphones',
					translit: 'bluetooth-headphones',
					description: 'Noise-cancelling',
					price: 8000,
					stock: 40,
					images: ['headphones1.jpg'],
				},
			],
		},
		{
			name: 'Home Appliances',
			slug: 'home-appliances',
			products: [
				{
					name: 'Vacuum Cleaner',
					translit: 'vacuum-cleaner',
					description: 'Powerful suction',
					price: 15000,
					stock: 25,
					images: ['vacuum1.jpg'],
				},
				{
					name: 'Air Purifier',
					translit: 'air-purifier',
					description: 'Clean air',
					price: 9000,
					stock: 30,
					images: ['airpurifier1.jpg'],
				},
				{
					name: 'Microwave Oven',
					translit: 'microwave-oven',
					description: 'Quick heating',
					price: 7000,
					stock: 15,
					images: ['microwave1.jpg'],
				},
				{
					name: 'Coffee Maker',
					translit: 'coffee-maker',
					description: 'Fresh coffee',
					price: 5000,
					stock: 20,
					images: ['coffee1.jpg'],
				},
			],
		},
		{
			name: 'Books',
			slug: 'books',
			products: [
				{
					name: 'JavaScript Guide',
					translit: 'javascript-guide',
					description: 'Learn JS',
					price: 1200,
					stock: 100,
					images: ['jsbook.jpg'],
				},
				{
					name: 'TypeScript Handbook',
					translit: 'typescript-handbook',
					description: 'TypeScript essentials',
					price: 1500,
					stock: 80,
					images: ['tsbook.jpg'],
				},
				{
					name: 'Python Cookbook',
					translit: 'python-cookbook',
					description: 'Python recipes',
					price: 1300,
					stock: 90,
					images: ['pythonbook.jpg'],
				},
				{
					name: 'Clean Code',
					translit: 'clean-code',
					description: 'Best practices',
					price: 1800,
					stock: 70,
					images: ['cleancode.jpg'],
				},
			],
		},
		{
			name: 'Toys',
			slug: 'toys',
			products: [
				{
					name: 'Lego Set',
					translit: 'lego-set',
					description: 'Creative building',
					price: 4000,
					stock: 50,
					images: ['lego1.jpg'],
				},
				{
					name: 'RC Car',
					translit: 'rc-car',
					description: 'Remote controlled',
					price: 3500,
					stock: 30,
					images: ['rccar.jpg'],
				},
				{
					name: 'Puzzle 1000',
					translit: 'puzzle-1000',
					description: 'Brain teaser',
					price: 800,
					stock: 60,
					images: ['puzzle.jpg'],
				},
				{
					name: 'Doll House',
					translit: 'doll-house',
					description: 'Miniature house',
					price: 4500,
					stock: 20,
					images: ['dollhouse.jpg'],
				},
			],
		},
	];

	const createdCategories = [];

	for (const catData of categoriesData) {
		const category = await prisma.category.create({
			data: {
				name: catData.name,
				slug: catData.slug,
			},
		});

		for (const prodData of catData.products) {
			await prisma.product.create({
				data: {
					...prodData,
					categoryId: category.id,
				},
			});
		}

		createdCategories.push(category);
	}

	// --- ORDER ---
	await prisma.order.create({
		data: {
			userId: user.id,
			deliveryMethod: 'pickup',
			status: 'new',
			totalPrice: categoriesData[0].products[0].price + categoriesData[0].products[1].price,
			items: [
				{ productId: 1, qty: 1, price: categoriesData[0].products[0].price },
				{ productId: 2, qty: 1, price: categoriesData[0].products[1].price },
			],
			contact: { phone: user.phone },
		},
	});

	console.log('Seed completed successfully');
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

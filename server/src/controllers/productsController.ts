import { Response } from 'express';
import { prisma } from '../prisma/prisma';
import { TAuthedRequest } from '../types/auth';
import { parsePositiveInt } from '../utils/numbers';

// Получение списка продуктов с пагинацией и фильтрацией по категории
export const listProducts = async (req: TAuthedRequest, res: Response) => {
	try {
		const page = parsePositiveInt(req.query.page, 1);
		const perPage = parsePositiveInt(req.query.perPage, 20, 100);

		const where: any = {};

		// фильтр по категории: по id или slug
		const category = req.query.category;
		if (typeof category === 'string') {
			if (/^\d+$/.test(category)) {
				where.categoryId = Number(category);
			} else {
				const cat = await prisma.category.findUnique({
					where: { slug: category },
					select: { id: true },
				});
				if (!cat) return res.status(400).json({ message: 'Unknown category' });
				where.categoryId = cat.id;
			}
		}

		const skip = (page - 1) * perPage;

		// запрос с подсчётом общего количества
		const [items, total] = await Promise.all([
			prisma.product.findMany({
				where,
				select: {
					id: true,
					name: true,
					price: true,
					stock: true,
					images: true,
					categoryId: true,
				},
				orderBy: { id: 'asc' },
				skip,
				take: perPage,
			}),
			prisma.product.count({ where }),
		]);

		const products = items.map(p => ({
			id: p.id,
			name: p.name,
			price: p.price,
			stock: p.stock,
			images: p.images as string[],
			categoryId: p.categoryId,
		}));

		return res.status(200).json({ items: products, total, page, perPage });
	} catch (error) {
		console.error(error);
		return res.status(501).json({ message: 'Failed to fetch products' });
	}
};

// Получение одного продукта по id
export const getProductById = async (req: TAuthedRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (!Number.isFinite(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });

		const product = await prisma.product.findUnique({
			where: { id },
			include: {
				category: {
					select: { id: true, name: true, slug: true },
				},
			},
		});

		if (!product) return res.status(404).json({ message: 'Product not found' });

		return res.status(200).json({
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			stock: product.stock,
			images: product.images,
			categoryId: product.category.id ?? null,
		});
	} catch (error) {
		console.error(error);
		return res.status(501).json({ message: 'Failed to fetch product' });
	}
};

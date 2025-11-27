import { Response } from 'express';
import { prisma } from '../prisma/prisma';
import { TAuthedRequest } from '../types/auth';
import { parsePositiveInt } from '../utils/numbers';

export const adminCreateProduct = async (req: TAuthedRequest, res: Response) => {
	try {
		const { name, description, price, stock, categoryId, images } = req.body || {};

		if (!name || typeof name !== 'string')
			return res.status(400).json({ message: 'name required' });
		if (!Number.isFinite(Number(price))) return res.status(400).json({ message: 'price required' });
		if (!Number.isFinite(Number(stock))) return res.status(400).json({ message: 'stock required' });
		if (!Number.isFinite(Number(categoryId)))
			return res.status(400).json({ message: 'categoryId required' });

		const category = await prisma.category.findUnique({ where: { id: Number(categoryId) } });
		if (!category) return res.status(400).json({ message: 'Category not found' });

		const product = await prisma.product.create({
			data: {
				name,
				description: description || '',
				price: Number(price),
				stock: Number(stock),
				categoryId: Number(categoryId),
				images: Array.isArray(images) ? images : [],
			},
		});

		console.log(`[ADMIN] created product id=${product.id}`);
		return res.status(201).json({ id: product.id });
	} catch (error) {
		return res.status(501).json({ message: 'Failed to create product' });
	}
};

export const adminUpdateProduct = async (req: TAuthedRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (!Number.isFinite(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });

		const product = await prisma.product.findUnique({ where: { id } });
		if (!product) return res.status(404).json({ message: 'Not found' });

		const { name, description, price, stock, categoryId, images } = req.body;

		if (categoryId && !Number.isFinite(Number(categoryId)))
			return res.status(400).json({ message: 'Invalid categoryId' });

		if (categoryId) {
			const category = await prisma.category.findUnique({ where: { id: Number(categoryId) } });
			if (!category) return res.status(400).json({ message: 'Category not found' });
		}

		const updated = await prisma.product.update({
			where: { id },
			data: {
				name: name ?? undefined,
				description: description ?? undefined,
				price: price !== undefined ? Number(price) : undefined,
				stock: stock !== undefined ? Number(stock) : undefined,
				categoryId: categoryId !== undefined ? Number(categoryId) : undefined,
				images: images !== undefined ? (Array.isArray(images) ? images : []) : undefined,
			},
		});

		console.log(`[ADMIN] updated product id=${updated.id}`);
		return res.status(200).json({ ok: true });
	} catch (error) {
		return res.status(501).json({ message: 'Failed to update product' });
	}
};

export const adminDeleteProduct = async (req: TAuthedRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (!Number.isFinite(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });

		const product = await prisma.product.findUnique({ where: { id } });
		if (!product) return res.status(404).json({ message: 'Not found' });

		await prisma.product.delete({ where: { id } });
		console.log(`[ADMIN] deleted product id=${id}`);
		return res.status(200).json({ ok: true });
	} catch (error) {
		return res.status(501).json({ message: 'Failed to delete product' });
	}
};

export const adminListProducts = async (req: TAuthedRequest, res: Response) => {
	try {
		const page = parsePositiveInt(req.query.page, 1);
		const perPage = parsePositiveInt(req.query.perPage, 20, 100);
		const skip = (page - 1) * perPage;

		const [items, total] = await Promise.all([
			prisma.product.findMany({
				orderBy: { id: 'asc' },
				skip,
				take: perPage,
			}),
			prisma.product.count(),
		]);

		return res.status(200).json({ items, total, page, perPage });
	} catch (error) {
		return res.status(501).json({ message: 'Failed to list products' });
	}
};

import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';

export const getCategories = async (_req: Request, res: Response) => {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
			},
		});

		return res.status(200).json(categories);
	} catch (error) {
		console.error('getCategories error:', error);
		return res.status(501).json({ message: 'Failed to fetch categories' });
	}
};

export const getCategory = async (req: Request, res: Response) => {
	try {
		const { categoryId } = req.params;

		if (!categoryId || isNaN(Number(categoryId))) {
			return res.status(400).json({ message: 'Invalid category ID' });
		}

		const category = await prisma.category.findUnique({
			where: { id: Number(categoryId) },
		});

		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}

		const products = await prisma.product.findMany({
			where: { categoryId: Number(categoryId) },
			select: {
				id: true,
				name: true,
				translit: true,
				description: true,
				price: true,
				stock: true,
				images: true,
			},
		});

		return res.status(200).json({
			category: {
				id: category.id,
				name: category.name,
				slug: category.slug,
			},
			products,
		});
	} catch (error) {
		console.error('getCategory error:', error);
		return res.status(501).json({ message: 'Failed to fetch category products' });
	}
};

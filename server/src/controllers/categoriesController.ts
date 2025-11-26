import { Response } from 'express';
import { prisma } from '../prisma/prisma';
import { TAuthedRequest } from '../types/auth';

export const getCategories = async (_req: TAuthedRequest, res: Response) => {
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

import { Response } from 'express';
import { EOrderStatus } from '../prisma/generated/enums';
import { prisma } from '../prisma/prisma';
import { TAuthedRequest } from '../types/auth';
import { parsePositiveInt } from './../utils/numbers';

// Получение списка заказов (админ)
export const adminListOrders = async (req: TAuthedRequest, res: Response) => {
	try {
		const page = parsePositiveInt(req.query.page, 1);
		const perPage = parsePositiveInt(req.query.perPage, 20, 100);
		const offset = (page - 1) * perPage;

		const statusQuery = req.query.status;
		const where: any = {};
		if (typeof statusQuery === 'string' && statusQuery) where.status = statusQuery;

		// Параллельное получение заказов и их количества
		const [items, total] = await Promise.all([
			prisma.order.findMany({
				where,
				orderBy: { id: 'desc' },
				skip: offset,
				take: perPage,
				include: {
					user: { select: { id: true, phone: true, name: true, role: true } },
				},
			}),
			prisma.order.count({ where }),
		]);

		return res.status(200).json({ items, total, page, perPage });
	} catch (error) {
		console.error(error);
		return res.status(501).json({ message: 'Failed to list orders' });
	}
};

// Получение одного заказа по id (админ)
export const adminGetOrder = async (req: TAuthedRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (!Number.isFinite(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });

		const order = await prisma.order.findUnique({
			where: { id },
			include: { user: { select: { id: true, phone: true, name: true, role: true } } },
		});

		if (!order) return res.status(404).json({ message: 'Order not found' });

		return res.status(200).json(order);
	} catch (error) {
		console.error(error);
		return res.status(501).json({ message: 'Failed to fetch order' });
	}
};

// Обновление статуса заказа (админ)
export const adminUpdateOrderStatus = async (req: TAuthedRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (!Number.isFinite(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });

		const status = String(req.body?.status || '') as EOrderStatus;
		if (!Object.values(EOrderStatus).includes(status)) {
			return res.status(400).json({ message: 'Invalid status' });
		}

		const order = await prisma.order.update({
			where: { id },
			data: { status },
		});

		console.log(`[ADMIN] order ${id} -> ${status}`);
		return res.status(200).json({ ok: true, order });
	} catch (error: any) {
		// Если заказ не найден, prisma.update выбросит ошибку P2025
		if (error.code === 'P2025') return res.status(404).json({ message: 'Order not found' });
		console.error(error);
		return res.status(501).json({ message: 'Failed to update order' });
	}
};

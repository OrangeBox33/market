import { Response } from 'express';
import { prisma } from '../prisma/prisma';
import { TAuthedRequest } from '../types/auth';
import { TContact } from '../types/types';

export const createOrder = async (req: TAuthedRequest, res: Response) => {
	try {
		const { items, contactInfo, deliveryMethod } = req.body || {};
		if (!Array.isArray(items) || items.length === 0)
			return res.status(400).json({ message: 'Items required' });

		// Проверяем корректность данных
		const qtyById: Record<number, number> = {};
		for (const it of items) {
			const id = Number(it.productId);
			const qty = Number(it.qty);
			if (!Number.isFinite(id) || !Number.isFinite(qty) || qty <= 0)
				return res.status(400).json({ message: 'Invalid item data' });
			qtyById[id] = (qtyById[id] || 0) + qty;
		}

		const productIds = Object.keys(qtyById).map(Number);

		// Загружаем товары
		const dbProducts = await prisma.product.findMany({
			where: { id: { in: productIds } },
		});

		if (dbProducts.length !== productIds.length)
			return res.status(400).json({ message: 'Some products not found' });

		for (const p of dbProducts) {
			if (p.stock < qtyById[p.id])
				return res.status(400).json({ message: `Insufficient stock for product ${p.id}` });
		}

		// 💾 Транзакция: создаём заказ + уменьшаем stock
		const order = await prisma.$transaction(async tx => {
			let total = 0;
			const snapshot: any[] = [];

			for (const p of dbProducts) {
				const qty = qtyById[p.id];
				const lineTotal = p.price * qty;
				total += lineTotal;
				snapshot.push({
					productId: p.id,
					name: p.name,
					price: p.price,
					qty,
				});

				await tx.product.update({
					where: { id: p.id },
					data: { stock: { decrement: qty } },
				});
			}

			return tx.order.create({
				data: {
					userId: req.user!.id,
					items: snapshot,
					contact: JSON.stringify(contactInfo),
					totalPrice: total,
					deliveryMethod,
					status: 'new',
				},
			});
		});

		if (contactInfo?.address) {
			const user = await prisma.user.findUnique({
				where: { id: req.user.id },
				select: { contacts: true },
			});

			if (
				((user?.contacts as TContact[]) || []).some(
					contact => contact.address === contactInfo.address
				)
			) {
				prisma.user.update({
					where: { id: req.user.id },
					data: {
						contacts: {
							push: contactInfo,
						},
					},
				});
			}
		}

		return res.status(201).json({ id: order.id });
	} catch (error) {
		console.error('createOrder error:', error);
		return res.status(501).json({ message: 'Failed to create order' });
	}
};

// 📜 Получение списка заказов
export const listOrders = async (req: TAuthedRequest, res: Response) => {
	try {
		const orders = await prisma.order.findMany({
			where: { userId: req.user.id },
			orderBy: { id: 'desc' },
			select: {
				id: true,
				totalPrice: true,
				deliveryMethod: true,
				status: true,
				createdAt: true,
				items: true,
			},
		});

		return res.status(200).json(orders);
	} catch (error) {
		console.error('listOrders error:', error);
		return res.status(501).json({ message: 'Failed to fetch orders' });
	}
};

// 🔍 Получение одного заказа
export const getOrderById = async (req: TAuthedRequest, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (!Number.isFinite(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });

		const order = await prisma.order.findUnique({
			where: { id },
		});

		if (!order) return res.status(404).json({ message: 'Order not found' });
		if (order.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

		return res.status(200).json(order);
	} catch (error) {
		console.error('getOrderById error:', error);
		return res.status(501).json({ message: 'Failed to fetch order' });
	}
};

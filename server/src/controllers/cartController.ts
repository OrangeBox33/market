import { Response } from 'express';
import { prisma } from './../prisma/prisma';
import { TAuthedRequest } from './../types/auth';

type TCartItem = {
	productId: number;
	quantity: number;
};

export const getCart = async (req: TAuthedRequest, res: Response) => {
	try {
		const userId = req.user.id;

		const cart = await prisma.cart.findUnique({
			where: { userId },
			include: {
				items: {
					include: {
						product: true, // подтягиваем данные товаров
					},
				},
			},
		});

		// Если корзины нет — возвращаем пустую
		if (!cart) {
			return res.status(200).json({ items: [] });
		}

		return res.status(200).json(cart);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const addItemsToCart = async (req: TAuthedRequest, res: Response) => {
	const { items }: { items: TCartItem[] } = req.body;

	// items: [{ productId, quantity }, ...]
	if (!Array.isArray(items)) {
		return res.status(400).json({ message: 'Items must be an array' });
	}

	try {
		const userId = req.user.id;

		// 1. Получаем или создаём корзину
		let cart = await prisma.cart.findUnique({
			where: { userId },
		});

		if (!cart) {
			cart = await prisma.cart.create({
				data: { userId },
			});
		}

		// 2. Добавляем/обновляем CartItem для каждого товара
		for (const item of items) {
			await prisma.cartItem.upsert({
				where: {
					cartId_productId: {
						cartId: cart.id,
						productId: item.productId,
					},
				},
				update: {
					quantity: { increment: item.quantity },
				},
				create: {
					cartId: cart.id,
					productId: item.productId,
					quantity: item.quantity,
				},
			});
		}

		return res.status(200).json({ message: 'Cart updated' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const decreaseItemQuantity = async (req: TAuthedRequest, res: Response) => {
	const { productId } = req.body;

	if (!productId) {
		return res.status(400).json({ message: 'productId is required' });
	}

	try {
		const userId = req.user.id;

		// Находим корзину
		const cart = await prisma.cart.findUnique({
			where: { userId },
		});

		if (!cart) {
			return res.status(400).json({ message: 'Cart not found' });
		}

		// Находим item
		const item = await prisma.cartItem.findUnique({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId,
				},
			},
		});

		if (!item) {
			return res.status(400).json({ message: 'Item not found in cart' });
		}

		if (item.quantity > 1) {
			// Просто уменьшаем количество
			await prisma.cartItem.update({
				where: {
					cartId_productId: {
						cartId: cart.id,
						productId,
					},
				},
				data: {
					quantity: { decrement: 1 },
				},
			});
		} else {
			// quantity == 1 → удалить товар из корзины
			await prisma.cartItem.delete({
				where: {
					cartId_productId: {
						cartId: cart.id,
						productId,
					},
				},
			});

			// Проверяем, остались ли ещё CartItem
			const remainingItems = await prisma.cartItem.count({
				where: { cartId: cart.id },
			});
			if (remainingItems === 0) {
				// Корзина пуста → удаляем её
				await prisma.cart.delete({ where: { id: cart.id } });
			}
		}

		return res.status(200).json({ message: 'Quantity updated' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const removeItemFromCart = async (req: TAuthedRequest, res: Response) => {
	const { productId } = req.body;

	if (!productId) {
		return res.status(400).json({ message: 'productId is required' });
	}

	try {
		const userId = req.user.id;

		// Находим корзину пользователя
		const cart = await prisma.cart.findUnique({
			where: { userId },
		});

		if (!cart) {
			return res.status(400).json({ message: 'Cart not found' });
		}

		// Удаляем CartItem с указанным productId
		const deletedItem = await prisma.cartItem.delete({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId,
				},
			},
		});

		return res.status(200).json({ message: 'Item removed from cart', deletedItem });
	} catch (err: any) {
		// Если элемента не было в корзине, Prisma выбросит ошибку — можно её поймать
		if (err.code === 'P2025') {
			return res.status(400).json({ message: 'Item not found in cart' });
		}
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const clearCart = async (req: TAuthedRequest, res: Response) => {
	try {
		await prisma.cart.delete({
			where: { userId: req.user.id },
		});

		return res.status(200).json({ message: 'Cart cleared' });
	} catch (err) {
		// Если корзины не существовало — просто возвращаем успех
		return res.status(200).json({ message: 'Cart cleared' });
	}
};

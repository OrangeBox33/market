import { Response } from 'express';
import { prisma } from './../prisma/prisma';
import { TAuthedRequest } from './../types/auth';

type TCartItem = {
	productId: number;
	qty: number;
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

	// items: [{ productId, qty }, ...]
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
					qty: { increment: item.qty },
				},
				create: {
					cartId: cart.id,
					productId: item.productId,
					qty: item.qty,
				},
			});
		}

		// 3. Возвращаем обновленную корзину
		const updatedCart = await prisma.cart.findUnique({
			where: { userId },
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		return res.status(200).json(updatedCart || { items: [] });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const increaseItemQuantity = async (req: TAuthedRequest, res: Response) => {
	const { productId } = req.body;

	if (!productId) {
		return res.status(400).json({ message: 'productId is required' });
	}

	try {
		const userId = req.user.id;

		// Находим корзину (или создаём, если нет)
		let cart = await prisma.cart.findUnique({
			where: { userId },
		});

		if (!cart) {
			cart = await prisma.cart.create({
				data: { userId },
			});
		}

		// Пытаемся найти item
		let item = await prisma.cartItem.findUnique({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId,
				},
			},
		});

		if (!item) {
			// Если товара ещё нет → создаём с qty = 1
			item = await prisma.cartItem.create({
				data: {
					cartId: cart.id,
					productId,
					qty: 1,
				},
			});
		} else {
			// Если есть → увеличиваем qty
			await prisma.cartItem.update({
				where: {
					cartId_productId: {
						cartId: cart.id,
						productId,
					},
				},
				data: {
					qty: { increment: 1 },
				},
			});
		}

		// Возвращаем обновлённую корзину
		const updatedCart = await prisma.cart.findUnique({
			where: { userId },
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		return res.status(200).json(updatedCart);
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

		if (item.qty > 1) {
			// Просто уменьшаем количество
			await prisma.cartItem.update({
				where: {
					cartId_productId: {
						cartId: cart.id,
						productId,
					},
				},
				data: {
					qty: { decrement: 1 },
				},
			});
		} else {
			// qty == 1 → удалить товар из корзины
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

		// Возвращаем обновленную корзину
		const updatedCart = await prisma.cart.findUnique({
			where: { userId },
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		return res.status(200).json(updatedCart || { items: [] });
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

		// Возвращаем обновленную корзину
		const updatedCart = await prisma.cart.findUnique({
			where: { userId },
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		return res.status(200).json(updatedCart || { items: [] });
	} catch (err: any) {
		// Если элемента не было в корзине, Prisma выбросит ошибку — можно её поймать
		if (err.code === 'P2025') {
			return res.status(400).json({ message: 'Item not found in cart' });
		}
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const clearLocalCart = async (req: TAuthedRequest, res: Response) => {
	try {
		await prisma.cart.delete({
			where: { userId: req.user.id },
		});

		return res.status(200).json({ items: [] });
	} catch (err) {
		// Если корзины не существовало — просто возвращаем пустую корзину
		return res.status(200).json({ items: [] });
	}
};

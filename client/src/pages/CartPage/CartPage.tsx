import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	removeFromCart,
	updateQuantity,
	clearCart,
	selectCart,
} from '../../store/slices/cartSlice';
import { useAppSelector } from '@src/store/hooks';
import { selectUser } from '@src/store/slices/userSlice';

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

const Title = styled.h1`
	text-align: center;
	margin-bottom: 2rem;
	color: #333;
`;

const CartItem = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	margin-bottom: 1rem;
`;

const Image = styled.img`
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 4px;
`;

const Info = styled.div`
	flex: 1;
`;

const ItemTitle = styled.h3`
	margin: 0 0 0.5rem 0;
	color: #333;
`;

const ItemPrice = styled.div`
	color: #667eea;
	font-weight: bold;
`;

const QuantityControls = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const QuantityButton = styled.button`
	width: 30px;
	height: 30px;
	border: 1px solid #ddd;
	background: white;
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: #f5f5f5;
	}
`;

const QuantityInput = styled.input`
	width: 50px;
	text-align: center;
	border: 1px solid #ddd;
	border-radius: 4px;
	padding: 0.25rem;
`;

const RemoveButton = styled.button`
	background: #ff4757;
	color: white;
	border: none;
	padding: 0.5rem;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background: #ff3742;
	}
`;

const Total = styled.div`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	text-align: center;
	margin-top: 2rem;
`;

const TotalAmount = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #667eea;
	margin-bottom: 1rem;
`;

const CheckoutButton = styled.button`
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border: none;
	padding: 1rem 2rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1.1rem;
	font-weight: bold;
	margin-right: 1rem;

	&:hover {
		opacity: 0.9;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

const ClearButton = styled.button`
	background: #f5f5f5;
	color: #666;
	border: 1px solid #ddd;
	padding: 1rem 2rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1.1rem;

	&:hover {
		background: #e9e9e9;
	}
`;

const EmptyCart = styled.div`
	text-align: center;
	padding: 4rem 2rem;
	color: #666;
`;

const ErrorMessage = styled.div`
	background: #ffebee;
	color: #c62828;
	padding: 1rem;
	border-radius: 4px;
	text-align: center;
	margin: 1rem 0;
`;

export const CartPage: React.FC = () => {
	const cartItems = useAppSelector(selectCart);
	const { isAuth } = useAppSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

	const handleQuantityChange = (id: number, qty: number) => {
		dispatch(updateQuantity({ id, qty }));
	};

	const handleRemoveItem = (id: number) => {
		dispatch(removeFromCart(id));
	};

	const handleCheckout = async () => {
		if (!isAuth) {
			navigate('/auth');
			return;
		}

		try {
			const orderData = {
				items: cartItems.map(item => ({
					productId: item.id,
					qty: item.qty,
				})),
				deliveryMethod: 'pickup',
				contactInfo: null,
			};

			await createOrder(orderData).unwrap();
			dispatch(clearCart());
			navigate('/profile');
		} catch (err) {
			console.error('Order creation failed:', err);
		}
	};

	const handleClearCart = () => {
		if (window.confirm('Очистить корзину?')) {
			dispatch(clearCart());
		}
	};

	if (cartItems.length === 0) {
		return (
			<Container>
				<Title>Корзина</Title>
				<EmptyCart>
					<h2>Корзина пуста</h2>
					<p>Добавьте товары из каталога</p>
				</EmptyCart>
			</Container>
		);
	}

	return (
		<Container>
			<Title>Корзина</Title>

			{error && <ErrorMessage>Ошибка при создании заказа. Попробуйте еще раз.</ErrorMessage>}

			{cartItems.map(item => (
				<CartItem key={item.id}>
					<Image
						src={item.image || 'https://via.placeholder.com/80x80?text=No+Image'}
						alt={item.title}
					/>
					<Info>
						<ItemTitle>{item.title}</ItemTitle>
						<ItemPrice>{item.price.toLocaleString()} ₽</ItemPrice>
					</Info>
					<QuantityControls>
						<QuantityButton onClick={() => handleQuantityChange(item.id, item.qty - 1)}>
							-
						</QuantityButton>
						<QuantityInput
							type="number"
							value={item.qty}
							onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
							min="1"
						/>
						<QuantityButton onClick={() => handleQuantityChange(item.id, item.qty + 1)}>
							+
						</QuantityButton>
					</QuantityControls>
					<RemoveButton onClick={() => handleRemoveItem(item.id)}>Удалить</RemoveButton>
				</CartItem>
			))}

			<Total>
				<TotalAmount>Итого: {total.toLocaleString()} ₽</TotalAmount>
				<CheckoutButton onClick={handleCheckout} disabled={isLoading}>
					{isLoading ? 'Оформляем...' : 'Оформить заказ'}
				</CheckoutButton>
				<ClearButton onClick={handleClearCart}>Очистить корзину</ClearButton>
			</Total>
		</Container>
	);
};

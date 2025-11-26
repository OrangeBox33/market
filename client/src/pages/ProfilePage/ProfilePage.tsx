import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useLoading } from '../../utils/hooks/hooks';
import { api } from '../../api/client';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/userSlice';

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

const Title = styled.h1`
	text-align: center;
	margin-bottom: 2rem;
	color: #333;
`;

const UserInfo = styled.div`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	margin-bottom: 2rem;
`;

const UserInfoTitle = styled.h2`
	margin: 0 0 1rem 0;
	color: #333;
`;

const UserDetail = styled.div`
	margin-bottom: 0.5rem;
	color: #666;
`;

const OrdersList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const OrderCard = styled.div`
	background: white;
	padding: 1.5rem;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const OrderHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid #eee;
`;

const OrderId = styled.div`
	font-weight: bold;
	color: #333;
`;

const OrderDate = styled.div`
	color: #666;
	font-size: 0.9rem;
`;

const OrderStatus = styled.div<{ status: string }>`
	padding: 0.25rem 0.75rem;
	border-radius: 12px;
	font-size: 0.8rem;
	font-weight: bold;
	background: ${props => {
		switch (props.status) {
			case 'new':
				return '#e3f2fd';
			case 'processing':
				return '#fff3e0';
			case 'done':
				return '#e8f5e8';
			case 'canceled':
				return '#ffebee';
			default:
				return '#f5f5f5';
		}
	}};
	color: ${props => {
		switch (props.status) {
			case 'new':
				return '#1976d2';
			case 'processing':
				return '#f57c00';
			case 'done':
				return '#388e3c';
			case 'canceled':
				return '#d32f2f';
			default:
				return '#666';
		}
	}};
`;

const OrderTotal = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	color: #667eea;
	margin-bottom: 1rem;
`;

const OrderItems = styled.div`
	margin-top: 1rem;
`;

const OrderItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0;
	border-bottom: 1px solid #f0f0f0;

	&:last-child {
		border-bottom: none;
	}
`;

const ItemName = styled.div`
	color: #333;
`;

const ItemQty = styled.div`
	color: #666;
	font-size: 0.9rem;
`;

const ItemPrice = styled.div`
	color: #667eea;
	font-weight: bold;
`;

const EmptyOrders = styled.div`
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
	margin: 2rem 0;
`;

export const ProfilePage: React.FC = () => {
	const { isAuth, name, phone } = useAppSelector(selectUser);
	const navigate = useNavigate();
	const { data: orders, isLoading, error } = useLoading(api.getOrders());

	useEffect(() => {
		if (!isAuth) {
			navigate('/auth');
		}
	}, [isAuth, navigate]);

	if (!isAuth) {
		return null;
	}

	if (isLoading) {
		return (
			<Container>
				<LoadingSpinner />
			</Container>
		);
	}

	if (error) {
		return (
			<Container>
				<ErrorMessage>Ошибка загрузки заказов</ErrorMessage>
			</Container>
		);
	}

	return (
		<Container>
			<Title>Мой профиль</Title>

			<UserInfo>
				<UserInfoTitle>Информация о пользователе</UserInfoTitle>
				<UserDetail>
					<strong>Телефон:</strong> {phone}
				</UserDetail>
				{name && (
					<UserDetail>
						<strong>Имя:</strong> {name}
					</UserDetail>
				)}
			</UserInfo>

			<Title>История заказов</Title>

			{!orders || orders.length === 0 ? (
				<EmptyOrders>
					<h2>Заказов пока нет</h2>
					<p>Сделайте первый заказ в нашем магазине</p>
				</EmptyOrders>
			) : (
				<OrdersList>
					{orders.map(order => (
						<OrderCard key={order.id}>
							<OrderHeader>
								<OrderId>Заказ #{order.id}</OrderId>
								<OrderDate>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</OrderDate>
								<OrderStatus status={order.status}>
									{order.status === 'new' && 'Новый'}
									{order.status === 'processing' && 'В обработке'}
									{order.status === 'shipped' && 'Отправлен'}
									{order.status === 'done' && 'Завершён'}
									{order.status === 'canceled' && 'Отменен'}
								</OrderStatus>
							</OrderHeader>

							<OrderTotal>Сумма: {order.totalPrice.toLocaleString()} ₽</OrderTotal>

							<OrderItems>
								{order.items.map((item: any, index: number) => (
									<OrderItem key={index}>
										<ItemName>{item.title}</ItemName>
										<ItemQty>{item.qty} шт.</ItemQty>
										<ItemPrice>{item.price.toLocaleString()} ₽</ItemPrice>
									</OrderItem>
								))}
							</OrderItems>
						</OrderCard>
					))}
				</OrdersList>
			)}
		</Container>
	);
};

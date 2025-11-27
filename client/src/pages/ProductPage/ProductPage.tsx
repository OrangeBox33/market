import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../../api/client';
import { useLoading } from '../../common/hooks/hooks';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { addToCart } from '../../store/slices/cartSlice';

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

const BackButton = styled.button`
	background: #f5f5f5;
	border: 1px solid #ddd;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	cursor: pointer;
	margin-bottom: 2rem;

	&:hover {
		background: #e9e9e9;
	}
`;

const ProductContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	padding: 2rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const Image = styled.img`
	width: 100%;
	height: 400px;
	object-fit: cover;
	border-radius: 8px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
	margin: 0 0 1rem 0;
	color: #333;
`;

const Price = styled.div`
	font-size: 2rem;
	font-weight: bold;
	color: #667eea;
	margin-bottom: 1rem;
`;

const Description = styled.p`
	color: #666;
	line-height: 1.6;
	margin-bottom: 2rem;
`;

const Stock = styled.div`
	color: ${props => props.color || '#666'};
	margin-bottom: 2rem;
	font-weight: bold;
`;

const Button = styled.button`
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border: none;
	padding: 1rem 2rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1.1rem;
	font-weight: bold;
	transition: opacity 0.2s;

	&:hover {
		opacity: 0.9;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

const ErrorMessage = styled.div`
	background: #ffebee;
	color: #c62828;
	padding: 1rem;
	border-radius: 4px;
	text-align: center;
	margin: 2rem 0;
`;

export const ProductPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data: product, isLoading, error } = useLoading(api.getProduct(Number(id)));

	const handleAddToCart = () => {
		if (product) {
			dispatch(
				addToCart({
					id: product.id,
					title: product.name,
					price: product.price,
					image: product.images?.[0],
				})
			);
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	if (isLoading) {
		return (
			<Container>
				<LoadingSpinner />
			</Container>
		);
	}

	if (error || !product) {
		return (
			<Container>
				<ErrorMessage>Товар не найден</ErrorMessage>
				<BackButton onClick={handleBack}>Назад</BackButton>
			</Container>
		);
	}

	return (
		<Container>
			<BackButton onClick={handleBack}>← Назад</BackButton>

			<ProductContainer>
				<Image
					src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
					alt={product.name}
				/>

				<Info>
					<Title>{product.name}</Title>
					<Price>{product.price.toLocaleString()} ₽</Price>
					<Description>{product.description}</Description>

					<Stock color={product.stock > 0 ? '#4caf50' : '#f44336'}>
						{product.stock > 0 ? `В наличии: ${product.stock} шт.` : 'Нет в наличии'}
					</Stock>

					<Button onClick={handleAddToCart} disabled={product.stock === 0}>
						{product.stock === 0 ? 'Нет в наличии' : 'Добавить в корзину'}
					</Button>
				</Info>
			</ProductContainer>
		</Container>
	);
};

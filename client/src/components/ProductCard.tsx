import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Card, Image, Content, Title, Price, Button, LinkStyled } from '../../ui/StyledProductCard';

interface Product {
	id: number;
	title: string;
	price: number;
	image?: string;
	stock: number;
}

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const dispatch = useDispatch();

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(
			addToCart({
				id: product.id,
				title: product.title,
				price: product.price,
				image: product.image,
			})
		);
	};

	return (
		<Card>
			<LinkStyled to={`/product/${product.id}`}>
				<Image src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={product.title} />
				<Content>
					<Title>{product.title}</Title>
					<Price>{product.price.toLocaleString()} ₽</Price>
					<Button onClick={handleAddToCart} disabled={product.stock === 0}>
						{product.stock === 0 ? 'Нет в наличии' : 'В корзину'}
					</Button>
				</Content>
			</LinkStyled>
		</Card>
	);
};

export default ProductCard;

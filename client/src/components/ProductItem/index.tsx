import React from 'react';
import { TProduct } from '../../common/types/product';
import {
	addOrIncreaseToLocalCart,
	decreaseLocalItemQuantity,
	selectCartItemQtyById,
} from '../../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Flexbox, Image, Indent, Text } from '../ui';
import {
	StyledBuyButton,
	StyledImageContainer,
	StyledQuantityButton,
	StyledQuantityControl,
	StyledQuantityDisplay,
} from './styled';

interface ProductItemProps {
	product: TProduct;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
	const dispatch = useAppDispatch();
	const cartQty = useAppSelector(state => selectCartItemQtyById(state, product.id));

	const handleIncreaseQuantity = async () => {
		if (cartQty < product.stock) {
			dispatch(addOrIncreaseToLocalCart(product));
		}
	};

	const handleDecreaseQuantity = async () => {
		if (cartQty > 0) {
			dispatch(decreaseLocalItemQuantity(product.id));
		}
	};

	return (
		<Flexbox direction="column" gap="12px">
			<Indent p={16}>
				<Flexbox direction="column" gap="12px">
					{product.images && product.images.length > 0 ? (
						<Image src={product.images[0]} width={200} height={200} alt={product.name} />
					) : (
						<StyledImageContainer style={{ width: 200, height: 200, backgroundColor: '#f0f0f0' }}>
							<Text size="14px" color="secondary">
								No image
							</Text>
						</StyledImageContainer>
					)}

					<Flexbox direction="column" gap="4px">
						<Text size="18px" textWeight="600" tag="h3">
							{product.name}
						</Text>

						<Text size="14px" color="secondary" tag="p">
							{product.description}
						</Text>

						<Flexbox justifyContent="space-between" alignItems="center">
							<Text size="20px" textWeight="bold" color="primary">
								${product.price}
							</Text>

							<Text size="12px" color={product.stock > 0 ? 'primary' : 'secondary'}>
								{product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
							</Text>
						</Flexbox>
					</Flexbox>

					<Flexbox direction="column" gap="8px">
						{cartQty === 0 ? (
							<StyledBuyButton onClick={handleIncreaseQuantity} disabled={product.stock === 0}>
								Buy
							</StyledBuyButton>
						) : (
							<StyledQuantityControl>
								<StyledQuantityButton onClick={handleDecreaseQuantity}>-</StyledQuantityButton>
								<StyledQuantityDisplay>{cartQty}</StyledQuantityDisplay>
								<StyledQuantityButton
									onClick={handleIncreaseQuantity}
									disabled={cartQty >= product.stock}
								>
									+
								</StyledQuantityButton>
							</StyledQuantityControl>
						)}
					</Flexbox>
				</Flexbox>
			</Indent>
		</Flexbox>
	);
};

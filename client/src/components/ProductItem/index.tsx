import React from 'react';
import { TProduct } from '../../common/types/product';
import { Flexbox, Image, Indent, Text } from '../ui';

interface ProductItemProps {
	product: TProduct;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
	return (
		<Flexbox direction="column" gap="12px">
			<Indent p={16}>
				<Flexbox direction="column" gap="12px">
					{product.images && product.images.length > 0 ? (
						<Image src={product.images[0]} width={200} height={200} alt={product.name} />
					) : (
						<div
							style={{
								width: 200,
								height: 200,
								backgroundColor: '#f0f0f0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text size="14px" color="secondary">
								No image
							</Text>
						</div>
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
				</Flexbox>
			</Indent>
		</Flexbox>
	);
};

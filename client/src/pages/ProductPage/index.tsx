import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '@src/components/Product';

export const ProductPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const productId = id ? Number(id) : 0;

	return (
		<div>
			<Product productId={productId} />
		</div>
	);
};

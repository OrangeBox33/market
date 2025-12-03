import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Products } from '@src/components/Products';

export const ProductsPage: FC = () => {
	const { categorySlug } = useParams<{ categorySlug?: string }>();

	return (
		<div>
			<Products categorySlug={categorySlug} />
		</div>
	);
};
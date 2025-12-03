import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { DetailProduct } from '@src/components/DetailProduct';

export const DetailProductPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const productId = id ? Number(id) : 0;

	return (
		<div>
			<DetailProduct productId={productId} />
		</div>
	);
};

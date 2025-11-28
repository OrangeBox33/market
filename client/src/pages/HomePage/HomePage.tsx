import { FC } from 'react';
import homeImage from '@src/assets/images/homeImage.jpg';
import { Product } from '@src/components/Product';
import { SearchInput } from '@src/components/SearchInput';
import { Image } from '@src/components/ui/Image';

export const HomePage: FC = () => {
	return (
		<div>
			<Image src={homeImage} width="100%" />
			<SearchInput />
			<Product
				product={{
					categoryId: 1,
					description: 'description description description',
					id: 2,
					images: [
						'https://shop.profcosmo.ru/upload/resize_cache/iblock/c59/450_450_140cd750bba9870f18aada2478b24840a/q7aa6qrfoe6lcmkevb9n1z95vhdv9sh3.jpeg',
						'https://shop.profcosmo.ru/upload/iblock/e2f/c87kcat97bsz9vqu9z9qefo4iuiwchcq.jpeg',
					],
					name: 'name',
					price: 1234,
					stock: 10,
				}}
			/>
		</div>
	);
};

import { FC } from 'react';
import { SearchInput } from '@src/components/SearchInput';
import { Image } from '@src/components/ui/Image';
import homeImage from '@src/assets/images/homeImage.jpg';

export const HomePage: FC = () => {
	return (
		<div>
			<Image src={homeImage} width="100%" />
			<SearchInput />
		</div>
	);
};

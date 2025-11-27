import { FC } from 'react';
import CartSvg from '@src/assets/svg/cart.svg?react';
import FavoriteSvg from '@src/assets/svg/favorite.svg?react';
import HomeSvg from '@src/assets/svg/home.svg?react';
import ProfileSvg from '@src/assets/svg/profile.svg?react';
import SearchSvg from '@src/assets/svg/search.svg?react';
import { Icon } from '../ui/Icon';
import { Text } from '../ui/Text';
import { colorMap } from '../ui/constants';
import { StyledContainer, StyledItem } from './styled';

export const MobileMenu: FC = () => {
	return (
		<StyledContainer justifyContent="space-between" alignItems="center">
			<StyledItem gap={'2px'} direction="column" justifyContent="center" alignItems="center">
				<Icon SVG={HomeSvg} width={20} height={20} color={colorMap.primary} />
				<Text size="10px">Главная</Text>
			</StyledItem>
			<StyledItem gap={'2px'} direction="column" justifyContent="center" alignItems="center">
				<Icon SVG={SearchSvg} width={20} height={20} color={colorMap.primary} />
				<Text size="10px">Каталог</Text>
			</StyledItem>
			<StyledItem gap={'2px'} direction="column" justifyContent="center" alignItems="center">
				<Icon SVG={CartSvg} width={20} height={20} color={colorMap.primary} />
				<Text size="10px">Корзина</Text>
			</StyledItem>
			<StyledItem gap={'2px'} direction="column" justifyContent="center" alignItems="center">
				<Icon SVG={FavoriteSvg} width={20} height={20} color={colorMap.primary} />
				<Text size="10px">Избранное</Text>
			</StyledItem>
			<StyledItem gap={'2px'} direction="column" justifyContent="center" alignItems="center">
				<Icon SVG={ProfileSvg} width={20} height={20} color={colorMap.primary} />
				<Text size="10px">Профиль</Text>
			</StyledItem>
		</StyledContainer>
	);
};

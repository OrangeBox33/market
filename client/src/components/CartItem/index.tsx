import React from 'react';
import deleteIcon from '@src/assets/icons/delete.svg';
import minusIcon from '@src/assets/icons/minus.svg';
import plusIcon from '@src/assets/icons/plus.svg';
import { TCartItem } from '@src/common/types/cart';
import { TId } from '@src/common/types/common';
import { Flexbox } from '@src/components/ui/Flexbox';
import { Indent } from '@src/components/ui/Indent';
import { Text } from '@src/components/ui/Text';
import {
	addOrIncreaseToLocalCart,
	decreaseLocalItemQuantity,
	removeFromLocalCart,
} from '@src/store/slices/cartSlice';
import { selectUser } from '@src/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import {
	StyledCartItemContainer,
	StyledDeleteButton,
	StyledProductImage,
	StyledProductInfo,
	StyledQuantityButton,
	StyledQuantityControls,
} from './styled';

type TCartItemProps = {
	item: TCartItem;
};

export const CartItem: React.FC<TCartItemProps> = ({ item }) => {
	const dispatch = useAppDispatch();
	const { isAuth } = useAppSelector(selectUser);

	const handleIncreaseQuantity = (item: TCartItem) => () => {
		dispatch(addOrIncreaseToLocalCart(item));
	};

	const handleDecreaseQuantity = (id: TId) => () => {
		dispatch(decreaseLocalItemQuantity(id));
	};

	const handleRemoveItem = (id: TId) => () => {
		dispatch(removeFromLocalCart(id));
	};

	return (
		<StyledCartItemContainer>
			<StyledProductImage src={item.images?.[0] || ''} width="80" height="80" alt={item.name} />

			<StyledProductInfo direction="column">
				<Text size="16px" textWeight="600">
					{item.name}
				</Text>
				<Indent mT={8}>
					<Text size="14px" color="secondary">
						{item.description?.substring(0, 100)}...
					</Text>
				</Indent>
				<Indent mT={8}>
					<Text size="18px" textWeight="600" color="primary">
						${item.price.toFixed(2)}
					</Text>
				</Indent>
			</StyledProductInfo>

			<Flexbox direction="column" alignItems="flex-end">
				<StyledQuantityControls>
					<StyledQuantityButton onClick={handleDecreaseQuantity(item.id)}>
						<img src={minusIcon} alt="Decrease" width="16" height="16" />
					</StyledQuantityButton>

					<Text size="16px" textWeight="600" textAlign="center" maxWidth={40}>
						{item.qty}
					</Text>

					<StyledQuantityButton onClick={handleIncreaseQuantity(item)}>
						<img src={plusIcon} alt="Increase" width="16" height="16" />
					</StyledQuantityButton>
				</StyledQuantityControls>

				{/* <Indent mT={12} /> */}

				<StyledDeleteButton onClick={handleRemoveItem(item.id)}>
					<img src={deleteIcon} alt="Remove" width="20" height="20" />
				</StyledDeleteButton>
			</Flexbox>
		</StyledCartItemContainer>
	);
};

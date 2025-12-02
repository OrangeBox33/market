import React, { useEffect } from 'react';
import { Button } from '@src/components/ui/Button';
import { Flexbox } from '@src/components/ui/Flexbox';
import { Indent } from '@src/components/ui/Indent';
import { Text } from '@src/components/ui/Text';
import {
	clearCart,
	selectCart,
	selectCartError,
	selectCartLoading,
	selectCartTotals,
} from '@src/store/slices/cartSlice';
import { clearLocalCart, fetchCart } from '@src/store/slices/cartSlice';
import { selectUser } from '@src/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { CartItem } from '../CartItem';
import {
	StyledCartContainer,
	StyledCartHeader,
	StyledCartItemsContainer,
	StyledCartSummary,
	StyledEmptyCart,
} from './styled';

export const Cart: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isAuth } = useAppSelector(selectUser);
	const cartItems = useAppSelector(selectCart);
	const isLoading = useAppSelector(selectCartLoading);
	const error = useAppSelector(selectCartError);
	const { totalPrice, totalItems } = useAppSelector(selectCartTotals);

	// Load cart from server when user is authenticated
	useEffect(() => {
		if (isAuth) {
			dispatch(fetchCart());
		}
	}, [dispatch, isAuth]);

	const handleClearCart = () => {
		if (isAuth) {
			dispatch(clearCart());
		} else {
			dispatch(clearLocalCart());
		}
	};

	const handleCheckout = () => {
		// Empty handler for now
		console.log('Checkout button clicked - handler not implemented yet');
	};

	if (isLoading) {
		return (
			<StyledCartContainer>
				<Flexbox justifyContent="center" alignItems="center" isFullHeight>
					<Text size="18px">Loading cart...</Text>
				</Flexbox>
			</StyledCartContainer>
		);
	}

	if (error) {
		return (
			<StyledCartContainer>
				<Flexbox justifyContent="center" alignItems="center" isFullHeight>
					<Text size="18px" color="secondary">
						Error loading cart: {error}
					</Text>
				</Flexbox>
			</StyledCartContainer>
		);
	}

	return (
		<StyledCartContainer>
			<StyledCartHeader justifyContent="space-between" alignItems="center">
				<Text size="24px" textWeight="600" font="bastionx">
					Shopping Cart
				</Text>
				<Text size="16px" color="primary">
					{totalItems} {totalItems === 1 ? 'item' : 'items'}
				</Text>
			</StyledCartHeader>

			{cartItems.length === 0 ? (
				<StyledEmptyCart>
					<Text size="18px" color="secondary" textAlign="center">
						Your cart is empty
					</Text>
					<Indent mT={16}>
						<Text size="16px" color="tertiary" textAlign="center">
							Add some products to get started!
						</Text>
					</Indent>
				</StyledEmptyCart>
			) : (
				<>
					<StyledCartItemsContainer>
						<Flexbox direction="column" gap="16px">
							{cartItems.map(item => (
								<CartItem key={item.id} item={item} />
							))}
						</Flexbox>
					</StyledCartItemsContainer>

					<StyledCartSummary direction="column" gap="16px">
						<Flexbox justifyContent="space-between" alignItems="center">
							<Text size="18px" textWeight="600">
								Total Items:
							</Text>
							<Text size="18px">{totalItems}</Text>
						</Flexbox>

						<Flexbox justifyContent="space-between" alignItems="center">
							<Text size="20px" textWeight="600">
								Total Price:
							</Text>
							<Text size="24px" textWeight="600" color="primary">
								${totalPrice.toFixed(2)}
							</Text>
						</Flexbox>
					</StyledCartSummary>

					<Indent mT={24}>
						<Flexbox gap="16px">
							<Button theme="secondary" onClick={handleClearCart} title="Clear Cart" />
							<Button theme="primary" onClick={handleCheckout} title="Buy Now" />
						</Flexbox>
					</Indent>
				</>
			)}
		</StyledCartContainer>
	);
};

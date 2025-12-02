import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api/client';
import { TCart, TCartItem } from '@src/common/types/cart';
import { RootState } from '../store';

export const fetchCart = createAsyncThunk<TCart, void, { state: RootState }>(
	'cart/fetchCart',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.getCart();
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to fetch cart');
		}
	}
);

export const addItemsToCart = createAsyncThunk<TCart, { items: TCartItem[] }, { state: RootState }>(
	'cart/addItemsToCart',
	async ({ items }, { rejectWithValue }) => {
		try {
			const response = await api.addItemsToCart(items);
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to add items to cart');
		}
	}
);

export const increaseItemQuantity = createAsyncThunk<
	TCart,
	{ productId: number },
	{ state: RootState }
>('cart/increaseItemQuantity', async ({ productId }, { rejectWithValue }) => {
	try {
		const response = await api.increaseItemQuantity(productId);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to increase item quantity');
	}
});

export const decreaseItemQuantity = createAsyncThunk<
	TCart,
	{ productId: number },
	{ state: RootState }
>('cart/decreaseItemQuantity', async ({ productId }, { rejectWithValue }) => {
	try {
		const response = await api.decreaseItemQuantity(productId);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to decrease item quantity');
	}
});

export const removeItemFromCart = createAsyncThunk<
	TCart,
	{ productId: number },
	{ state: RootState }
>('cart/removeItemFromCart', async ({ productId }, { rejectWithValue }) => {
	try {
		const response = await api.removeItemFromCart(productId);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to remove item from cart');
	}
});

export const clearCart = createAsyncThunk<TCart, void, { state: RootState }>(
	'cart/clearCart',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.clearLocalCart();
			return response;
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to clear cart');
		}
	}
);

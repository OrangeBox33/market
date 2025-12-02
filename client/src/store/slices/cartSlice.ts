import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCart, TCartItem } from '@src/common/types/cart';
import { TProduct } from '@src/common/types/product';
import {
	addItemsToCart,
	clearCart,
	decreaseItemQuantity,
	fetchCart,
	removeItemFromCart,
} from '@src/store/thunk/cart';

type TCartState = {
	items: TCartItem[];
	isLoading: boolean;
	error: string | null;
	totalPrice: number;
	totalItems: number;
};

const initialState: TCartState = {
	items: JSON.parse(localStorage.getItem('cart') || '[]'),
	isLoading: false,
	error: null,
	totalPrice: 0,
	totalItems: 0,
};

const calculateTotals = (items: TCartItem[]) => ({
	totalPrice: items.reduce((sum, item) => sum + item.price * item.qty, 0),
	totalItems: items.reduce((sum, item) => sum + item.qty, 0),
});

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	selectors: {
		selectCart: state => state.items,
		selectCartLoading: state => state.isLoading,
		selectCartError: state => state.error,
		selectCartTotals: state => ({
			totalPrice: state.totalPrice,
			totalItems: state.totalItems,
		}),
	},
	reducers: {
		addToLocalCart: (state, action: PayloadAction<TProduct>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id);
			if (existingItem) {
				existingItem.qty += 1;
			} else {
				state.items.push({ ...action.payload, qty: 1 });
			}
			localStorage.setItem('cart', JSON.stringify(state.items));
			const totals = calculateTotals(state.items);
			state.totalPrice = totals.totalPrice;
			state.totalItems = totals.totalItems;
		},
		removeFromLocalCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
			localStorage.setItem('cart', JSON.stringify(state.items));
			const totals = calculateTotals(state.items);
			state.totalPrice = totals.totalPrice;
			state.totalItems = totals.totalItems;
		},
		increaseLocalItemQuantity: (state, action: PayloadAction<number>) => {
			const item = state.items.find(item => item.id === action.payload);
			if (item) {
				item.qty += 1;
				localStorage.setItem('cart', JSON.stringify(state.items));
				const totals = calculateTotals(state.items);
				state.totalPrice = totals.totalPrice;
				state.totalItems = totals.totalItems;
			}
		},
		decreaseLocalItemQuantity: (state, action: PayloadAction<number>) => {
			const item = state.items.find(item => item.id === action.payload);
			if (item && item.qty > 1) {
				item.qty -= 1;
				localStorage.setItem('cart', JSON.stringify(state.items));
				const totals = calculateTotals(state.items);
				state.totalPrice = totals.totalPrice;
				state.totalItems = totals.totalItems;
			}
		},
		clearLocalCart: state => {
			state.items = [];
			localStorage.removeItem('cart');
			const totals = calculateTotals(state.items);
			state.totalPrice = totals.totalPrice;
			state.totalItems = totals.totalItems;
		},
	},
	extraReducers: builder => {
		builder
			// Fetch cart
			.addCase(fetchCart.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchCart.fulfilled, (state, action: PayloadAction<TCart>) => {
				state.isLoading = false;
				state.items = action.payload.items;
				const totals = calculateTotals(action.payload.items);
				state.totalPrice = totals.totalPrice;
				state.totalItems = totals.totalItems;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Add items to server cart
			.addCase(addItemsToCart.fulfilled, (state, action: PayloadAction<TCart>) => {
				state.items = action.payload.items;
				const totals = calculateTotals(action.payload.items);
				state.totalPrice = totals.totalPrice;
				state.totalItems = totals.totalItems;
			})
			// Decrease item quantity
			.addCase(decreaseItemQuantity.fulfilled, (state, action: PayloadAction<TCart>) => {
				state.items = action.payload.items;
				const totals = calculateTotals(action.payload.items);
				state.totalPrice = totals.totalPrice;
				state.totalItems = totals.totalItems;
			})
			// Remove item from server cart
			.addCase(removeItemFromCart.fulfilled, (state, action: PayloadAction<TCart>) => {
				state.items = action.payload.items;
				const totals = calculateTotals(action.payload.items);
				state.totalPrice = totals.totalPrice;
				state.totalItems = totals.totalItems;
			})
			// Clear server cart
			.addCase(clearCart.fulfilled, state => {
				state.items = [];
				const totals = calculateTotals(state.items);
				state.totalPrice = totals.totalPrice;
				state.totalItems = totals.totalItems;
			});
	},
});

export const { selectCart, selectCartLoading, selectCartError, selectCartTotals } =
	cartSlice.selectors;
export const {
	addToLocalCart,
	removeFromLocalCart,
	increaseLocalItemQuantity,
	decreaseLocalItemQuantity,
	clearLocalCart,
} = cartSlice.actions;
export { fetchCart, addItemsToCart, decreaseItemQuantity, removeItemFromCart, clearCart };
export const cartReducer = cartSlice.reducer;

import { type PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { TCart, TCartItem } from '@src/common/types/cart';
import { TId } from '@src/common/types/common';
import { TProduct } from '@src/common/types/product';

type TCartState = {
	items: TCartItem[];
	itemsQtyIds: Record<number, number>;
	isLoading: boolean;
	error: string | null;
};

const items: TCartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

const initialState: TCartState = {
	items,
	itemsQtyIds: Object.fromEntries(items.map(item => [item.id, item.qty])),
	isLoading: false,
	error: null,
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
		selectCartQtyIds: state => state.itemsQtyIds,
		selectCartLoading: state => state.isLoading,
		selectCartError: state => state.error,
		selectCartTotals: createSelector(
			[
				(state: TCartState) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
				(state: TCartState) => state.items.reduce((sum, item) => sum + item.qty, 0),
			],
			(totalPrice, totalItems) => ({
				totalPrice,
				totalItems,
			})
		),
		selectCartItemQtyById: createSelector(
			[state => state.itemsQtyIds, (state, productId: TId) => productId],
			(itemsQtyIds, productId) => itemsQtyIds[productId] || 0
		),
	},
	reducers: {
		addOrIncreaseToLocalCart: (state, action: PayloadAction<TProduct>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id);
			if (existingItem) {
				existingItem.qty += 1;
				state.itemsQtyIds[existingItem.id] = existingItem.qty;
			} else {
				state.items.push({ ...action.payload, qty: 1 });
				state.itemsQtyIds[action.payload.id] = 1;
			}
			localStorage.setItem('cart', JSON.stringify(state.items));
		},
		removeFromLocalCart: (state, action: PayloadAction<TId>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
			delete state.itemsQtyIds[action.payload];
			localStorage.setItem('cart', JSON.stringify(state.items));
		},
		decreaseLocalItemQuantity: (state, action: PayloadAction<TId>) => {
			const item = state.items.find(item => item.id === action.payload);
			if (item && item.qty > 0) {
				if (item.qty > 1) {
					item.qty -= 1;
					state.itemsQtyIds[item.id] = item.qty;
				} else {
					state.items = state.items.filter(item => item.id !== action.payload);
					delete state.itemsQtyIds[action.payload];
				}
				localStorage.setItem('cart', JSON.stringify(state.items));
			}
		},
		clearLocalCart: state => {
			state.items = [];
			state.itemsQtyIds = {};
			localStorage.removeItem('cart');
		},
	},
	// extraReducers: builder => {
	// 	builder
	// 		// Fetch cart
	// 		.addCase(fetchCart.pending, state => {
	// 			state.isLoading = true;
	// 			state.error = null;
	// 		})
	// 		.addCase(fetchCart.fulfilled, (state, action: PayloadAction<TCart>) => {
	// 			state.isLoading = false;
	// 			state.items = action.payload.items;
	// 			const totals = calculateTotals(action.payload.items);
	// 			state.totalPrice = totals.totalPrice;
	// 			state.totalItems = totals.totalItems;
	// 		})
	// 		.addCase(fetchCart.rejected, (state, action) => {
	// 			state.isLoading = false;
	// 			state.error = action.payload as string;
	// 		})
	// 		// Decrease item quantity
	// 		.addCase(decreaseItemQuantity.fulfilled, (state, action: PayloadAction<TCart>) => {
	// 			state.items = action.payload.items;
	// 			const totals = calculateTotals(action.payload.items);
	// 			state.totalPrice = totals.totalPrice;
	// 			state.totalItems = totals.totalItems;
	// 		})
	// 		// Remove item from server cart
	// 		.addCase(removeItemFromCart.fulfilled, (state, action: PayloadAction<TCart>) => {
	// 			state.items = action.payload.items;
	// 			const totals = calculateTotals(action.payload.items);
	// 			state.totalPrice = totals.totalPrice;
	// 			state.totalItems = totals.totalItems;
	// 		})
	// 		// Clear server cart
	// 		.addCase(clearCart.fulfilled, state => {
	// 			state.items = [];
	// 			const totals = calculateTotals(state.items);
	// 			state.totalPrice = totals.totalPrice;
	// 			state.totalItems = totals.totalItems;
	// 		});
	// },
});

export const {
	selectCart,
	selectCartQtyIds,
	selectCartLoading,
	selectCartError,
	selectCartTotals,
	selectCartItemQtyById,
} = cartSlice.selectors;
export const {
	addOrIncreaseToLocalCart,
	removeFromLocalCart,
	decreaseLocalItemQuantity,
	clearLocalCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

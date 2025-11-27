import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, TProduct } from '@src/common/types/product';

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	selectors: { selectCart: state => state.items },
	reducers: {
		addToCart: (state, action: PayloadAction<TProduct>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id);
			if (existingItem) {
				existingItem.qty += 1;
			} else {
				state.items.push({ ...action.payload, qty: 1 });
			}
			localStorage.setItem('cart', JSON.stringify(state.items));
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
			localStorage.setItem('cart', JSON.stringify(state.items));
		},
		updateQuantity: (state, action: PayloadAction<{ id: number; qty: number }>) => {
			const item = state.items.find(item => item.id === action.payload.id);
			if (item) {
				if (action.payload.qty <= 0) {
					state.items = state.items.filter(i => i.id !== action.payload.id);
				} else {
					item.qty = action.payload.qty;
				}
			}
			localStorage.setItem('cart', JSON.stringify(state.items));
		},
		clearCart: state => {
			state.items = [];
			localStorage.removeItem('cart');
		},
	},
});

export const { selectCart } = cartSlice.selectors;
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

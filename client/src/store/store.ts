import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cartSlice';
import { productReducer } from './slices/productSlice';
import { settingsReducer } from './slices/settingsSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		settings: settingsReducer,
		product: productReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

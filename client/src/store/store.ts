import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { cartReducer } from './slices/cartSlice';
import { settingsReducer } from './slices/settingsSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		settings: settingsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

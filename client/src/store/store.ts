import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cartSlice';
import { detailProductReducer } from './slices/detailProductSlice';
import { productsReducer } from './slices/productsSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		detailProduct: detailProductReducer,
		products: productsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

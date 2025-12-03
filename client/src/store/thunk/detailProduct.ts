import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api/client';
import { TProduct } from '@src/common/types/product';
import { RootState } from '../store';

export const fetchProduct = createAsyncThunk<
	TProduct,
	{ id: number },
	{ state: RootState }
>('product/fetchProduct', async ({ id }, { rejectWithValue }) => {
	try {
		const response = await api.getProduct(id);
		return response;
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to fetch product');
	}
});
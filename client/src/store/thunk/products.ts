import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsApi } from '@src/api/modules/products';
import { TPaginationRequest } from '@src/common/types/request';
import { TProductsResponse } from '@src/common/types/response';

const productsApi = new ProductsApi();

export const getProducts = createAsyncThunk<
	TProductsResponse,
	TPaginationRequest & { categorySlug?: string }
>('products/getProducts', async ({ page = 1, perPage = 12, categorySlug }, { rejectWithValue }) => {
	try {
		return productsApi.getProducts({ page, perPage, categorySlug });
	} catch (error: any) {
		return rejectWithValue(
			error.response?.data || { message: 'Failed to fetch products', type: 'unknown', status: null }
		);
	}
});

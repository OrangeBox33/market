import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TProduct, TProductForSearch } from '@src/common/types/product';
import { fetchProduct } from '../thunk/detailProduct';

interface ProductState {
	productsForSearch: TProductForSearch[];
	detailProduct: TProduct | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	productsForSearch: [],
	detailProduct: null,
	isLoading: false,
	error: null,
};

const detailProductSlice = createSlice({
	name: 'detailProduct',
	initialState,
	selectors: {
		selectProductsForSearch: state => state.productsForSearch,
		selectDetailProduct: state => state.detailProduct,
		selectDetailProductLoading: state => state.isLoading,
		selectDetailProductError: state => state.error,
	},
	reducers: {
		setProductsForSearch: (state, action: PayloadAction<TProductForSearch[]>) => {
			state.productsForSearch = action.payload;
		},
		clearDetailProduct: state => {
			state.detailProduct = null;
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProduct.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.detailProduct = action.payload;
				state.error = null;
			})
			.addCase(fetchProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
				state.detailProduct = null;
			});
	},
});

export const {
	selectProductsForSearch,
	selectDetailProduct,
	selectDetailProductLoading,
	selectDetailProductError,
} = detailProductSlice.selectors;
export const { setProductsForSearch, clearDetailProduct } = detailProductSlice.actions;
export const detailProductReducer = detailProductSlice.reducer;

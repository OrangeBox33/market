import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TProduct, TProductForSearch } from '@src/common/types/product';
import { fetchProduct } from '../thunk/product';

interface ProductState {
	productsForSearch: TProductForSearch[];
	currentProduct: TProduct | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	productsForSearch: [],
	currentProduct: null,
	isLoading: false,
	error: null,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	selectors: {
		selectProductsForSearch: state => state.productsForSearch,
		selectCurrentProduct: state => state.currentProduct,
		selectProductLoading: state => state.isLoading,
		selectProductError: state => state.error,
	},
	reducers: {
		setProductsForSearch: (state, action: PayloadAction<TProductForSearch[]>) => {
			state.productsForSearch = action.payload;
		},
		clearCurrentProduct: state => {
			state.currentProduct = null;
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
				state.currentProduct = action.payload;
				state.error = null;
			})
			.addCase(fetchProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
				state.currentProduct = null;
			});
	},
});

export const {
	selectProductsForSearch,
	selectCurrentProduct,
	selectProductLoading,
	selectProductError,
} = productSlice.selectors;
export const { setProductsForSearch, clearCurrentProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;

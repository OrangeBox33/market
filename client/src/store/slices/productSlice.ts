import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TProductForSearch } from '@src/common/types/product';

interface ProductState {
	productsForSearch: TProductForSearch[];
}

const initialState: ProductState = { productsForSearch: [] };

export const productSlice = createSlice({
	name: 'product',
	initialState,
	selectors: {
		selectProductsForSearch: state => state.productsForSearch,
	},
	reducers: {
		setProductsForSearch: (state, action: PayloadAction<TProductForSearch[]>) => {
			state.productsForSearch = action.payload;
		},
	},
});

export const { selectProductsForSearch } = productSlice.selectors;
export const { setProductsForSearch } = productSlice.actions;
export const productReducer = productSlice.reducer;

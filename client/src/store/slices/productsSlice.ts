import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TProduct, TProductForSearch } from '@src/common/types/product';
import { TPaginationResponse } from '@src/common/types/response';
import { getProducts } from '@src/store/thunk/products';

interface ProductState {
	productsForSearch: TProductForSearch[];
	items: TProduct[];
	currentPage: number;
	perPage: number;
	total: number;
	totalPages: number;
	isLoading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	productsForSearch: [],
	items: [],
	currentPage: 1,
	perPage: 12,
	total: 0,
	totalPages: 0,
	isLoading: false,
	error: null,
};

const calculateTotalPages = (total: number, perPage: number): number => {
	return Math.ceil(total / perPage);
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	selectors: {
		selectProductsForSearch: state => state.productsForSearch,
		selectProductsItems: state => state.items,
		selectProductsPagination: state => ({
			currentPage: state.currentPage,
			perPage: state.perPage,
			total: state.total,
			totalPages: state.totalPages,
		}),
		selectProductsLoading: state => state.isLoading,
		selectProductsError: state => state.error,
	},
	reducers: {
		setProductsForSearch: (state, action: PayloadAction<TProductForSearch[]>) => {
			state.productsForSearch = action.payload;
		},
		setProductsPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setProductsPerPage: (state, action: PayloadAction<number>) => {
			state.perPage = action.payload;
			state.currentPage = 1; // Reset to first page when changing perPage
		},
		clearProductsError: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getProducts.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				getProducts.fulfilled,
				(state, action: PayloadAction<TPaginationResponse & { items: TProduct[] }>) => {
					console.log('Products fetched:', action.payload);
					state.isLoading = false;
					state.items = action.payload.items;
					state.currentPage = action.payload.page;
					state.perPage = action.payload.perPage;
					state.total = action.payload.total;
					state.totalPages = calculateTotalPages(action.payload.total, action.payload.perPage);
				}
			)
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = (action.payload as string) || 'Failed to fetch products';
			});
	},
});

export const {
	selectProductsForSearch,
	selectProductsItems,
	selectProductsPagination,
	selectProductsLoading,
	selectProductsError,
} = productsSlice.selectors;

export const { setProductsForSearch, setProductsPage, setProductsPerPage, clearProductsError } =
	productsSlice.actions;

export const productsReducer = productsSlice.reducer;

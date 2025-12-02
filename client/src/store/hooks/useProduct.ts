import { useEffect } from 'react';
import {
	clearCurrentProduct,
	selectCurrentProduct,
	selectProductError,
	selectProductLoading,
} from '@src/store/slices/productSlice';
import { fetchProduct } from '@src/store/thunk/product';
import { useAppDispatch, useAppSelector } from '../store';

export const useProduct = (productId: number | undefined) => {
	const dispatch = useAppDispatch();

	const product = useAppSelector(selectCurrentProduct);
	const isLoading = useAppSelector(selectProductLoading);
	const error = useAppSelector(selectProductError);

	useEffect(() => {
		if (productId) {
			dispatch(fetchProduct({ id: productId }));
		}

		return () => {
			dispatch(clearCurrentProduct());
		};
	}, [dispatch, productId]);

	const refetchProduct = () => {
		if (productId) {
			dispatch(fetchProduct({ id: productId }));
		}
	};

	return {
		product,
		isLoading,
		error,
		refetchProduct,
	};
};

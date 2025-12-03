import { useEffect } from 'react';
import { fetchProduct } from '@src/store/thunk/detailProduct';
import {
	clearDetailProduct,
	selectDetailProduct,
	selectDetailProductError,
	selectDetailProductLoading,
} from '../slices/detailProductSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const useProduct = (productId: number | undefined) => {
	const dispatch = useAppDispatch();

	const product = useAppSelector(selectDetailProduct);
	const isLoading = useAppSelector(selectDetailProductLoading);
	const error = useAppSelector(selectDetailProductError);

	useEffect(() => {
		if (productId) {
			dispatch(fetchProduct({ id: productId }));
		}

		return () => {
			dispatch(clearDetailProduct());
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

import { BaseApiClient } from '../base-client';
import { TProduct, TProductForSearch } from '../../common/types/product';
import { TProductsResponse, TPaginationRequest } from '../types';

export class ProductsApi extends BaseApiClient {
	getProducts = ({ page, perPage, category }: TPaginationRequest & { category?: string }) => {
		return this.get<TProductsResponse>('/products', {
			params: { page, perPage, category },
		});
	};

	getProduct = (id: number) => {
		return this.get<TProduct>(`/products/${id}`);
	};

	getProductsForSearch = () => {
		return this.get<TProductForSearch[]>('/products-for-search');
	};
}
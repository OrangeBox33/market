import { TPaginationRequest } from '@src/common/types/request';
import { TProductsResponse } from '@src/common/types/response';
import { TProduct, TProductForSearch } from '../../common/types/product';
import { BaseApiClient } from '../base-client';

export class ProductsApi extends BaseApiClient {
	getProducts = ({
		page,
		perPage,
		categorySlug,
	}: TPaginationRequest & { categorySlug?: string }) => {
		return this.get<TProductsResponse>('/products', {
			params: { page, perPage, categorySlug },
		});
	};

	getProduct = (id: number) => {
		return this.get<TProduct>(`/product/${id}`);
	};

	getProductsForSearch = () => {
		return this.get<TProductForSearch[]>('/products-for-search');
	};
}

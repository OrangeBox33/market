import { TCategory } from '../../common/types/product';
import { BaseApiClient } from '../base-client';

export class CategoriesApi extends BaseApiClient {
	getCategories = () => {
		return this.get<TCategory[]>('/categories');
	};

	getCategoryProducts = (categoryId: number) => {
		return this.get<{
			category: TCategory;
			products: any[];
		}>(`/category/${categoryId}`);
	};
}

import { BaseApiClient } from '../base-client';
import { TCategory } from '../../common/types/product';

export class CategoriesApi extends BaseApiClient {
	getCategories = () => {
		return this.get<TCategory[]>('/categories');
	};
}
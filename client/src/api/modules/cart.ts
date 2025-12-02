import { BaseApiClient } from '../base-client';
import { TCart, TCartItem } from '../../common/types/cart';

export class CartApi extends BaseApiClient {
	getCart = () => {
		return this.get<TCart>('/cart');
	};

	addItemsToCart = (items: TCartItem[]) => {
		return this.post<TCart>('/cart/addItems', { items });
	};

	increaseItemQuantity = (productId: number) => {
		return this.patch<TCart>('/cart/increaseItem', { productId });
	};

	decreaseItemQuantity = (productId: number) => {
		return this.patch<TCart>('/cart/decreaseItem', { productId });
	};

	removeItemFromCart = (productId: number) => {
		return this.delete<TCart>('/cart/removeItem', { data: { productId } });
	};

	clearLocalCart = () => {
		return this.delete<TCart>('/cart/clear');
	};
}
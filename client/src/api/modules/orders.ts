import { BaseApiClient } from '../base-client';
import { TOrder } from '../../common/types/product';

export class OrdersApi extends BaseApiClient {
	createOrder = (orderData: {
		items: Array<{ productId: number; qty: number }>;
		deliveryMethod: string;
		contactInfo?: any;
	}) => {
		return this.post('/orders', orderData);
	};

	getOrders = () => {
		return this.get<TOrder[]>('/orders');
	};

	getOrder = (id: number) => {
		return this.get(`/orders/${id}`);
	};
}
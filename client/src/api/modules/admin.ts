import { TPaginationRequest } from '@src/common/types/request';
import { BaseApiClient } from '../base-client';

export class AdminApi extends BaseApiClient {
	// ========== Admin Products ==========
	adminGetProducts = ({ page, perPage }: TPaginationRequest) => {
		return this.get('/admin/products', { params: { page, perPage } });
	};

	adminCreateProduct = (productData: {
		title: string;
		description: string;
		price: number;
		stock: number;
		categoryId: number;
		images: string[];
	}) => {
		return this.post('/admin/products', productData);
	};

	adminUpdateProduct = (data: {
		id: number;
		title?: string;
		description?: string;
		price?: number;
		stock?: number;
		categoryId?: number;
		images?: string[];
	}) => {
		const { id, ...productData } = data;
		return this.put(`/admin/products/${id}`, productData);
	};

	adminDeleteProduct = (id: number) => {
		return this.delete(`/admin/products/${id}`);
	};

	// ========== Admin Orders ==========
	adminGetOrders = ({ page, perPage, status }: TPaginationRequest & { status?: string }) => {
		return this.get('/admin/orders', { params: { page, perPage, status } });
	};

	adminGetOrder = (id: number) => {
		return this.get(`/admin/orders/${id}`);
	};

	adminUpdateOrderStatus = (data: { id: number; status: string }) => {
		return this.put(`/admin/orders/${data.id}`, { status: data.status });
	};
}

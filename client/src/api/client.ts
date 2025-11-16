import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TPaginationRequest } from './types/request';
import {
	TNormalizedError,
	TProductsResponse,
	TSendOtpResponse,
	TUserResponse,
} from './types/response';
import { TCategory, TOrder, TProduct } from '../utils/types/product';

class ApiService {
	private client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3500/api',
			withCredentials: true,
		});

		this.client.interceptors.response.use(
			res => res.data,
			err => {
				let normalizedError;

				if (err.response) {
					normalizedError = {
						message: err.response.data?.message || 'Server error',
						status: err.response.status,
						type: 'server',
					};
				} else if (err.request) {
					normalizedError = {
						message: 'Network error',
						status: null,
						type: 'network',
					};
				} else {
					normalizedError = {
						message: err.message || 'Unexpected error',
						status: null,
						type: 'unknown',
					};
				}

				throw normalizedError as TNormalizedError;
			}
		);
	}

	get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		return this.get(url, config);
	};
	post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
		return this.post(url, data, config);
	};
	put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
		return this.put(url, data, config);
	};
	delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		return this.delete(url, config);
	};

	// ========== Categories ==========
	getCategories() {
		return this.get<TCategory[]>('/categories');
	}

	// ========== Products ==========
	getProducts({ page, perPage, category }: TPaginationRequest & { category?: string }) {
		return this.get<TProductsResponse>('/products', {
			params: { page, perPage, category },
		});
	}

	getProduct(id: number) {
		return this.get<TProduct>(`/products/${id}`);
	}

	// ========== Auth ==========
	sendOtp(phone: string) {
		return this.post<TSendOtpResponse>('/auth/send-otp', { phone });
	}

	verifyOtp(data: { phone: string; code: string }) {
		return this.post<TUserResponse>('/auth/verify-otp', data);
	}

	auth() {
		return this.get<TUserResponse | null>('/auth');
	}

	logout() {
		return this.post('/auth/logout');
	}

	// ========== Orders ==========
	createOrder(orderData: {
		items: Array<{ productId: number; qty: number }>;
		deliveryMethod: string;
		contactInfo?: any;
	}) {
		return this.post('/orders', orderData);
	}

	getOrders() {
		return this.get<TOrder[]>('/orders');
	}

	getOrder(id: number) {
		return this.get(`/orders/${id}`);
	}

	// ========== Admin Products ==========
	adminGetProducts({ page, perPage }: TPaginationRequest) {
		return this.get('/admin/products', { params: { page, perPage } });
	}

	adminCreateProduct(productData: {
		title: string;
		description: string;
		price: number;
		stock: number;
		categoryId: number;
		images: string[];
	}) {
		return this.post('/admin/products', productData);
	}

	adminUpdateProduct(data: {
		id: number;
		title?: string;
		description?: string;
		price?: number;
		stock?: number;
		categoryId?: number;
		images?: string[];
	}) {
		const { id, ...productData } = data;
		return this.put(`/admin/products/${id}`, productData);
	}

	adminDeleteProduct(id: number) {
		return this.delete(`/admin/products/${id}`);
	}

	// ========== Admin Orders ==========
	adminGetOrders({ page, perPage, status }: TPaginationRequest & { status?: string }) {
		return this.get('/admin/orders', { params: { page, perPage, status } });
	}

	adminGetOrder(id: number) {
		return this.get(`/admin/orders/${id}`);
	}

	adminUpdateOrderStatus(data: { id: number; status: string }) {
		return this.put(`/admin/orders/${data.id}`, { status: data.status });
	}
}

export const api = new ApiService();

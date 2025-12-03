import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TNormalizedError } from '../common/types/response';

export class BaseApiClient {
	protected client: AxiosInstance;

	constructor() {
		this.client = this.createAxiosInstance();
		this.setupInterceptors();
	}

	protected createAxiosInstance(): AxiosInstance {
		return axios.create({
			baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3500/api',
			withCredentials: true,
		});
	}

	private setupInterceptors() {
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

	protected get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		return this.client.get(url, config);
	};

	protected post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
		return this.client.post(url, data, config);
	};

	protected put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
		return this.client.put(url, data, config);
	};

	protected patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
		return this.client.patch(url, data, config);
	};

	protected delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		return this.client.delete(url, config);
	};
}

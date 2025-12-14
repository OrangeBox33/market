import { TContact, TProduct } from '@src/common/types/product';
import { TId } from './common';

export type TNormalizedError = {
	message: string;
	type: 'network' | 'server' | 'unknown';
	status: number | null;
};

export type TPaginationResponse = {
	page: number;
	perPage: number;
	total: number;
};

export type TUserResponse = {
	id: TId;
	phone: string;
	role: 'user' | 'admin';
	contacts: TContact[];
	name?: string;
};

export type TAuthResponse = {
	user: TUserResponse | null;
	message?: string;
};

export type TSendOtpResponse = { code: string; phone: string };

export type TProductsResponse = TPaginationResponse & { items: TProduct[] };

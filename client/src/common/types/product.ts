import { EOrderStatus } from '../enums/enum';
import { TId } from './common';

export type TCategory = {
	id: TId;
	name: string;
	slug: string;
};

export type TProduct = {
	id: TId;
	name: string;
	description: string;
	price: number;
	stock: number;
	images: string[];
	categoryId: TId;
};

export type TProductForSearch = {
	id: TId;
	name: string;
	translit: string | null;
};

export type TOrderItem = { productId: TId; name: string; price: number; qty: number };

export type TContact = {
	address: string;
};

export type TOrder = {
	id: TId;
	createdAt: Date;
	totalPrice: number;
	deliveryMethod: string;
	status: EOrderStatus;
	contact?: TContact;
	items: TOrderItem[];
};

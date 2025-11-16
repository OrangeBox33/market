import { EOrderStatus } from '../enums/enum';

export type TCategory = {
	id: number;
	name: string;
	slug: string;
};

export type TProduct = {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	images: string[];
	categoryId: number;
};

export type TOrderItem = { productId: number; name: string; price: number; qty: number };

export type TContact = {
	address: string;
};

export type TOrder = {
	id: number;
	createdAt: Date;
	totalPrice: number;
	deliveryMethod: string;
	status: EOrderStatus;
	contact?: TContact;
	items: TOrderItem[];
};

export type CartItem = TProduct & {
	qty: number;
};

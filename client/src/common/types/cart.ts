import { TProduct } from './product';

export type TCartItem = {
	productId: number;
	quantity: number;
};

export type TCart = {
	userId: number;
	items: TProduct[];
};

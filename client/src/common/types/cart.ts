import { TProduct } from './product';

export type TCartItem = TProduct & {
	qty: number;
};

export type TCart = {
	userId: number;
	items: TCartItem[];
};

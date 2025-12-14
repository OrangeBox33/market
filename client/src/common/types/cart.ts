import { TId } from './common';
import { TProduct } from './product';

export type TCartItem = TProduct & {
	qty: number;
};

export type TCart = {
	userId: TId;
	items: TCartItem[];
};

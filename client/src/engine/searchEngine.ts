import { TProductForSearch } from '@src/common/types/product';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import Fuse from 'fuse.js';

const cyrillicToTranslit = CyrillicToTranslit();

let fuse: Fuse<TProductForSearch> | null = null;

export const initSearchEngine = (productsForSearch: TProductForSearch[]) => {
	if (!fuse) {
		fuse = new Fuse(productsForSearch, {
			keys: ['name', 'translit'],
			threshold: 0.5,
			ignoreLocation: true,
			includeScore: true,
		});
	}
};

export const searchProducts = (query: string) => {
	if (!fuse) return [];
	return fuse
		.search(query)
		.slice(0, 5)
		.map(result => result.item);
};

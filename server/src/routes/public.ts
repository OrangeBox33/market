import express from 'express';
import { getCategories } from './../controllers/categoriesController';
import {
	getProductById,
	getProductForSearch,
	listProducts,
} from './../controllers/productsController';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/products', listProducts);
router.get('/products/:id', getProductById);
router.get('/products-for-search', getProductForSearch);

export default router;

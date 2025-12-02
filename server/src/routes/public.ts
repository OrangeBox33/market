import express from 'express';
import { getCategories, getCategory } from './../controllers/categoriesController';
import {
	getProductById,
	getProductForSearch,
	listProducts,
} from './../controllers/productsController';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/category/:id', getCategory);
router.get('/products', listProducts);
router.get('/product/:id', getProductById);
router.get('/products-for-search', getProductForSearch);

export default router;

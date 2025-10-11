import { getProductById, listProducts } from './../controllers/productsController';
import { getCategories } from './../controllers/categoriesController';
import express from 'express';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/products', listProducts);
router.get('/products/:id', getProductById);

export default router;

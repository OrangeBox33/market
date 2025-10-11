import express from 'express';
import { requireAdmin } from '../middleware/auth';
import { adminListOrders, adminGetOrder, adminUpdateOrderStatus } from '../controllers/adminOrdersController';
import {
	adminCreateProduct,
	adminUpdateProduct,
	adminDeleteProduct,
	adminListProducts,
} from '../controllers/adminProductsController';

const router = express.Router();

// Products
router.post('/products', requireAdmin, adminCreateProduct);
router.put('/products/:id', requireAdmin, adminUpdateProduct);
router.delete('/products/:id', requireAdmin, adminDeleteProduct);
router.get('/products', requireAdmin, adminListProducts);

// Orders
router.get('/orders', requireAdmin, adminListOrders);
router.get('/orders/:id', requireAdmin, adminGetOrder);
router.put('/orders/:id', requireAdmin, adminUpdateOrderStatus);

export default router;

import express from 'express';
import { createOrder, getOrderById, listOrders } from './../controllers/ordersController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.post('/orders', requireAuth, createOrder);
router.get('/orders', requireAuth, listOrders);
router.get('/orders/:id', requireAuth, getOrderById);

export default router;

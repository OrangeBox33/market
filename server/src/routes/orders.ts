import express from 'express';
import { requireAuth } from '../middleware/auth';
import { createOrder, getOrderById, listOrders } from './../controllers/ordersController';

const router = express.Router();

router.post('/orders', requireAuth, createOrder);
router.get('/orders', requireAuth, listOrders);
router.get('/orders/:id', requireAuth, getOrderById);

export default router;

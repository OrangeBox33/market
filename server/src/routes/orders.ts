import express from 'express';
import { requireAuth, withAuth } from '../middleware/auth';
import { createOrder, getOrderById, listOrders } from './../controllers/ordersController';

const router = express.Router();

router.post('/', requireAuth, withAuth(createOrder));
router.get('/', requireAuth, withAuth(listOrders));
router.get('/:id', requireAuth, withAuth(getOrderById));

export default router;

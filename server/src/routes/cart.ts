import express from 'express';
import {
	addItemsToCart,
	clearCart,
	decreaseItemQuantity,
	getCart,
	removeItemFromCart,
} from '../controllers/cartController';
import { requireAuth, withAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, withAuth(getCart));
router.post('/addItems', requireAuth, withAuth(addItemsToCart));
router.post('/decreaseItem', requireAuth, withAuth(decreaseItemQuantity));
router.post('/removeItem', requireAuth, withAuth(removeItemFromCart));
router.delete('/clear', requireAuth, withAuth(clearCart));

export default router;

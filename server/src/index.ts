import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { startProductsListener } from './listeners/products-listener';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';
import cartRoutes from './routes/cart';
import healthRoutes from './routes/health';
import ordersRoutes from './routes/orders';
import publicRoutes from './routes/public';

console.log('Database URL:', process.env.DATABASE_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use(
	cors({
		origin: 'http://localhost:3333', // фронтенд
		credentials: true,
	})
);
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));

startProductsListener();

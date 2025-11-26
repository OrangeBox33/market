import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import healthRoutes from './routes/health';
import publicRoutes from './routes/public';
import authRoutes from './routes/auth';
import ordersRoutes from './routes/orders';
import adminRoutes from './routes/admin';
import { startProductsListener } from './listeners/products-listener';

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
app.use('/api', authRoutes);
app.use('/api', ordersRoutes);
app.use('/api/admin', adminRoutes);

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));

startProductsListener();

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/products', async (_, res) => {
	const products = await prisma.product.findMany();
	res.json(products);
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));

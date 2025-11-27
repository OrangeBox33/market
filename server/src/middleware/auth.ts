import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TAuthedRequest, TUser } from '../types/auth';

export const requireAuth = (req: TAuthedRequest, res: Response, next: NextFunction) => {
	try {
		const auth = req.headers.authorization || '';
		const [scheme, token] = auth.split(' ');
		if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Unauthorized' });
		const secret = process.env.JWT_SECRET || 'dev-secret';
		const payload = jwt.verify(token, secret) as TUser;
		req.user = payload;
		return next();
	} catch {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};

export const requireAdmin = (req: TAuthedRequest, res: Response, next: NextFunction) => {
	requireAuth(req, res, () => {
		if (req.user?.role === 'admin') return next();
		return res.status(403).json({ message: 'Forbidden' });
	});
};

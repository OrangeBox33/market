import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
	res.status(200).json({
		status: 'OK',
		message: 'Server is running',
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || 'development',
	});
};

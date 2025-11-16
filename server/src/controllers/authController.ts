import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma';
import { compareHash, makeHash, normalizePhone } from '../utils/auth';
import { TUser } from '../types/auth';

const generateCodeDEV = () => String(Math.floor(100000 + Math.random() * 900000));

const otpThrottle = new Map<string, number>();

export const sendOtp = async (req: Request, res: Response) => {
	try {
		const phoneRaw = String(req.body?.phone || '');
		const phone = normalizePhone(phoneRaw);
		if (!phone) return res.status(400).json({ message: 'Invalid phone' });

		const now = Date.now();
		const last = otpThrottle.get(phone) || 0;
		if (now - last < 60_000) {
			return res.status(429).json({ message: 'Too many requests. Try again later.' });
		}

		const code = generateCodeDEV();
		const codeHash = await makeHash(code);
		const expiresAt = new Date(Date.now() + 5 * 60_000);

		await prisma.otp.create({ data: { phone, codeHash, expiresAt, attempts: 0 } });
		otpThrottle.set(phone, now);

		console.log(`[DEV][send-otp] phone=${phone} code=${code}`);
		return res.status(200).json({ phone, code });
	} catch (error) {
		return res.status(501).json({ message: 'Failed to send OTP' });
	}
};

export const verifyOtp = async (req: Request, res: Response) => {
	try {
		const phoneRaw = String(req.body?.phone || '');
		const code = String(req.body?.code || '');
		const phone = normalizePhone(phoneRaw);
		if (!phone) {
			return res.status(400).json({ message: 'Invalid phone' });
		}
		if (!/^\d{6}$/.test(code)) {
			return res.status(400).json({ message: 'Invalid code' });
		}

		const otp = await prisma.otp.findFirst({
			where: { phone },
			orderBy: { createdAt: 'desc' },
		});

		if (!otp) {
			return res.status(400).json({ message: 'OTP not found' });
		}
		if (otp.expiresAt.getTime() < Date.now()) {
			return res.status(400).json({ message: 'OTP expired' });
		}
		const isValidCode = await compareHash(code, otp.codeHash);

		if (!isValidCode) {
			await prisma.otp.update({
				where: { id: otp.id },
				data: { attempts: otp.attempts + 1 },
			});
			return res.status(400).json({ message: 'Invalid code' });
		}

		let user = await prisma.user.findUnique({ where: { phone } });

		if (!user) {
			user = await prisma.user.create({
				data: { phone },
			});
		}

		// Создаём JWT токен
		const secret = process.env.JWT_SECRET || 'dev-secret';
		const token = jwt.sign(
			{
				id: user.id,
				phone: user.phone,
				role: user.role,
				name: user.name,
			},
			secret,
			{ expiresIn: '30d' }
		);

		return res
			.cookie('jwt', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 29 * 24 * 60 * 60 * 1000, // 29 days
			})
			.status(200)
			.json({
				user: {
					id: user.id,
					phone: user.phone,
					name: user.name,
					role: user.role,
				},
			});
	} catch (error) {
		console.error('verifyOtp error:', error);
		return res.status(501).json({ message: 'Failed to verify OTP on server' });
	}
};

export const auth = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(200).json({ user: null, message: 'No token provided' });
		}

		// Проверяем подпись токена
		const { id } = jwt.verify(token, process.env.JWT_SECRET!) as TUser;

		// Ищем пользователя в базе
		const user = await prisma.user.findUnique({
			where: { id },
			select: { id: true, phone: true, name: true, role: true, contacts: true },
		});

		if (!user) {
			return res.status(200).json({ user: null, message: 'User not found' });
		}

		return res.status(200).json({ user });
	} catch (err) {
		console.error('Auth error:', err);
		return res.status(501).json({ message: 'Invalid or expired token' });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		res.clearCookie('jwt', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		});
		return res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		return res.status(501).json({ message: 'Failed to logout' });
	}
};

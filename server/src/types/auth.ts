import { EUserRole } from '@prisma/client';
import { Request } from 'express';

export interface TUser {
	id: number;
	phone: string;
	role: EUserRole;
	name?: string;
}
export interface TAuthedRequest extends Request {
	user?: TUser;
}

import { EUserRole } from '@prisma/client';
import { Request } from 'express';

export interface TAuthPayload {
	id: number;
	phone: string;
	role: EUserRole;
}
export interface TAuthedRequest extends Request {
	user?: TAuthPayload;
}

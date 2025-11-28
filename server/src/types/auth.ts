import { Request } from 'express';
import { EUserRole } from '../prisma/generated/enums';

export interface TUser {
	id: number;
	phone: string;
	role: EUserRole;
	name?: string;
}
export interface TAuthedRequest extends Request {
	user: TUser;
}

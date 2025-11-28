import { TUser } from '../types/auth';

declare global {
	namespace Express {
		interface Request {
			user?: TUser;
		}
	}
}

import { TUserResponse } from '@src/api/types/response';

export type TUser = TUserResponse & { isAuth: boolean };

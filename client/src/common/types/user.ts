import { TUserResponse } from '@src/common/types/response';

export type TUser = TUserResponse & { isAuth: boolean };

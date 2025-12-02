import { TSendOtpResponse, TUserResponse } from '../../common/types/response';
import { BaseApiClient } from '../base-client';

export class AuthApi extends BaseApiClient {
	sendOtp = (phone: string) => {
		return this.post<TSendOtpResponse>('/auth/send-otp', { phone });
	};

	verifyOtp = (data: { phone: string; code: string }) => {
		return this.post<TUserResponse>('/auth/verify-otp', data);
	};

	auth = () => {
		return this.get<TUserResponse | null>('/auth');
	};

	logout = () => {
		return this.post('/auth/logout');
	};
}

import { TAuthResponse, TSendOtpResponse } from '../../common/types/response';
import { BaseApiClient } from '../base-client';

export class AuthApi extends BaseApiClient {
	sendOtp = (phone: string) => {
		return this.post<TSendOtpResponse>('/auth/send-otp', { phone });
	};

	verifyOtp = (data: { phone: string; code: string }) => {
		return this.post<TAuthResponse>('/auth/verify-otp', data);
	};

	auth = () => {
		return this.get<TAuthResponse>('/auth');
	};

	logout = () => {
		return this.post('/auth/logout');
	};
}

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api/client';
import { TVerifyOtpRequest } from '@src/common/types/request';

export const verifyOtp = createAsyncThunk('verifyOtp', async (data: TVerifyOtpRequest) => {
	const response = await api.verifyOtp(data);
	return response.user;
});

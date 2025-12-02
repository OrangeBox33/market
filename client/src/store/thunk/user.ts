import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@src/api/client';
import { TVerifyOtpRequest } from '@src/common/types/request';

export const verifyOtp = createAsyncThunk('verifyOtp', async (data: TVerifyOtpRequest) => {
	return api.verifyOtp(data);
});

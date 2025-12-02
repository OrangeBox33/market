export type TPaginationRequest = {
	page?: number;
	perPage?: number;
};

export type TSendOtpRequest = {
	phone: string;
};

export type TVerifyOtpRequest = {
	phone: string;
	code: string;
};

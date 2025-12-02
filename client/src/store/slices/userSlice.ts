import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUserResponse } from '@src/common/types/response';
import { TUser } from '../../common/types/user';
import { verifyOtp } from '../thunk/user';

type TUserState = Partial<TUser> & Pick<TUser, 'isAuth'> & { isLoading: boolean };

const initialState: TUserState = {
	isAuth: false,
	isLoading: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	selectors: { selectUser: state => state },
	reducers: {
		setUser: (state, action: PayloadAction<TUserResponse>) => {
			const { id, name, phone, role } = action.payload;
			state.id = id;
			state.name = name;
			state.phone = phone;
			state.role = role;
			state.isAuth = true;
		},
		logout: state => {
			state.id = undefined;
			state.name = undefined;
			state.phone = undefined;
			state.role = undefined;
			state.isAuth = false;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(verifyOtp.pending, state => {
				state.isLoading = true;
			})
			.addCase(verifyOtp.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
				const { id, name, phone, role } = action.payload;
				state.isLoading = false;
				state.id = id;
				state.name = name;
				state.phone = phone;
				state.role = role;
				state.isAuth = true;
			})
			.addCase(verifyOtp.rejected, state => {
				state.isLoading = false;
			});
	},
});

export const { setUser, logout } = userSlice.actions;
export const { selectUser } = userSlice.selectors;
export const userReducer = userSlice.reducer;

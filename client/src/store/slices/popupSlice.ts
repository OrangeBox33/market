import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PopupState {
	type: string | null; // например "login" | "cart" | null
}

const initialState: PopupState = { type: null };

export const popupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers: {
		openPopup: (state, action: PayloadAction<string>) => {
			state.type = action.payload;
		},
		closePopup: state => {
			state.type = null;
		},
	},
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;

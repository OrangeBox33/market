import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { detectDeviceType } from '@src/common/helpers/helpers';
import { TDeviceType } from '@src/common/types/settings';

interface SettingsState {
	deviceType: TDeviceType;
}

const initialState: SettingsState = {
	deviceType: detectDeviceType(),
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	selectors: {
		selectDevice: state => ({
			deviceType: state.deviceType,
			isMobile: state.deviceType === 'mobile',
		}),
	},
	reducers: {
		setDeviceType: (state, action: PayloadAction<TDeviceType>) => {
			state.deviceType = action.payload;
		},
	},
});

export const { setDeviceType } = settingsSlice.actions;
export const { selectDevice } = settingsSlice.selectors;
export const settingsReducer = settingsSlice.reducer;

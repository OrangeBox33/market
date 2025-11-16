import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { detectDeviceType } from '@src/utils/helpers/helpers';
import { TDeviceType } from '@src/utils/types/settings';

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

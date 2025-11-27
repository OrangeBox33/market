import { createContext } from 'react';
import { detectDeviceType } from '@src/common/helpers/helpers';

const deviceType = detectDeviceType();

export const defaultContext = {
	deviceType,
	isMobile: deviceType === 'mobile',
};

export const AppContext = createContext(defaultContext);

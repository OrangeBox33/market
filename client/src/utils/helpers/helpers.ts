import { TDeviceType } from '../types/settings';

export const isClient = () => typeof window !== 'undefined';

export const detectDeviceType = (): TDeviceType => {
	if (!isClient()) return 'desktop';

	if (window.innerWidth < 768) return 'mobile';
	if (window.innerWidth < 1024) return 'tablet';
	return 'desktop';
};

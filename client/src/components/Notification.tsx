import React, { useEffect } from 'react';
import { CloseButton, Container } from '../../ui/StyledNotification';

interface NotificationProps {
	message: string;
	type: 'success' | 'error';
	isVisible: boolean;
	onClose: () => void;
	duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
	message,
	type,
	isVisible,
	onClose,
	duration = 3000,
}) => {
	useEffect(() => {
		if (isVisible && duration > 0) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isVisible, duration, onClose]);

	if (!isVisible) return null;

	return (
		<Container type={type} isVisible={isVisible}>
			{message}
			<CloseButton onClick={onClose}>×</CloseButton>
		</Container>
	);
};

export default Notification;

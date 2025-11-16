import React, { useEffect } from 'react';
import { StyledCloseButton, StyledPopupContainer, StyledPopupOverlay } from './styled';

type PopupProps = {
	onClose: () => void;
	children: React.ReactNode;
};

export const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
	const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	return (
		<StyledPopupOverlay onClick={handleClickOutside}>
			<StyledPopupContainer>
				<StyledCloseButton onClick={onClose} aria-label="Закрыть">
					x
				</StyledCloseButton>
				{children}
			</StyledPopupContainer>
		</StyledPopupOverlay>
	);
};

import styled from 'styled-components';

export const StyledPopupOverlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

export const StyledPopupContainer = styled.div`
	background: white;
	border-radius: 12px;
	padding: 24px;
	max-width: 90%;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const StyledCloseButton = styled.button`
	position: absolute;
	top: 12px;
	right: 12px;
	background: transparent;
	border: none;
	font-size: 22px;
	line-height: 1;
	cursor: pointer;
	color: #555;

	&:hover {
		color: #000;
	}
`;

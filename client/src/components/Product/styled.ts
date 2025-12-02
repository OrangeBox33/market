import styled from 'styled-components';

export const StyledCarouselContainer = styled.div`
	position: relative;
	width: 100%;
`;

export const StyledCarouselWrapper = styled.div`
	position: relative;
	overflow: hidden;
	border-radius: 8px;
`;

export const StyledIndicators = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	margin-top: 12px;
`;

export const StyledIndicator = styled.button<{ isActive: boolean }>`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	border: none;
	background-color: ${props => (props.isActive ? '#6f5e4f' : '#d4d4d4')};
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${props => (props.isActive ? '#6f5e4f' : '#b4b4b4')};
	}
`;

export const StyledArrowButton = styled.button<{ direction: 'left' | 'right' }>`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	${props => (props.direction === 'left' ? 'left: 12px;' : 'right: 12px;')}
	background-color: rgba(255, 255, 255, 0.8);
	border: none;
	border-radius: 50%;
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 2;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

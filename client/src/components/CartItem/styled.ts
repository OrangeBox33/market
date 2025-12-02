import styled from 'styled-components';
import { Flexbox } from '../ui/Flexbox';
import { Image } from '../ui/Image';

export const StyledCartItemContainer = styled(Flexbox)`
	border: 1px solid #e0e0e0;
	border-radius: 12px;
	padding: 16px;
	gap: 16px;
	background: #ffffff;
`;

export const StyledProductInfo = styled(Flexbox)`
	flex: 1;
`;

export const StyledProductImage = styled(Image)`
	border-radius: 8px;
	object-fit: cover;
`;

export const StyledQuantityControls = styled(Flexbox)`
	align-items: center;
	gap: 12px;
`;

export const StyledQuantityButton = styled.button`
	width: 32px;
	height: 32px;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	background: #ffffff;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: #f5f5f5;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const StyledDeleteButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 8px;
	border-radius: 8px;

	&:hover {
		background: #ffebee;
	}
`;

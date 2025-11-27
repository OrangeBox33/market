import styled from 'styled-components';
import { Flexbox } from '../ui/Flexbox';
import { Icon } from '../ui/Icon';
import { colorMap } from '../ui/constants';

export const StyledContainer = styled.div`
	width: 100%;
	position: relative;
`;

export const StyledInput = styled.input<{ isSuggestion: boolean }>`
	width: 100%;
	height: 50px;
	padding: 0 48px 0 12px;
	box-sizing: border-box;
	border: none;
	border-radius: ${({ isSuggestion }) => (isSuggestion ? '8px 8px 0 0' : '8px')};
	color: ${colorMap.primary};
	font-size: 16px;
	&:focus {
		outline: none;
		box-shadow: inset 0 0 0 2px ${colorMap.secondary};
	}
`;

export const StyledIconContainer = styled(Flexbox)`
	position: absolute;
	top: 0;
	right: 12px;
	height: 100%;
	align-items: center;
`;

export const StyledSuggestions = styled(Flexbox)`
	position: absolute;
	width: 100%;
	margin-top: -2px;
	box-sizing: border-box;
	border: 2px solid ${colorMap.secondary};
`;

export const StyledSuggestionsItem = styled(Flexbox)`
	height: 40px;
	width: 100%;
	align-items: center;
	background-color: ${colorMap.white};
	padding: 0 12px;
	&:not(:last-child) {
		border-bottom: 1px solid ${colorMap.secondary};
	}
	&:last-child {
		border-radius: 0 0 8px 8px;
	}
`;

import styled from 'styled-components';
import { Flexbox } from '../ui/Flexbox';
import { colorMap } from '../ui/constants';

export const StyledContainer = styled(Flexbox)`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: ${colorMap.background};
	padding: 0 2vw;
	box-sizing: border-box;
`;

export const StyledItem = styled(Flexbox)`
	flex: 1;
	height: 100%;
`;

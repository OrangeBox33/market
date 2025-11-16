import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface GridProps {
	columns: number;
	rows: number;
	height?: string;
	width?: string;
	isFullHeight?: boolean;
	isFullWidth?: boolean;
	isEqualWidth?: boolean;
	isEqualHeight?: boolean;
	gap?: string;
	justifyContent?: string;
	alignItems?: string;
	placeItems?: string;
	children?: ReactNode;
}

const StyledGrid = styled.div<GridProps>`
	display: grid;
	grid-template-columns: ${({ columns, isEqualWidth }) =>
		isEqualWidth ? `repeat(${columns}, 1fr)` : `repeat(${columns}, auto)`};
	grid-template-rows: ${({ rows, isEqualHeight }) =>
		isEqualHeight ? `repeat(${rows}, 1fr)` : `repeat(${rows}, auto)`};
	height: ${({ isFullHeight, height }) => (isFullHeight ? '100%' : height || 'auto')};
	width: ${({ isFullWidth, width }) => (isFullWidth ? '100%' : width || 'auto')};
	gap: ${({ gap }) => gap || '0'};
	justify-content: ${({ justifyContent }) => justifyContent || 'stretch'};
	align-items: ${({ alignItems }) => alignItems || 'stretch'};
	place-items: ${({ placeItems }) => placeItems || 'unset'};
`;

export const Grid: React.FC<GridProps> = ({ children, ...props }) => {
	return <StyledGrid {...props}>{children}</StyledGrid>;
};

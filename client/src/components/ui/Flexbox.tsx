import React, { ReactNode } from 'react';
import styled from 'styled-components';

type FlexboxProps = {
	children: ReactNode;
	gap?: string;
	justifyContent?:
		| 'flex-start'
		| 'center'
		| 'flex-end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
	direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	isWrap?: boolean;
	isFullHeight?: boolean;
	className?: string;
};

const StyledFlexbox = styled.div<FlexboxProps>`
	display: flex;
	gap: ${({ gap }) => gap || '0'};
	justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
	align-items: ${({ alignItems }) => alignItems || 'stretch'};
	flex-direction: ${({ direction }) => direction || 'row'};
	flex-wrap: ${({ isWrap }) => (isWrap ? 'wrap' : 'nowrap')};
	height: ${({ isFullHeight }) => (isFullHeight ? '100%' : 'auto')};
`;

export const Flexbox: React.FC<FlexboxProps> = ({
	children,
	gap,
	justifyContent,
	alignItems,
	direction,
	isWrap,
	isFullHeight,
	className,
}) => {
	return (
		<StyledFlexbox
			gap={gap}
			justifyContent={justifyContent}
			alignItems={alignItems}
			direction={direction}
			isWrap={isWrap}
			isFullHeight={isFullHeight}
			className={className}
		>
			{children}
		</StyledFlexbox>
	);
};

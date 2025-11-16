import React, { JSX } from 'react';
import styled from 'styled-components';
import { TColors } from './types';
import { colorMap } from './constants';

type TextProps = {
	size?: string;
	textWeight?: string;
	tag?: keyof JSX.IntrinsicElements;
	color?: TColors;
	children: React.ReactNode;
	font?: 'bastionx' | 'helios';
	textAlign?: 'center' | 'left' | 'right';
	fontStyle?: 'italic';
	maxWidth?: number;
};

const fontMap = {
	bastionx: 'BastionX, sans-serif',
	helios: 'Helios, sans-serif',
};

const StyledText = styled.span<TextProps>`
	font-size: ${({ size }) => size || '16px'};
	font-weight: ${({ textWeight }) => textWeight || 'normal'};
	color: ${({ color }) => (color ? colorMap[color] : colorMap.primary)};
	font-family: ${({ font }) => (font ? fontMap[font] : 'inherit')};
	text-align: ${({ textAlign }) => textAlign};
	font-style: ${({ fontStyle }) => fontStyle};
	max-width: ${({ maxWidth }) => maxWidth !== undefined && `${maxWidth}px`};
	letter-spacing: 0%;
`;

export const Text: React.FC<TextProps> = ({
	size,
	textWeight,
	tag = 'span',
	color,
	font,
	children,
	textAlign,
	fontStyle,
	maxWidth,
}) => {
	const Component = tag as keyof JSX.IntrinsicElements;
	return (
		<StyledText
			as={Component}
			size={size}
			textWeight={textWeight}
			color={color}
			font={font}
			textAlign={textAlign}
			fontStyle={fontStyle}
			maxWidth={maxWidth}
		>
			{children}
		</StyledText>
	);
};

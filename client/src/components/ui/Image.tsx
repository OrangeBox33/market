import React from 'react';
import styled, { css } from 'styled-components';

type TImageProps = {
	src: string;
	width?: string | number; // можно '100%' или число
	height?: string | number;
	alt?: string;
	color?: string;
};

const StyledImageContainer = styled.div<{
	width?: string | number;
	height?: string | number;
}>`
	display: inline-block;
	overflow: hidden;

	${({ width }) =>
		width &&
		css`
			width: ${typeof width === 'number' ? `${width}px` : width};
		`}

	${({ height }) =>
		height &&
		css`
			height: ${typeof height === 'number' ? `${height}px` : height};
		`}
`;

const StyledImg = styled.img<{
	width?: string | number;
	height?: string | number;
}>`
	object-fit: contain;
	display: block;

	${({ width, height }) => {
		// Только ширина
		if (width && !height)
			return css`
				width: ${typeof width === 'number' ? `${width}px` : width};
				height: auto;
			`;

		// Только высота
		if (height && !width)
			return css`
				height: ${typeof height === 'number' ? `${height}px` : height};
				width: auto;
			`;

		// Оба размера — как раньше (contain)
		if (width && height)
			return css`
				width: 100%;
				height: 100%;
			`;

		// Если размеров нет — натуральный размер
		return css`
			width: auto;
			height: auto;
		`;
	}}
`;

export const Image: React.FC<TImageProps> = ({ src, width, height, alt = '', color }) => {
	return (
		<StyledImageContainer width={width} height={height}>
			<StyledImg src={src} alt={alt} width={width} height={height} color={color} />
		</StyledImageContainer>
	);
};

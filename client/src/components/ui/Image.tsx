import React from 'react';
import styled from 'styled-components';

type TImageProps = {
	src: string;
	width: number;
	height: number;
	alt?: string;
	color?: string;
};

const StyledImageContainer = styled.div<{ width: number; height: number }>`
	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
`;

const StyledImg = styled.img`
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	color: red;
`;

export const Image: React.FC<TImageProps> = ({ src, width, height, alt = '', color }) => {
	return (
		<StyledImageContainer width={width} height={height}>
			<StyledImg src={src} alt={alt} color={color} />
		</StyledImageContainer>
	);
};

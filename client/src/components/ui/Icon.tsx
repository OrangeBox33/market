import React from 'react';
import styled from 'styled-components';

type TIconProps = {
	SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	width: number;
	height: number;
	color: string;
	className?: string;
};

const StyledIconContainer = styled.div<{ width: number; height: number; color: string }>`
	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	color: ${({ color }) => color || 'red'};
`;

const StyledSVGWrapper = styled.div`
	width: 100%;
	height: 100%;
	svg {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}
`;

export const Icon: React.FC<TIconProps> = ({ SVG, width, height, color, className }) => {
	return (
		<StyledIconContainer width={width} height={height} color={color} className={className}>
			<StyledSVGWrapper>
				<SVG />
			</StyledSVGWrapper>
		</StyledIconContainer>
	);
};

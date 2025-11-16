import React, { ReactNode } from 'react';
import styled from 'styled-components';

type CircleProps = {
	children?: ReactNode;
};

const StyledCircle = styled.div`
	width: 68px;
	height: 68px;
	border: 1px solid #cc112c;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Circle: React.FC<CircleProps> = ({ children }) => {
	return <StyledCircle>{children}</StyledCircle>;
};

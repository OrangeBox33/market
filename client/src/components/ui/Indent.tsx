import React, { ReactNode } from 'react';
import styled from 'styled-components';

type IndentProps = {
	children: ReactNode;
	m?: number;
	mT?: number;
	mR?: number;
	mB?: number;
	mL?: number;
	p?: number;
	pT?: number;
	pR?: number;
	pB?: number;
	pL?: number;
	borderRadius?: number;
	maxWidth?: number;
	maxHeight?: number;
};

const StyledIndent = styled.div<IndentProps>`
	margin: ${({ m, mT, mR, mB, mL }) =>
		m !== undefined ? `${m}px` : `${mT || 0}px ${mR || 0}px ${mB || 0}px ${mL || 0}px`};
	padding: ${({ p, pT, pR, pB, pL }) =>
		p !== undefined ? `${p}px` : `${pT || 0}px ${pR || 0}px ${pB || 0}px ${pL || 0}px`};
	border-radius: ${({ borderRadius }) => (borderRadius !== undefined ? `${borderRadius}px` : '0')};
	max-width: ${({ maxWidth }) => maxWidth !== undefined && `${maxWidth}px`};
	max-height: ${({ maxHeight }) => maxHeight !== undefined && `${maxHeight}px`};
`;

export const Indent: React.FC<IndentProps> = ({
	children,
	m,
	mT,
	mR,
	mB,
	mL,
	p,
	pT,
	pR,
	pB,
	pL,
	maxWidth,
	maxHeight,
}) => {
	return (
		<StyledIndent
			m={m}
			mT={mT}
			mR={mR}
			mB={mB}
			mL={mL}
			p={p}
			pT={pT}
			pR={pR}
			pB={pB}
			pL={pL}
			maxWidth={maxWidth}
			maxHeight={maxHeight}
		>
			{children}
		</StyledIndent>
	);
};

import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import arrowRight from '../resources/icons/arrowRight.svg';
import { colorMap } from './constants';

// Типы пропсов компонента
type ButtonProps = {
	title?: string | ReactNode;
	withIcon?: boolean;
	theme?: 'primary' | 'secondary' | 'tertiary';
};

// Цвета для разных тем
const themeColors = {
	red: '#ff0000',
	white: '#ffffff',
	black: '#000000',
};

// Основной стиль кнопки
const ButtonBase = styled.button<ButtonProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	cursor: pointer;
	border-radius: 16px;
	padding-left: 30px;
	padding-right: 30px;
	padding-top: 20px;
	padding-bottom: 20px;
	font-size: 16px;
	font-weight: 600;
	height: 60px;
	gap: 44px;

	/* Определение размера кнопки */

	/* Темная иконка для черной кнопки */
	${({ theme }) =>
		theme === 'primary' &&
		css`
			background: ${colorMap.primary};
			color: white;
			/* &:hover {
				background-color: #cc0000;
			} */
		`}
	${({ theme }) =>
		theme === 'secondary' &&
		css`
			border: 1px solid #cc112c;
			color: #cc112c;
			border-radius: 8px;
			/* &:hover {
				background-color: #f2f2f2;
			} */
		`}
  ${({ theme }) =>
		theme === 'tertiary' &&
		css`
			border: 1px solid #2c2c2c;
			border-radius: 8px;
			color: #2c2c2c;
			/* &:hover {
				background-color: #333333;
			} */
		`}
`;

const Icon = styled.span`
	position: absolute;
	left: 10px;
	top: 50%;
	transform: translateY(-50%);
`;

export const Button: React.FC<ButtonProps> = ({ title, withIcon = false, theme = 'black' }) => {
	return (
		<ButtonBase theme={theme}>
			{title}
			{withIcon && <img src={arrowRight} />}
		</ButtonBase>
	);
};

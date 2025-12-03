import styled from 'styled-components';

export const StyledPaginationButton = styled.button<{ isActive?: boolean; isDisabled?: boolean }>`
	border: 1px solid #ddd;
	background-color: ${({ isDisabled, isActive }) => {
		if (isDisabled) return '#f5f5f5';
		if (isActive) return '#007bff';
		return 'white';
	}};
	color: ${({ isActive }) => (isActive ? 'white' : 'black')};
	cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
	border-radius: 4px;
	min-width: 40px;

	&:hover:not(:disabled) {
		background-color: ${({ isActive, isDisabled }) => {
			if (isDisabled) return '#f5f5f5';
			if (isActive) return '#0056b3';
			return '#f8f9fa';
		}};
	}
`;

export const StyledPageNumber = styled(StyledPaginationButton)``;
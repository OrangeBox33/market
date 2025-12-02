import styled from 'styled-components';
import { Flexbox } from '../ui/Flexbox';

export const StyledCartContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 24px;
`;

export const StyledCartHeader = styled(Flexbox)`
	margin-bottom: 24px;
`;

export const StyledCartItemsContainer = styled.div`
	margin-bottom: 24px;
`;

export const StyledEmptyCart = styled.div`
	text-align: center;
	padding: 48px;
`;

export const StyledCartSummary = styled(Flexbox)`
	border-top: 2px solid #e0e0e0;
	padding-top: 24px;
	margin-top: 24px;
`;

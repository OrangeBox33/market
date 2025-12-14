import styled from 'styled-components';

export const StyledImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBuyButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

export const StyledQuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

export const StyledQuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: 2px solid #007bff;
  background-color: white;
  color: #007bff;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #007bff;
    color: white;
  }

  &:active {
    background-color: #0056b3;
  }
`;

export const StyledQuantityDisplay = styled.div`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;
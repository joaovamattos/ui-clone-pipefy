import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 0 15px;
  min-height: 100%;
  flex: 0 0 320px;
  opacity: ${props => props.done ? 0.6 : 1};
  cursor: grab;
  border-left: 1px solid rgba(0, 0, 0, 0.05);

  :nth-child(1) {
    border-left: none;
  }

  ${props => props.isDragging && css`
    border: 2px dashed rgba(0, 0, 0, 0.2) !important;
    border-radius: 0;
    box-shadow: none;
    cursor: grabbing;

    header, ul {
      opacity: 0;
    }

  `}
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;      
    
    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
    }

    button {
      width: 42px;
      height: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  ul {
    margin-top: 30px;
  }
`;

export const NoCards = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #777;
`; 

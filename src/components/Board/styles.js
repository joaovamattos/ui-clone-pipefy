  import styled from 'styled-components';
  
  export const Container = styled.div`
    display: flex;
    width: 100%;
    overflow-x: scroll;
    padding: 30px 20px;
    min-height: calc(100% - 80px);
  `;
  
  
export const NewListButton = styled.button`
  padding: 0 15px;
  min-height: 100%;
  flex: 0 0 320px;
  border: 2px dashed rgba(0, 0, 0, 0.2) !important;
  border-radius: 0;
  box-shadow: none;  
  cursor: pointer;
  background: transparent;

  &:hover {
    padding-bottom: 40px;
    transition: .3s;
  }
`;


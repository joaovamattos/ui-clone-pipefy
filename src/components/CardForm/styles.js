import styled from 'styled-components';

export const Container = styled.div`
  width: 420px;
  height: 500px;
  
  position: fixed;
  bottom: 20px;
  overflow: hidden;
  border-radius: 4px;
  right: 20px;
  z-index: 10;
`;

export const Form = styled.form`
  background: #fff;
  border-top: 30px solid rgba(230, 246, 245,0.4);
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  height: 100%;

  display: flex;
  flex-direction: column;

  div {
    display: flex;
    margin: 0 20px;
  }
`;

export const Title = styled.h2`
  font-size: 30px;
  line-height: 35px;
  white-space: nowrap;
  font-weight: 500;
  color: #7159c1;
  margin: 20px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #101010;
  font-weight: bold;
  margin: 10px 20px;
`;


export const Input = styled.input`
  font-size: 12px;
  color: #404040;
  margin: 0 20px;
  margin-bottom: 10px;
  padding: 10px 5px;

  border-radius: 2px;
  border: 1px solid #ddd;
`;

export const TextArea = styled.textarea`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #404040;
  margin: 0 20px;
  margin-bottom: 10px;
  padding: 10px 5px;
  resize: none;

  border-radius: 2px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: #7159c1;
`;

export const ColorLabel = styled.label`
  background: ${props => props.color};
  border-radius: 2px;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);

  &:hover {
    transition:  .3s;
    transform: translateY(-4px);
  }

  border: ${props => (props.checked ? '2px solid #7159c1;' : 'none')}

  input {
    width: 30px;
    height: 30px;
    display: none;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  cursor: pointer;
`;
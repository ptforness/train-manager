import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column-reverse;
  font-size: 0.9rem;
  color: #b1b1b1;
  padding: 0 0 0 10px;
  vertical-align: bottom;

  @media screen and (min-width: 769px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const TextInput = styled.input`
  width: 100%;

  text-overflow: clip;
  color: ${props => (props.disabled ? '#202020' : '#636363')};
  background-color: transparent;

  border: 0;
  border-bottom: ${props => (props.disabled ? '0' : '2px solid #636363')};

  &:focus {
    outline: none;
    border-bottom: ${props => (props.disabled ? '0' : '2px solid #e68a00;')};
  }

  @media screen and (min-width: 769px) {
    height: 75%;
  }

  @media screen and (max-width: 768px) {
    height: 50%;
  }
`;

const StyledSpan = styled.span`
  height: 100%;
  padding: 0 30px;

  @media screen and (max-width: 769px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr;
    width: fit-content;
  }
`;

export const LabeledTextInput = ({ id, value, disabled, onChange, children }) => (
  <StyledSpan>
    <Label htmlFor={id}>{children}</Label>
    <TextInput id={id} name={id} value={value} onChange={onChange} disabled={disabled} />
  </StyledSpan>
);

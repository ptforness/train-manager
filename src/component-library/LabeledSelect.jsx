import styled from 'styled-components';

const Label = styled.label`
  color: #202020;
`;

const Select = styled.select`
  padding: 5px 10px 5px 10px;
`;

const StyledSpan = styled.span`
  display: flex;
  flex-direction: column;
  justify-items: end;
  width: 80%;
`;

export const LabeledSelect = ({ id, options, defaultValue, children, onChange }) => (
  <StyledSpan>
    <Label htmlFor={id}>{children}</Label>
    <Select id={id} name={id} defaultValue={defaultValue} onChange={onChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  </StyledSpan>
);

import styled from 'styled-components';

const StyledButton = styled.button`
  margin: auto;
  padding: 5px 10px 5px 10px;

  border: 0;
  border-radius: 3px;
  background: #e68a00;
  color: white;

  :hover {
    background: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    color: #e68a00;
  }
`;

const StyledCancelButton = styled(StyledButton)`
  background: lightgray;
  color: black;

  :hover {
    background: rgb(90, 0, 0);
    background: linear-gradient(5deg, rgba(90, 0, 0, 1) 35%, rgba(142, 12, 0, 1) 100%);
    color: white;
  }
`;

const StyledDeleteButton = styled(StyledButton)`
  background: rgb(90, 0, 0);
  background: linear-gradient(5deg, rgba(90, 0, 0, 1) 35%, rgba(142, 12, 0, 1) 100%);
  color: white;

  :hover {
    background: white;
    color: maroon;
  }
`;

export const Button = ({ onClick, children }) => <StyledButton onClick={onClick}>{children}</StyledButton>;

export const CancelButton = ({ onClick, children }) => (
  <StyledCancelButton onClick={onClick}>{children}</StyledCancelButton>
);

export const DeleteButton = ({ onClick, children }) => (
  <StyledDeleteButton onClick={onClick}>{children}</StyledDeleteButton>
);

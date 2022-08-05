import { useState } from 'react';
import styled from 'styled-components';
import { Button, CancelButton, DeleteButton } from './Button.jsx';
import { LabeledTextInput } from './LabeledTextInput.jsx';

const StyledLi = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr 1fr min-content;
  grid-gap: 10px;
  min-height: fit-content;
  min-width: fit-content;
  padding: 20px;

  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 15px;

  background-color: ${props => (props.disabled === true ? '#f2f2f2' : 'rgba(255, 255, 255, 0.01)')};

  transition: box-shadow 0.1s;

  input:not(:first-child) {
    padding-left: 10px;
  }

  input:is(:last-child) {
    padding-right: 10px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 2fr 1fr;
    align-self: center;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
`;

export const TrainRun = props => {
  const [newLine, setNewLine] = useState(props.line);
  const [newRoute, setNewRoute] = useState(props.route);
  const [newRunNumber, setNewRunNumber] = useState(props.runNumber);
  const [newOperatorId, setNewOperatorId] = useState(props.operatorId);

  const handleCancel = () => {
    console.log('canceled!');
    setNewLine(props.line);
    setNewRoute(props.route);
    setNewRunNumber(props.runNumber);
    setNewOperatorId(props.operatorId);
  };

  return (
    <StyledLi disabled={props.disabled}>
      <LabeledTextInput
        id="line"
        align="right"
        value={newLine}
        disabled={props.disabled}
        onChange={e => setNewLine(e.target.value)}
      >
        Line
      </LabeledTextInput>
      <LabeledTextInput
        id="route"
        value={newRoute}
        disabled={props.disabled}
        onChange={e => setNewRoute(e.target.value)}
      >
        Route
      </LabeledTextInput>
      <LabeledTextInput
        id="runNumber"
        value={newRunNumber}
        disabled={props.disabled}
        onChange={e => setNewRunNumber(e.target.value)}
      >
        Run&nbsp;Number
      </LabeledTextInput>
      <LabeledTextInput
        id="operatorId"
        value={newOperatorId}
        disabled={props.disabled}
        onChange={e => setNewOperatorId(e.target.value)}
      >
        Operator&nbsp;ID
      </LabeledTextInput>
      {props.disabled ? (
        <Button onClick={props.onEdit}>Edit</Button>
      ) : (
        <Button
          onClick={props.onSave({
            line: newLine,
            route: newRoute,
            runNumber: newRunNumber,
            operatorId: newOperatorId,
          })}
        >
          Save
        </Button>
      )}
      {props.disabled ? (
        <DeleteButton onClick={props.onDelete}>Delete</DeleteButton>
      ) : (
        <CancelButton onClick={props.onCancel(handleCancel)}>Cancel</CancelButton>
      )}
    </StyledLi>
  );
};

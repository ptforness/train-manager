import styled from 'styled-components';
import { Button } from './Button.jsx';
import { LabeledSelect } from './LabeledSelect.jsx';

const StyledSection = styled.section`
  padding-top: 10px;
  width: 100%;
  margin: auto;
  @media screen and (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-auto-flow: dense;
  }

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
  }
`;

export const TrainRunListHeader = ({
  sortField,
  sortDirection,
  limit,
  sortFields,
  setSortField,
  setSortDirection,
  setLimit,
  handlePrevious,
  handleNext,
  handleCreate,
}) => (
  <StyledSection>
    <Button onClick={handlePrevious}>Prev</Button>
    <Button onClick={handleNext}>Next</Button>
    <Button onClick={handleCreate}>New Run</Button>
    <LabeledSelect
      id="sortField"
      options={sortFields}
      defaultValue={sortField}
      onChange={e => setSortField(e.target.value)}
    >
      Sort
    </LabeledSelect>
    <LabeledSelect
      id="sortDirection"
      options={['ASC', 'DESC']}
      defaultValue={sortDirection}
      onChange={e => setSortDirection(e.target.value)}
    >
      {' '}
      Direction
    </LabeledSelect>
    <LabeledSelect id="limit" defaultValue={limit} options={[5, 10, 25, 100]} onChange={e => setLimit(e.target.value)}>
      Limit
    </LabeledSelect>
  </StyledSection>
);

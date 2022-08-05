import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSemiPersistentState } from '../hooks/useSemiPersistentState.jsx';
import { Button } from './Button.jsx';
import { LabeledSelect } from './LabeledSelect.jsx';
import { TrainRun } from './TrainRun.jsx';
import { TrainRunListHeader } from './TrainRunListHeader.jsx';

const StyledSection = styled.section`
  margin: auto;
  width: 80%;
`;

const StyledUl = styled.ul`
  padding: 0;
  
  // List gap
  li:not(:first-child) {
    margin-top: 20px;
  }
`;

const comparator = (prop, direction) => (a, b) => {
  if (a == undefined || b == undefined || a[prop] == undefined || b[prop] == undefined) return 0; // Ignore undefined/null
  return direction === 'ASC' ? a[prop].localeCompare(b[prop]) : b[prop].localeCompare(a[prop]);
};

export const TrainRunList = ({ list }) => {
  const [limit, setLimit] = useSemiPersistentState('limit', 5);
  const [offset, setOffset] = useSemiPersistentState('offset', 0);
  const [sortField, setSortField] = useSemiPersistentState('sortField', 'runNumber');
  const [data, setData] = useSemiPersistentState('trainRunData', list);
  const [displayData, setDisplayData] = useState(
    [...data].sort(comparator(sortField)).slice(offset, Math.min(offset + limit, data.length)),
  );
  const [fields, setFields] = useState(['line', 'route', 'runNumber', 'operatorId']);
  const [sortDirection, setSortDirection] = useSemiPersistentState('sortDirection', 'ASC');

  const [enabled, setEnabled] = useState(
    Object.fromEntries(
      data.map(trainRun => {
        return { [trainRun.id]: false };
      }),
    ),
  );

  const handleCancel = key => cb => () => {
    cb();
    setEnabled(prev => {
      return {
        ...prev,
        [key]: false,
      };
    });
  };

  const handleDelete = key => () => setData(data.filter(trainRun => trainRun.key != key));

  const handleSave = key => edits => () => {
    // Handle post to DB here

    // Toggle Edit/Save Button
    setEnabled(prev => {
      return {
        ...prev,
        [key]: false,
      };
    });

    const updatedData = data.map(trainRun => {
      if (trainRun.key === key) {
        return {
          ...trainRun,
          ...edits,
        };
      }

      return trainRun;
    });

    setData(updatedData);
  };

  const handleEdit = key => () => {
    // Toggle Edit/Save Button
    setEnabled(prev => {
      return {
        ...prev,
        [key]: true,
      };
    });
  };

  const handleCreate = () => {
    // In a DB scenario, grab max ID in separate query or generate a UUID to prevent collision
    const ids = data.map(trainRun => trainRun.key);
    const maxKey = Math.max(...ids);
    const newKey = maxKey + 1;

    setEnabled(prev => {
      return {
        ...prev,
        [newKey]: true,
      };
    });

    setData(prev => {
      return [
        {
          key: newKey,
        },
        ...prev,
      ];
    });

    // Math is off a bit here, works for first 2 pages and then is incorrect
    setOffset(0);
  };

  const handleNext = () => {
    if (offset + limit >= data.length && data.length % limit === 0) {
      return;
    } else if (offset + limit >= data.length && data.length % limit !== 0) {
      setOffset(data.length - (data.length % limit));
    } else {
      setOffset(offset + limit);
    }
  };

  const handlePrevious = () => {
    if (offset - limit <= 0) {
      setOffset(0);
    } else {
      setOffset(offset - limit);
    }
    setOffset(Math.max(offset - limit, 0));
  };

  useEffect(() => {
    // 1) Used [...data] because sort mutates the array
    // 2) Filtering first would be more efficient, but would be inaccurate. In a scenario with a backend + DB, I'd use a query builder here to manage sort/limit/offset
    setDisplayData(
      [...data].sort(comparator(sortField, sortDirection)).slice(offset, Math.min(offset + limit, data.length)),
    );
  }, [data, sortDirection, sortField, offset, limit]);

  return (
    <StyledSection>
      <TrainRunListHeader
        sortField={sortField}
        sortDirection={sortDirection}
        limit={limit}
        sortFields={fields}
        setSortField={setSortField}
        setSortDirection={setSortDirection}
        setLimit={setLimit}
        handleCreate={handleCreate}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
      <StyledUl>
        {displayData.map(({ key, ...display }) => (
          <TrainRun
            onCancel={handleCancel(key)}
            onDelete={handleDelete(key)}
            onEdit={handleEdit(key)}
            onSave={handleSave(key)}
            disabled={!enabled[key]}
            key={key}
            {...display}
          ></TrainRun>
        ))}
      </StyledUl>
    </StyledSection>
  );
};

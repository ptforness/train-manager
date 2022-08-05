import { useState } from 'react';
import { TrainRunList } from './component-library/TrainRunList.jsx';

function App() {
  const [trainRunData, setTrainRunData] = useState([
    {
      key: 1,
      line: 'El',
      route: 'Brown Line',
      runNumber: 'E102',
      operatorId: 'SJones',
    },
    {
      key: 2,
      line: 'Metra',
      route: 'UPN',
      runNumber: 'M405',
      operatorId: 'AJohnson',
    },
    {
      key: 3,
      line: 'Metra',
      route: 'UPN',
      runNumber: 'M511',
      operatorId: 'YSmith',
    },
    {
      key: 4,
      line: 'Amtrak',
      route: 'Hiawatha',
      runNumber: 'A006',
      operatorId: 'LBeck',
    },
    {
      key: 5,
      line: 'El',
      route: 'Red Line',
      runNumber: 'E432',
      operatorId: 'LHill',
    },
    {
      key: 6,
      line: 'Amtrak',
      route: 'Hiawatha',
      runNumber: 'A005',
      operatorId: 'LBeck',
    },
  ]);

  return (
    <div className="App">
      <TrainRunList list={trainRunData} />
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import Button from './Button';
import { useStateValue } from '../store';

const App = () => {
  const [state] = useStateValue();
  useEffect(() => {
    console.log('rerender');
  });
  return (
    <div className="App" style={{ backgroundColor: state.theme.primary }}>
      {console.log(state)}
      <Button />
    </div>
  );
};

export default App;

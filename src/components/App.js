import React, { useEffect } from 'react';
import DrawerForm from './Form/DrawerForm';
import { useStateValue } from '../store';

const App = () => {
  const [state] = useStateValue();
  useEffect(() => {
    console.log('rerender');
  });
  return (
    <div className="App">
      <DrawerForm />
    </div>
  );
};

export default App;

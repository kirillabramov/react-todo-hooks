import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DrawerForm from './Form/DrawerForm';

const App = _ => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            style={{ marginRight: '10px', outline: 0 }}
            onClick={() => {
              setIsDrawerOpen(!isDrawerOpen);
            }}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Список задач
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerForm isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </>
  );
};

export default App;

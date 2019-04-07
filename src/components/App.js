import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DrawerForm from './Form/DrawerForm';
import TaskTable from './TaskTable';
import { useStateValue } from '../store';
import { openDrawer, handleFormEdit, hideFields } from '../actions';

const App = _ => {
  const [, dispatch] = useStateValue();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            style={{ marginRight: '10px', outline: 0 }}
            onClick={() => {
              handleFormEdit(dispatch, false);
              openDrawer(dispatch, true);
              hideFields(dispatch, true);
            }}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Список задач
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerForm />
      <TaskTable />
    </>
  );
};

export default App;

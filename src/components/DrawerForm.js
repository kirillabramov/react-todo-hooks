import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  buttons: {
    '&:focus': {
      outline: 'none'
    }
  }
};

const DrawerForm = ({ classes }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="div">
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        anchor="right"
        margin="normal"
      >
        <TextField variant="outlined" placeholder="Add todo" margin="normal" />
      </Drawer>
      <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />

      <Button
        color="default"
        variant="outlined"
        className={classes.buttons}
        onClick={() => {
          console.log(isDrawerOpen);
          setIsDrawerOpen(!isDrawerOpen);
        }}
      >
        Добавить задачу
      </Button>
    </div>
  );
};

export default withStyles(styles)(DrawerForm);

DrawerForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

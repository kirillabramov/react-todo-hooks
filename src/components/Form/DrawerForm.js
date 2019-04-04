import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import RadioButtons from './RadioButtons';
import FormSelect from './FormSelect';
import Autosuggestion from './Autosuggestion';

const styles = {
  buttons: {
    marginRight: '15px',
    '&:focus': {
      outline: 'none'
    },
    '&:last-child': {
      marginRight: '0'
    }
  },
  wrapper: {
    padding: '0 25px',
    display: 'flex',
    flexDirection: 'column'
  },
  titleMargin: {
    marginBottom: '25px'
  },
  buttonWrapper: {
    display: 'flex',
    marginTop: '16px',
    position: 'absolute',
    bottom: '50px'
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '320px',
    overflow: 'scroll',
    padding: '50px 0'
  },
  snackBar: {
    position: 'absolute',
    left: '-50px'
  }
};

const DrawerForm = ({ classes }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const snackBarAction = (
    <div>
      <Button className={classes.buttons} variant="outlined" color="secondary" size="small">
        Продолжить
      </Button>
      <Button className={classes.buttons} variant="outlined" color="primary" size="small">
        Назад
      </Button>
    </div>
  );
  return (
    <div className="div">
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} anchor="right">
        <div className={classes.wrapper}>
          <h1 className={classes.titleMargin}>Новая задача</h1>
          <div className={classes.drawerContent}>
            <TextField size="small" variant="outlined" label="Название задачи">
              <Input />
            </TextField>
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              multiline={true}
              label="Описание задачи"
            >
              <Input />
            </TextField>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker value={selectedDate} onChange={handleDateChange} margin="normal" />
            </MuiPickersUtilsProvider>
            <RadioButtons />
            <FormSelect />
            <Autosuggestion />
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              variant="contained"
              className={classes.buttons}
              onClick={() => {}}
            >
              Сохранить
            </Button>
            <Button
              color="secondary"
              variant="contained"
              className={classes.buttons}
              onClick={() => {}}
            >
              Отмена
            </Button>
          </div>
        </div>
        <SnackBar
          variant="warning"
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
        >
          <SnackbarContent
            message="This is a warning message!"
            open={true}
            action={snackBarAction}
          />
        </SnackBar>
      </Drawer>

      <Button
        color="default"
        variant="outlined"
        className={classes.buttons}
        onClick={() => {
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

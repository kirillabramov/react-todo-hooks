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

const DrawerForm = ({ classes, setIsDrawerOpen, isDrawerOpen }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [hiddenFields, setHiddenFields] = useState(true);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleSnackbarBack = _ => {
    setShowSnackbar(false);
  };
  const handleSnackContinue = _ => {
    setIsDrawerOpen(false);
    setShowSnackbar(false);
  };

  const snackBarAction = (
    <div>
      <Button
        onClick={_ => handleSnackContinue()}
        className={classes.buttons}
        variant="text"
        color="secondary"
        size="small"
      >
        Продолжить
      </Button>
      <Button
        onClick={_ => handleSnackbarBack()}
        className={classes.buttons}
        variant="text"
        style={{ color: '#fff' }}
        size="small"
      >
        Назад
      </Button>
    </div>
  );
  const handleDrawer = _ => {
    setShowSnackbar(true);
  };
  const handleDate = date => {
    handleDateChange(date);
    setHiddenFields(false);
  };
  return (
    <div className="div">
      <Drawer open={isDrawerOpen} onClose={_ => handleDrawer()} anchor="right">
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
              <DatePicker value={selectedDate} onChange={handleDate} margin="normal" />
            </MuiPickersUtilsProvider>
            <div
              className="hidden-fields"
              style={{ display: hiddenFields ? 'none' : 'flex', flexDirection: 'column' }}
            >
              <RadioButtons />
              <FormSelect />
              <Autosuggestion />
            </div>
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
          open={showSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => {
            setShowSnackbar(false);
          }}
        >
          <SnackbarContent
            message="Кажется вы забыли сохранить задачу..."
            action={snackBarAction}
            style={{ backgroundColor: '#ffa000' }}
          />
        </SnackBar>
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(DrawerForm);

DrawerForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  setIsDrawerOpen: PropTypes.func,
  isDrawerOpen: PropTypes.bool
};
DrawerForm.defaultProps = {
  setIsDrawerOpen: () => {},
  isDrawerOpen: false
};

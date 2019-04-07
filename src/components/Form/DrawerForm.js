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
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioButtons from './RadioButtons';
import FormSelect from './FormSelect';
import Autosuggestion from './Autosuggestion';
import { useStateValue } from '../../store';
import { addTask, openDrawer, handleFormFields, editTask, hideFields } from '../../actions';

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
    height: '540px',
    overflow: 'scroll',
    padding: '50px 0'
  },
  snackBar: {
    position: 'absolute',
    left: '-50px'
  }
};

const DrawerForm = ({ classes }) => {
  const [state, dispatch] = useStateValue();
  const [isSnackbarVisible, setShowSnackbar] = useState(false);
  const [isErrorSnackbarVisible, setErrorShowSnackbar] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const handleSnackbarBack = _ => {
    setShowSnackbar(false);
  };
  const handleExitModal = _ => {
    openDrawer(dispatch, false);
    setShowSnackbar(false);
  };
  const resetForm = () => {
    handleFormFields(dispatch, { field: 'status', value: '' });
    handleFormFields(dispatch, { field: 'id', value: null });
    handleFormFields(dispatch, { field: 'name', value: '' });
    handleFormFields(dispatch, { field: 'description', value: '' });
    handleFormFields(dispatch, { field: 'tag', value: '' });
    handleFormFields(dispatch, { field: 'date', value: new Date() });
    handleFormFields(dispatch, { field: 'important', value: '' });
  };
  const snackBarAction = (
    <div>
      <Button
        onClick={_ => handleExitModal()}
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
  const showSnackbar = _ => {
    setShowSnackbar(true);
  };
  const handleDate = date => {
    handleFormFields(dispatch, { field: 'date', value: date });
    if (state.isHidden) hideFields(dispatch, false);
  };
  const handleSaveTask = _ => {
    const { id, name, description, date: selectedDate, status, important, tag } = state.formFields;

    if (name.length === 0) {
      setErrorShowSnackbar(true);
      return;
    }
    setLoader(true);

    setTimeout(() => {
      handleExitModal();

      const dateFormat = new Date(selectedDate).toGMTString().split(' ');
      const task = {
        id,
        name,
        description,
        date: `${dateFormat[2]}-${dateFormat[1]}-${dateFormat[3]}`,
        status,
        important,
        tag
      };
      if (state.isEdit) {
        editTask(dispatch, task);
      } else {
        addTask(dispatch, task);
      }
      resetForm();
      setLoader(false);
    }, 2000);
  };

  return (
    <div className="div">
      <Drawer open={state.isDrawerOpen} onClose={_ => showSnackbar()} anchor="right">
        {isLoader ? (
          <CircularProgress style={{ margin: '100px' }} />
        ) : (
          <div className={classes.wrapper}>
            <h1 className={classes.titleMargin}>Новая задача</h1>
            <div className={classes.drawerContent}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  label="Название задачи"
                  onChange={e =>
                    handleFormFields(dispatch, { field: 'name', value: e.target.value })
                  }
                  style={{ width: state.isHidden ? '200px' : '93%' }}
                  value={state.formFields.name}
                >
                  <Input />
                </TextField>
                <Icon style={{ order: '-1', color: '#303f9f' }}>create</Icon>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  margin="normal"
                  multiline={true}
                  label="Описание задачи"
                  onChange={e =>
                    handleFormFields(dispatch, { field: 'description', value: e.target.value })
                  }
                  style={{ width: state.isHidden ? '200px' : '93%' }}
                  value={state.formFields.description}
                >
                  <Input />
                </TextField>
                <Icon style={{ order: '-1', color: '#303f9f' }}>assignment</Icon>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    value={state.formFields.date}
                    style={{ width: state.isHidden ? '200px' : '93%' }}
                    onChange={handleDate}
                    margin="normal"
                  />
                </MuiPickersUtilsProvider>
                <Icon style={{ order: '-1', color: '#303f9f' }}>date_range</Icon>
              </div>
              <div
                className="hidden-fields"
                style={{ display: state.isHidden ? 'none' : 'flex', flexDirection: 'column' }}
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
                onClick={handleSaveTask}
              >
                Сохранить
              </Button>
              <Button
                color="secondary"
                variant="contained"
                className={classes.buttons}
                onClick={() => {
                  openDrawer(dispatch, false);
                  resetForm();
                }}
              >
                Отмена
              </Button>
            </div>
          </div>
        )}

        <SnackBar
          variant="warning"
          open={isSnackbarVisible}
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

        <SnackBar
          variant="error"
          open={isErrorSnackbarVisible}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          onClose={() => {
            setErrorShowSnackbar(false);
          }}
        >
          <SnackbarContent
            message="Заполните название задачи"
            style={{ backgroundColor: '#d32f2f' }}
          />
        </SnackBar>
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(DrawerForm);

DrawerForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
  // setIsDrawerOpen: PropTypes.func,
  // isDrawerOpen: PropTypes.bool
};
// DrawerForm.defaultProps = {
//   setIsDrawerOpen: () => {},
//   isDrawerOpen: false
// };

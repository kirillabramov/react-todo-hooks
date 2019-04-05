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
import { useStateValue } from '../../store';
import { addTask } from '../../actions';

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
let id = 3;

const DrawerForm = ({ classes, setIsDrawerOpen, isDrawerOpen }) => {
  const [state, dispatch] = useStateValue();
  const [isSnackbarVisible, setShowSnackbar] = useState(false);
  const [isErrorSnackbarVisible, setErrorShowSnackbar] = useState(false);
  const [hiddenFields, setHiddenFields] = useState(true);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [status, setStatus] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [suggestions, setSuggestion] = useState([
    { label: 'тег0' },
    { label: 'тег1' },
    { label: 'тег2' },
    { label: 'тег3' }
  ]);
  const [single, setSingle] = useState('');
  const [taskTime, setTasksTime] = useState('');
  const handleSnackbarBack = _ => {
    setShowSnackbar(false);
  };
  const handleExitModal = _ => {
    setIsDrawerOpen(false);
    setShowSnackbar(false);
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
    handleDateChange(date);
    if (hiddenFields) setHiddenFields(false);
  };
  const handleSaveTask = _ => {
    if (name.length === 0) {
      setErrorShowSnackbar(true);
      return;
    }
    id += 1;
    const dateFormat = new Date(selectedDate).toGMTString().split(' ');
    const task = {
      id,
      name,
      description,
      date: `${dateFormat[2]}-${dateFormat[1]}-${dateFormat[3]}`,
      status,
      important: taskTime,
      tag: single
    };
    addTask(dispatch, task);
  };
  return (
    <div className="div">
      <Drawer open={isDrawerOpen} onClose={_ => showSnackbar()} anchor="right">
        <div className={classes.wrapper}>
          <h1 className={classes.titleMargin}>Новая задача</h1>
          <div className={classes.drawerContent}>
            <TextField
              size="small"
              variant="outlined"
              label="Название задачи"
              onChange={e => setName(e.target.value)}
            >
              <Input />
            </TextField>
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              multiline={true}
              label="Описание задачи"
              onChange={e => setDescription(e.target.value)}
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
              <RadioButtons task={taskTime} setTasks={setTasksTime} />
              <FormSelect status={status} setStatus={setStatus} />
              <Autosuggestion
                suggestions={suggestions}
                setSuggestion={setSuggestion}
                single={single}
                setSingle={setSingle}
              />
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
              onClick={() => setIsDrawerOpen(false)}
            >
              Отмена
            </Button>
          </div>
        </div>
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
  classes: PropTypes.instanceOf(Object).isRequired,
  setIsDrawerOpen: PropTypes.func,
  isDrawerOpen: PropTypes.bool
};
DrawerForm.defaultProps = {
  setIsDrawerOpen: () => {},
  isDrawerOpen: false
};

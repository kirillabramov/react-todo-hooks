import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStateValue } from '../store';
import {
  editStatus,
  removeTask,
  openDrawer,
  handleFormFields,
  handleFormEdit,
  hideFields
} from '../actions';
import '../main.scss';

const TaskTable = _ => {
  const [statusVal, setStatusVal] = useState(null);
  const [openedId, setOpenedId] = useState(null);
  const [state, dispatch] = useStateValue();
  const [isLoader, setLoader] = useState(false);

  const options = ['Выполняется', 'На потом', 'Выполнена'];
  const open = Boolean(statusVal);

  const handleEdit = (id, status) => () => {
    setOpenedId(null);
    editStatus(dispatch, { id, status });
  };

  const createOpenMenu = (e, taskId) => {
    setOpenedId(taskId);
    setStatusVal(e.currentTarget);
  };
  const handleRemoveTask = id => {
    setLoader(true);
    setTimeout(() => {
      removeTask(dispatch, id);
      setLoader(false);
    }, 2000);
  };
  const handleEditTask = idx => {
    const { id, status, name, description, tag, date, important } = state.tasks[idx];
    handleFormEdit(dispatch, true);
    hideFields(dispatch, false);
    handleFormFields(dispatch, { field: 'status', value: status });
    handleFormFields(dispatch, { field: 'id', value: id });
    handleFormFields(dispatch, { field: 'name', value: name });
    handleFormFields(dispatch, { field: 'description', value: description });
    handleFormFields(dispatch, { field: 'tag', value: tag });
    handleFormFields(dispatch, { field: 'date', value: date });
    handleFormFields(dispatch, { field: 'important', value: important });
    openDrawer(dispatch, true);
  };

  return (
    <>
      <Paper>
        {isLoader ? (
          <CircularProgress style={{ margin: '50px auto', position: 'absolute', left: '50%' }} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID задачи</TableCell>
                <TableCell align="right">Статус</TableCell>
                <TableCell align="right">Название задачи</TableCell>
                <TableCell align="right">Описание задачи</TableCell>
                <TableCell align="right">Дата выполнения</TableCell>
                <TableCell align="right">Важность</TableCell>
                <TableCell align="right">Тег</TableCell>
                <TableCell align="right">Действие</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.values(state.tasks).map((task, idx) => (
                <TableRow key={task.id} className="table-row">
                  <TableCell component="th" scope="row">
                    {task.id}
                  </TableCell>
                  <TableCell align="right">
                    {task.status}
                    <IconButton
                      aria-label="More"
                      aria-owns={open ? `long-menu${idx}` : undefined}
                      aria-haspopup="true"
                      onClick={e => createOpenMenu(e, task.id)}
                      style={{ outline: 0 }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id={`long-menu${idx}`}
                      className="hello"
                      anchorEl={statusVal}
                      open={task.id === openedId}
                      onClose={e => {
                        setOpenedId(null);
                      }}
                    >
                      {options.map(option => (
                        <MenuItem
                          key={option}
                          onClick={handleEdit(task.id, option)}
                          data-value={option}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                  <TableCell align="right">{task.name}</TableCell>
                  <TableCell align="right">{task.description}</TableCell>
                  <TableCell align="right">{task.date}</TableCell>
                  <TableCell align="right">{task.important}</TableCell>
                  <TableCell align="right">{task.tag}</TableCell>
                  <TableCell align="right" className="table-row--hidden">
                    <IconButton
                      onClick={() => handleEditTask(task.id)}
                      aria-label="Edit"
                      color="primary"
                      style={{ outline: 0 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveTask(task.id)}
                      aria-label="Delete"
                      color="secondary"
                      style={{ outline: 0 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </>
  );
};

export default TaskTable;

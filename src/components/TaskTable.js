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
import { useStateValue } from '../store';
import { editStatus } from '../actions';

const TaskTable = _ => {
  const [statusVal, setStatusVal] = useState(null);
  const [openedId, setOpenedId] = useState(null);
  const [state, dispatch] = useStateValue();
  const buttons = (
    <>
      <IconButton aria-label="Delete" color="primary" style={{ outline: 0 }}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Delete" color="secondary" style={{ outline: 0 }}>
        <DeleteIcon />
      </IconButton>
    </>
  );

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

  return (
    <>
      <Paper>
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
            {state.tasks.map((task, idx) => (
              <TableRow key={task.id}>
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
                    id="long-menu"
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
                <TableCell align="right">{buttons}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default TaskTable;

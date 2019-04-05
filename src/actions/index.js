import { ADD_TASK, EDIT_STATUS } from './types';

const addTask = (dispatch, task) => {
  dispatch({
    type: ADD_TASK,
    payload: task
  });
};

const editStatus = (dispatch, payload) => {
  dispatch({
    type: EDIT_STATUS,
    payload
  });
};

export { addTask, editStatus };

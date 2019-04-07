import {
  ADD_TASK,
  EDIT_STATUS,
  REMOVE_TASK,
  OPEN_DRAWER,
  HANDLE_FORM_FIELDS,
  HANDLE_FORM_IS_EDIT,
  HANDLE_FORM_EDIT,
  HIDE_FIELDS
} from './types';

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

const removeTask = (dispatch, id) => {
  dispatch({
    type: REMOVE_TASK,
    payload: id
  });
};

const openDrawer = (dispatch, isOpen) => {
  dispatch({
    type: OPEN_DRAWER,
    payload: isOpen
  });
};

const handleFormFields = (dispatch, field) => {
  dispatch({
    type: HANDLE_FORM_FIELDS,
    payload: field
  });
};

const handleFormEdit = (dispatch, isEdit) => {
  dispatch({
    type: HANDLE_FORM_IS_EDIT,
    payload: isEdit
  });
};

const editTask = (dispatch, task) => {
  dispatch({
    type: HANDLE_FORM_EDIT,
    payload: task
  });
};

const hideFields = (dispatch, payload) => {
  dispatch({
    type: HIDE_FIELDS,
    payload
  });
};
export {
  addTask,
  editStatus,
  removeTask,
  openDrawer,
  handleFormFields,
  handleFormEdit,
  editTask,
  hideFields
};

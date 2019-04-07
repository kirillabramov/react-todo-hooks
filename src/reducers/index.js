import * as R from 'ramda';
import {
  ADD_TASK,
  EDIT_STATUS,
  REMOVE_TASK,
  OPEN_DRAWER,
  HANDLE_FORM_FIELDS,
  HANDLE_FORM_IS_EDIT,
  HANDLE_FORM_EDIT,
  HIDE_FIELDS
} from '../actions/types';

const initialState = {
  tasks: {
    1: {
      id: 1,
      name: 'Task 1',
      status: 'Выполняется',
      description: 'Description 1',
      date: 'Apr-07-2019',
      important: 'Срочная важная',
      tag: 'тег0'
    },
    2: {
      id: 2,
      name: 'Task 3',
      status: 'На потом',
      description: 'Description 3',
      date: 'Apr-07-2019',
      important: 'Срочная неважная',
      tag: 'тег1'
    }
  },
  formFields: {
    id: null,
    name: '',
    status: '',
    description: '',
    date: new Date(),
    important: '',
    tag: ''
  },
  isDrawerOpen: false,
  isEdit: false,
  isHidden: true
};
const createIncrement = (counter = 3) => () => counter++;
const getId = createIncrement();
const addTask = ({ id, status, name, description, date, important, tag }, state) => {
  const newId = getId();
  const newTask = {
    id: newId,
    name,
    status,
    description,
    date,
    important,
    tag
  };
  const newState = R.assocPath(['tasks', newId], newTask, state);

  return { ...newState };
};
let newState = '';
const editTask = ({ id, status, name, description, date, important, tag }, state) => {
  Object.keys(state.tasks).map(key => {
    if (+key === +id) {
      const transformations = {
        id,
        name,
        status,
        description,
        date,
        important,
        tag
      };
      const merged = R.merge(state.tasks[key], transformations);
      newState = R.assocPath(['tasks', id], merged, state);
    }
  });
  return { ...newState };
};

const setField = (field, value, state) => {
  return R.assocPath(['formFields', field], value, state);
};
const reducer = (state, { type, payload }) => {
  const editedStatus = payload.status;
  const newStateWithEditedOption = R.assocPath(
    ['tasks', payload.id, 'status'],
    editedStatus,
    state
  );
  switch (type) {
    case ADD_TASK:
      return addTask(payload, state);
    case EDIT_STATUS:
      return {
        ...newStateWithEditedOption
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: R.dissoc(payload, { ...state.tasks })
      };
    case OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpen: payload
      };
    case HANDLE_FORM_FIELDS:
      return setField(payload.field, payload.value, state);
    case HANDLE_FORM_IS_EDIT:
      return {
        ...state,
        isEdit: payload
      };
    case HANDLE_FORM_EDIT:
      return editTask(payload, state);
    case HIDE_FIELDS:
      return {
        ...state,
        isHidden: payload
      };
    default:
      return state;
  }
};

export { reducer, initialState };

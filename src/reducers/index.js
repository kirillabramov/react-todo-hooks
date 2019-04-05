import { ADD_TASK, EDIT_STATUS } from '../actions/types';

const initialState = {
  tasks: [
    {
      id: '1',
      name: 'Task 1',
      status: 'Status 1',
      description: 'Description 1',
      date: 'Apr-05-2019',
      important: 'important',
      tag: 'tag1'
    },
    {
      id: '5',
      name: 'Task 3',
      status: 'Status 3',
      description: 'Description 3',
      date: 'Apr-05-2019',
      important: 'important',
      tag: 'tag1'
    }
  ],
  form: {
    id: '',
    name: '',
    status: '',
    description: '',
    date: '',
    important: '',
    tag: ''
  }
};
const reducer = (state, { type, payload }) => {
  const editTask = state.tasks.filter(task => task.id === payload.id);
  const editStatus = payload.status;

  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload]
      };
    case EDIT_STATUS:
      editTask[0].status = editStatus;

      return {
        ...state,
        tasks: [.ы, ...editTask]
      };

    default:
      return state;
  }
};

export { reducer, initialState };

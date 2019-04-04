import { CHANGE_COLOR } from './types';

const changeColor = dispatch => {
  dispatch({
    type: CHANGE_COLOR,
    payload: { primary: 'blue' }
  });
};

export { changeColor };

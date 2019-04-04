import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { CHANGE_COLOR } from './actions/types';

const initialState = {
  theme: { primary: 'green' }
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_COLOR:
      return {
        ...state,
        theme: payload
      };

    default:
      return state;
  }
};

const StateContext = createContext();
const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
const useStateValue = () => useContext(StateContext);

StateProvider.propTypes = {
  // reducer: PropTypes.instanceOf(Object),
  // initialState: PropTypes.instanceOf(Object),
  children: PropTypes.instanceOf(Object).isRequired
};

// StateProvider.defaultProps = {
//   reducer: {},
//   initialState: []
// };
export { useStateValue, StateContext, StateProvider };

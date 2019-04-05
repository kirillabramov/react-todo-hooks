import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer, initialState } from './reducers';

const StateContext = createContext();
const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
const useStateValue = () => useContext(StateContext);

StateProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired
};

export { useStateValue, StateContext, StateProvider };

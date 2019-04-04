import React from 'react';
import { useStateValue } from '../store';
import { changeColor } from '../actions';

const Button = () => {
  const [, dispatch] = useStateValue();

  return (
    <button
      type="button"
      className="click"
      onClick={() => {
        changeColor(dispatch);
      }}
    >
      Click me
    </button>
  );
};

export default Button;

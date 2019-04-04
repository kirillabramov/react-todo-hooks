import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RadioButtons = _ => {
  const [task, setTasks] = useState('Срочная важная');
  return (
    <RadioGroup
      aria-label="position"
      name="position"
      value={task}
      onChange={e => {
        setTasks(e.target.value);
      }}
      row
      margin="normal"
    >
      <FormControlLabel
        value="Срочная важная"
        control={<Radio color="primary" />}
        label="Срочная важная"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="Срочная неважная"
        control={<Radio color="primary" />}
        label="Срочная неважная"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="Не срочная важная"
        control={<Radio color="primary" />}
        label="Не срочная важная"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="Не срочная неважная"
        control={<Radio color="primary" />}
        label="Не срочная неважная"
        labelPlacement="bottom"
      />
    </RadioGroup>
  );
};

export default RadioButtons;

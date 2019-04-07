import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useStateValue } from '../../store';
import { handleFormFields } from '../../actions';

const RadioButtons = () => {
  const [state, dispatch] = useStateValue();

  return (
    <RadioGroup
      aria-label="position"
      name="position"
      value={state.formFields.important}
      defaultValue={state.formFields.important}
      onChange={e => {
        handleFormFields(dispatch, { field: 'important', value: e.target.value });
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

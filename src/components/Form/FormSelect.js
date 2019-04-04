import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const FormSelect = _ => {
  const [status, setStatus] = useState('Выполняется');
  return (
    <div>
      <FormControl margin="normal">
        <InputLabel htmlFor="age-native-simple">Статус</InputLabel>
        <Select native value={status} onChange={e => setStatus(e.target.value)}>
          <option value="" />
          <option value="Выполняется">Выполняется</option>
          <option value="На потом">На потом</option>
          <option value="Выполнена">Выполнена</option>
        </Select>
      </FormControl>
    </div>
  );
};

export default FormSelect;

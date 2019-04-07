import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import { handleFormFields } from '../../actions';
import { useStateValue } from '../../store';
import '../../main.scss';

const FormSelect = () => {
  const [state, dispatch] = useStateValue();
  return (
    <>
      <FormControl margin="normal">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <InputLabel htmlFor="age-native-simple" style={{ top: '-18px', left: '44px' }}>
            Статус
          </InputLabel>
          <Select
            native
            value={state.formFields.status}
            onChange={e => handleFormFields(dispatch, { field: 'status', value: e.target.value })}
            style={{ width: '93%' }}
          >
            <option value="" />
            <option value="Выполняется">Выполняется</option>
            <option value="На потом">На потом</option>
            <option value="Выполнена">Выполнена</option>
          </Select>
          <Icon style={{ order: '-1', color: '#303f9f' }}>update</Icon>
        </div>
      </FormControl>
    </>
  );
};

export default FormSelect;

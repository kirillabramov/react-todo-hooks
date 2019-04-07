import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import Icon from '@material-ui/core/Icon';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';
import { useStateValue } from '../../store';
import { handleFormFields } from '../../actions';
import '../../main.scss';

const Autosuggestion = () => {
  const [state, dispatch] = useStateValue();
  const [suggestion, setSuggestion] = useState();
  const suggestions = [{ label: 'тег0' }, { label: 'тег1' }, { label: 'тег2' }, { label: 'тег3' }];
  const renderInputComponent = inputProps => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          }
        }}
        {...other}
      />
    );
  };
  const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          )}
        </div>
      </MenuItem>
    );
  };
  const getSuggestions = value => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };
  const getSuggestionValue = suggestion => {
    return suggestion.label;
  };
  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value));
  };
  const handleSuggestionsClearRequested = _ => {
    setSuggestion(suggestions);
  };

  const handleSelect = _ => (event, { newValue }) => {
    handleFormFields(dispatch, { field: 'tag', value: newValue });
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            placeholder: 'Укажите тег (доступны теги, которые начинаются на т)',
            value: state.formFields.tag,
            onChange: handleSelect(),
            margin: 'normal'
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <Icon style={{ order: '-1', color: '#303f9f' }}>room</Icon>
      </div>
    </>
  );
};

export default Autosuggestion;

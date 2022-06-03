import * as React from 'react';
import InputBase from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo({ data }) {

  return (
      <Autocomplete
        id="ingredients-dropdown"
        freeSolo
        options={data.map(item => item)}
        renderInput={(params) => (
          <InputBase
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
          />
        )}
      />
  );
}

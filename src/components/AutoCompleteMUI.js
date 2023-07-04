import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

export default function FreeSolo({ data, value, setValue }) {

  return (
    <Autocomplete
      id="item-select-menu"
      sx={{ width: 300 }}
      options={data}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      autoHighlight
      getOptionLabel={(option) => {
          return `${option.display_name ? option.display_name : option.name}`
        }
      }
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`${option.imgUrlSm}`}
            srcSet={`${option.imgUrlSm}`}
            alt={`${option.name[0]}`}
          />
           {option.display_name ? option.display_name : option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose an ingredient"
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
    />
  );
}





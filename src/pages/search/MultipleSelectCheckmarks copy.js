import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ filterListType, listItems, mealTypeObj, setMealTypeObj }) {
  const [itemList, setItemList] = React.useState([]);
  
  const handleChange = (event) => {
    const { target: { value }} = event;

    setItemList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      
    );
    console.log(value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{filterListType}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={itemList}
          onChange={handleChange}
          input={<OutlinedInput label={filterListType} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {mealTypeObj.map((item) => (
            <MenuItem key={item.id} value={item.name} style={{height: "2em"}}>
              <Checkbox checked={itemList.indexOf(item.name) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

/////////////
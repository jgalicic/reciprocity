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

export default function MultipleSelectCheckmarks({ filterListType, filterParamObj, setFilterParamObj }) {
  const [itemList, setItemList] = React.useState([]);

  
  const handleChange = (event) => {
    setItemList(event.target.value);
  };

  const handleCheckBoxClick = (e, id) => {

      // Make a shallow copy of the items
      let tempMealTypeObj = [...filterParamObj]
      // Make a shallow copy of the item you want to mutate
      let tempMealType = {...tempMealTypeObj[id]}
      // Replace the property you're intested in
      tempMealType.checked = !filterParamObj[id].checked
      // Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      tempMealTypeObj[id] = tempMealType
      // Set the state to our new copy
      setFilterParamObj(tempMealTypeObj)
  }

  return (
    <div style={{margin: "0 auto"}}>
      <FormControl sx={{ m: 1, width: "20vw", maxWidth: "275px", minWidth: "164px"}}>
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
          {filterParamObj.map((item) => (
            <MenuItem 
              key={item.id} 
              value={item.name} 
              style={{height: "2em"}}
              onClick={(e) => handleCheckBoxClick(e, item.id)}
              >
              {/* <Checkbox checked={itemList.indexOf(item.name) > -1} /> */}
              <Checkbox checked={item.checked} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
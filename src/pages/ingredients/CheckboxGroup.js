import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxGroup({groupTitle, items, setItems} ) {

  let handleCheckboxChange = (e, id, stateItem, setStateItem) => {
    e.preventDefault()

    // 1. Make a shallow copy of the items
    let tempIngredientGroupObject = [...stateItem]
    // 2. Make a shallow copy of the item you want to mutate
    let tempIngredientGroup = {...tempIngredientGroupObject[id]}
    // 3. Replace the property you're intested in
    tempIngredientGroup.checked = !stateItem[id].checked
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    tempIngredientGroupObject[id] = tempIngredientGroup
    // 5. Set the state to our new copy
    setStateItem(tempIngredientGroupObject)
  }

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" 
        style={{
          fontSize: ".8em", 
          fontWeight: "bold",
          position: "relative",
          bottom: "2px"}}>
      {groupTitle}
      </FormLabel>
      <FormGroup className="checkboxList" >
        {items.map(item => (
          <FormControlLabel
            className="FormControlLabel"
            key={item.id} 
            label={item.name} 
            control={
              <Checkbox
                style={{position: "relative", bottom: "3px"}}
                className="Checkbox"
                checked={item.checked}
                key={item.id} 
                onChange={(e) => handleCheckboxChange(e, item.id, items, setItems)} 
                inputProps={{ 'aria-label': 'controlled' }}/>
            } 
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

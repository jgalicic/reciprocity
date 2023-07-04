import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup( {groupTitle, items, setItems} ) {

  let handleChange = (e, id, stateItem, setStateItem)  => {
    e.preventDefault()

    // 1. Make a shallow copy of the items
    let tempIngredientGroupObject = [...stateItem]
    // 1a. Negate previous selections (since these are radio buttons)
    tempIngredientGroupObject.map(item => item.checked = false)
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

      <FormLabel 
        id="demo-radio-buttons-group-label" 
        style={{fontSize: ".8em", 
                fontWeight: "bold",
                position: "relative",
                right: "5px",
                bottom: "3px"}}>
          {groupTitle}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {items.map(category => {
          return <FormControlLabel 
                    style={{height: "32px", position: "relative", right: "6px"}}
                    key={category.id}
                    onChange={(e) => handleChange(e, category.id, items, setItems)} 
                    value={category.name}
                    checked={category.checked}
                    control={<Radio />} 
                    label={category.name}  
                  />
        })}
      </RadioGroup>
    </FormControl>
  );
}
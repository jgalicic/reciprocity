import { memo } from 'react'

import FormControl from '@mui/material/FormControl';
import "./AddIngredient.css"
import CheckboxGroup from './CheckboxGroup';
import RadioButtonsGroup from './RadioButtonsGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Form02Type = ({
  category, setCategory,
  diet_category_list, setDiet_category_list,
  allergens, setAllergens,
  category_sub, setCategory_sub
}) => {

  const handleSubCategoryChange = (e, id) => {
    e.preventDefault()

    // Make a shallow copy of the items
    let tempSubCategoryObj = [...category_sub]
    // Make a shallow copy of the item you want to mutate
    let tempSubCategoryItem = {...tempSubCategoryObj[id]}
    // Replace the property you're intested in
    tempSubCategoryItem.checked = !category_sub[id].checked
    // Put item back into our temporary array
    tempSubCategoryObj[id] = tempSubCategoryItem
    // Set the state to our new copy
    setCategory_sub(tempSubCategoryObj)
  }

    /////////////////////////////////
    ////////       JSX       ////////
    /////////////////////////////////

  return (
    <div className="ingredientsSection2"> 
      <div className="radioBtnRowContainer">
        <FormControl style={{width: "40%"}}>
          <RadioButtonsGroup 
            groupTitle="Ingredient Category" 
            items={category} 
            color="success"
            setItems={setCategory} />
        </FormControl>
        <div className="verticalDivider"></div>
        <FormControl style={{width: "32%"}}>
          <CheckboxGroup 
            groupTitle="Diet Category" 
            items={diet_category_list} 
            setItems={setDiet_category_list}/>
        </FormControl>
        <div className="verticalDivider"></div>
        <FormControl style={{width: "28%"}}>
          <CheckboxGroup 
            groupTitle="Allergens" 
            items={allergens} 
            setItems={setAllergens}/>
        </FormControl>  
      </div>
    
    <hr style={{marginTop: "22px", position: "relative", right: "15px"}}/>
    <h4>Specific catetory (check all that apply)</h4>
    <FormGroup className="ingredientCheckboxList" style={{maxHeight:`${category_sub.length * 21}px`}}>
        {category_sub.map(subCategory => (
          <FormControlLabel
            className="FormControlLabel"
            key={subCategory.id} 
            label={subCategory.name} 
            onChange={(e) => handleSubCategoryChange(e, subCategory.id)} 
            style={subCategory.categoryHeader ? {borderTop: "1px solid black", marginTop: "18px", paddingTop: "22px"} : {}}
            control={
              <Checkbox
              style={{position: "relative", bottom: "3px"}}
                className="Checkbox"
                checked={subCategory.checked}
                key={subCategory.id} 
                inputProps={{ 'aria-label': 'controlled' }}/>
            } 
          />
        ))}        
      </FormGroup>
  </div>
  )
}

export default memo(Form02Type)
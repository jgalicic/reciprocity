
import { useState, memo, useEffect } from 'react'

// Material UI
import AutoCompleteMUI from '../../components/AutoCompleteMUI';

const Form04SubIng = ({
  contains_sub_ingredients, setContains_sub_ingredients,
  recipeId, setRecipeId,
  ingredient_list, setIngredient_list,
  ingredientsFromDB, 
  selectedIngredient, setSelectedIngredient, 
  ingredientError, setIngredientError,
  ingredient_list_array
}) => {


  // Populate ingredient_list
  useEffect(() => {

    if (contains_sub_ingredients) {
      let temp_list_array = []

      ingredientsFromDB.forEach((item, i) => {
        
        if (ingredient_list_array) {
          if (ingredient_list_array.includes(item.ingredientId)) {
            temp_list_array.push(item)
          }
        }

      })
      setSubIngredientYes("#259944")
      setSubIngredientNo("lightgray")
      setContains_sub_ingredients(true)
      
      setIngredient_list(temp_list_array)
    }

    if (!contains_sub_ingredients) {
      setSubIngredientNo("tomato")
      setSubIngredientYes("lightgray")
    }

  }, [contains_sub_ingredients, ingredient_list_array, ingredientsFromDB, setContains_sub_ingredients, setIngredient_list])

  const [subIngredientYes, setSubIngredientYes] = useState("#718f94")
  const [subIngredientNo, setSubIngredientNo] = useState("#718f94")

  const subIngredientYesClick = e => {
    e.preventDefault()
    setSubIngredientYes("#259944")
    setSubIngredientNo("lightgray")
    setContains_sub_ingredients(true)

  }
  
  const subIngredientNoClick = e => {
    e.preventDefault()
    setSubIngredientNo("tomato")
    setSubIngredientYes("lightgray")
    setContains_sub_ingredients(false)
  }

  const removeIngredient = e => {
    e.preventDefault()
    let index = e.target.attributes.idx.value

    setIngredient_list(prev => {
      let newArr = prev.slice()
      newArr.splice(index,1)
      return newArr
    })
  }

  const addIngredientToIngredients = e => {
    e.preventDefault()

    // Ingredients will be matched automatically to stored ingredients in the database
    let newIngredientObj = {}

    if (selectedIngredient === null) {
      setIngredientError("Please select an ingredient")
    } else {
      // Success
      newIngredientObj.cultivar = selectedIngredient.cultivar
      newIngredientObj.ingredientId = selectedIngredient.ingredientId
      newIngredientObj.imgUrlSm = selectedIngredient.imgUrlSm
      newIngredientObj.display_name = selectedIngredient.display_name

      // Default to plural ingredient name
      if (selectedIngredient.name_plural) {
        newIngredientObj.name = selectedIngredient.name_plural
      } else {
        newIngredientObj.name = selectedIngredient.name
      }
      
      setIngredient_list([...ingredient_list, newIngredientObj])
      setIngredientError("")
      setSelectedIngredient(null)
    } 
  }

    /////////////////////////////////
    ////////       JSX       ////////
    /////////////////////////////////

  return (
    <div> 
      <h4>Does this ingredient contain sub-ingredients?</h4>
      <div className="ingredientButtonContainer">
        <button 
          className="ingredientYesButton"
          onClick={subIngredientYesClick}
          style={{backgroundColor: subIngredientYes}}>
            Yes
        </button>
        <button 
        className="ingredientNoButton"
        onClick={subIngredientNoClick}
        style={{backgroundColor: subIngredientNo}}>
          No
        </button>
      </div>

      {contains_sub_ingredients && <div>
        <label><h4>Recipe ID:</h4></label>
        <p>Id of the recipe that is used to create this ingredient (leave blank if a recipe doesn't exist)</p>
        <input 
          type="text" 
          onChange={e=>setRecipeId(e.target.value)}
          value={recipeId}
          placeholder="crispyskinsalmwithlem-1123de" />
      </div>}

      {contains_sub_ingredients && <div>
        <label><h4>List of sub ingredients:</h4></label>
        <p>List in order of predominance, starting with the most prevelant ingredient and ending with least prevelant.</p>
        
        <div>
          {ingredient_list.length > 0 && <div>
            {ingredient_list && ingredient_list.map((ingredient, i)=>(
              <div key={i}>
                <div className="ingredientsList">
                  {`${" "}`}
                  <img src={ingredient.imgUrlSm} alt={ingredient.name[0]} style={{marginRight: "15px", height: "80px"}}></img>{`${" "}`}
                  <b style={{fontSize: "1.2em"}}>{ingredient.display_name ? ingredient.display_name : ingredient.name}{`${"  "}`}</b>
                  <b onClick={removeIngredient} idx={i} style={{color:"tomato", cursor: "pointer", float: "right"}}>x </b>
                </div>
                
              </div>
            ))}
            <br />
          </div>}

          <hr />
          
          <div className="IngredientsDropdownContainer">
            <AutoCompleteMUI 
              data={ingredientsFromDB} 
              value={selectedIngredient} 
              setValue={setSelectedIngredient}
            />
          </div>
        
          {ingredientError && <p style={{color: "tomato"}}>{ingredientError}</p>}
          <button 
            className="create-btn" 
            onClick={addIngredientToIngredients}>
              Add ingredient
          </button>

          <p>Don't see an ingredient you need? Add it to the database first before proceeding.</p>
          
        </div>
      </div>}
    </div>    
  )
}

export default memo(Form04SubIng)
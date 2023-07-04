import { useEffect, useState } from 'react'

// Material UI
import AutoCompleteMUI from '../../components/AutoCompleteMUI';

// Firestore
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/firebase-config'

// Local Components
import RecipeList from '../../components/RecipeList'

// Local Files
import "./Ingredients.css"


export default function Ingredients() {

  const INGREDIENT_API_URL = `https://reciprocity-api.herokuapp.com/ingredients`

  // React Hooks
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [value, setValue] = useState(null)
  const [selectedIngredients, setSlectedIngredients] = useState([])
  const [recipeDataToRender, setRecipeDataToRender] = useState(null)
  const [allRecipeData, setAllRecipeData] = useState([])

  while (false) console.log(error, setError, isPending, setIsPending, ingredients, setIngredients, setRecipeDataToRender)

  // Database connection (Ingredients)
  async function getIngredients(firestore) {
    const ingredientCol = collection(firestore, 'ingredients');
    const ingredientSnapshot = await getDocs(ingredientCol);
    const ingredientList = ingredientSnapshot.docs.map(doc => {
      return {
        ingredient : doc.data(),
        // exists : doc.exists(),
        // id : doc.id
      }
    });
    if (ingredientList.length === 0) setError("No ingredients found")
    return ingredientList;
  }

  // Set Ingredients
  useEffect(() => {
    setIsPending(true)
    getIngredients(firestore).then(data => {

      // This could be probably be optimized
      let arrayOfIngredients = []
      data.map((item) => arrayOfIngredients.push({
        cultivar: item.ingredient.cultivar,
        display_name: item.ingredient.display_name ? item.ingredient.display_name : `${item.ingredient.name}${Math.floor(Math.random()*999999)+100000}`,
        id: item.ingredient.ingredientId,
        imgUrlLg: `https://reciprocity-api.herokuapp.com/ingredients/_alpha250/${item.ingredient.ingredientId}.png`,
        imgUrlSm: `https://reciprocity-api.herokuapp.com/ingredients/_alpha50/${item.ingredient.ingredientId}.png`,
        name: item.ingredient.name,
        name_plural: item.ingredient.name_plural
      }))

      // Sort by Name
      function compare( a, b ) {
        if ( a.name > b.name )return 1
        if ( a.name < b.name )return -1
        return 0
      }

      let sortedData = arrayOfIngredients.sort(compare)
      setIngredients(sortedData)
      setIsPending(false)

      // console.log(sortedData)
    })
  }, [INGREDIENT_API_URL])

  // Database connection (Recipes)
  async function getRecipes(firestore) {
    const recipeCol = collection(firestore, 'recipes');
    const recipeSnapshot = await getDocs(recipeCol);
    const recipeList = recipeSnapshot.docs.map(doc => {
      return {
        recipe : doc.data(),
        exists : doc.exists(),
        id : doc.id
      }
    });
    if (recipeList.length === 0) setError("No recipes found")
    return recipeList;
  }

  // Set Recipes
  useEffect(() => {
    setIsPending(true)
    getRecipes(firestore).then(data => {
      setIsPending(false)
      setAllRecipeData(data)
    })
  }, [])

  // Create recipe list with recipes using ALL of selected ingredients
  useEffect(() => {

    // Check that allRecipeData and selectedIngredients exist
    if (allRecipeData && selectedIngredients) {

      if (selectedIngredients.length === 0) setRecipeDataToRender(allRecipeData)

      if (selectedIngredients.length >= 1) {

        let tempRecipeData = []
      
        // Loop through all recipes
        for (let i = 0; i < allRecipeData.length; i++) {

          let matchCount = 0
  
          // Loop through each ingredient in each recipe
          for (let j = 0; j < allRecipeData[i].recipe.ingredientList.length; j++) {

            for (let k = 0; k < selectedIngredients.length; k++) {
              if (selectedIngredients[k].id.toString() === allRecipeData[i].recipe.ingredientList[j].ingredientId.toString()) {
                matchCount++
                
              } 
            }
          }
          if (matchCount === selectedIngredients.length && matchCount > 0) tempRecipeData.push(allRecipeData[i])
        }
  
        setRecipeDataToRender(tempRecipeData)
      }

    }

  }, [allRecipeData, selectedIngredients])

  const removeSelectedIngredient = (e) => {
    e.preventDefault()
    let index = e.target.attributes.idx.value

    setSlectedIngredients(prev => {
      let newArr = prev.slice()
      newArr.splice(index,1)
      return newArr
    })
  }

  // useEffect(() => {
  //   console.log("recipeDataToRender", recipeDataToRender)
  // }, [recipeDataToRender])

  // useEffect(() => {
  //   console.log("selectedIngredients", selectedIngredients)
  // }, [selectedIngredients])
  

  // Update selectedIngredients
  useEffect(() => {
    let tempIngredientList = [...selectedIngredients]

    // Check that value is not null
    if (value !== null) {
      // Check that value is not already in tempIngredientList
      if (!tempIngredientList.includes(value)) {
        tempIngredientList.push(value)
      }
    }

    setSlectedIngredients(tempIngredientList)
  }, [value, selectedIngredients])

  // Prevents infinite loop, used in conjunction with above useEffect() hook
  useEffect(() => {
    setSlectedIngredients(selectedIngredients)
  }, [selectedIngredients])
  
  // Should this be changed to a state object??
  let recipeDisplayTitleArr = []

  if (selectedIngredients) {
    selectedIngredients.forEach((item) => {
      recipeDisplayTitleArr.push(item.name_plural ? item.name_plural : item.name)
    })
  }

  let recipeDisplayTitle = ""
  if (recipeDisplayTitleArr.length > 0) recipeDisplayTitle += "Recipes with "
  if (recipeDisplayTitleArr.length === 1) recipeDisplayTitle += `${recipeDisplayTitleArr[0]}`
  if (recipeDisplayTitleArr.length === 2) recipeDisplayTitle += `${recipeDisplayTitleArr[0]} and ${recipeDisplayTitleArr[1]}`
  if (recipeDisplayTitleArr.length > 2) {
    for (let i = 0; i < recipeDisplayTitleArr.length - 1; i++) {
      recipeDisplayTitle += `${recipeDisplayTitleArr[i]}, `
    }
    recipeDisplayTitle += `and ${recipeDisplayTitleArr[recipeDisplayTitleArr.length - 1]}`
  }

  return (
    <div className="IngredientsContainer">
      <h3>Select your ingredients</h3>
      <div className="IngredientsTopRow">
        <div className="IngredientsSelectMenu">
          
          <div className="IngredientsDropdownContainer">
            <AutoCompleteMUI data={ingredients} value={value} setValue={setValue}/>
          </div>
        </div>
        <div className="SelectedIngredientsList">
              {selectedIngredients[0] && selectedIngredients.map((item, id) => {
                if (item !== null) {
                  return (
                    <div key={id} className="SelectedIngredientCard">
                      <span 
                        className="SelectedIngredientClose"
                        onClick={removeSelectedIngredient} 
                        idx={id}
                        >x</span>
                      <img src={item.imgUrlLg} alt={item.name}></img>
                      <p>{item.name}</p>
                    </div>
                    )
                } else {
                  return <div key={9999999}></div>
                }
              })}
          </div>


      </div>
      <h3>{recipeDisplayTitle}</h3>
      {recipeDataToRender && <RecipeList recipes={recipeDataToRender}/>}
      {recipeDataToRender && 
        <p style={{textAlign: "center"}}>
          {recipeDataToRender.length === 1 ? `${recipeDataToRender.length} result` : `${recipeDataToRender.length} results`}
        </p>}
    </div>

  );
}


import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./AddIngredient.css"
import ingredientObj from "./IngredientTypeCreate"
import Form01Name from './Form01Name';
import Form02Type from './Form02Type';
import Form03Nutrition from './Form03Nutrition';
import Form04SubIng from './Form04SubIng';
import Form05Stats from './Form05Stats';
import Form06Shelf from './Form06Shelf';

import { useHistory } from 'react-router';

// Firebase
import { doc, collection, getDocs, setDoc } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/firebase-config'

export default function AddIngredient() {

    // Firebase
  const [dataHasBeenWrittenToDB, setDataHasBeenWrittenToDB] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')
  const [ingredientsFromDB, setIngredientsFromDB] = useState([])
  const [ingredientError, setIngredientError] = useState("")
  const [selectedIngredient, setSelectedIngredient] = useState(null)

  while (false) console.log(error, isPending)

  // Prevent selected fields from being edited
  const disableInputControl = false

  // Initialze state hooks
  const [allergens, setAllergens] = useState(ingredientObj.allergenObj)
  const [availability, setAvailability] = useState(ingredientObj.blankState.availability)
  const [calories_per_100_grams, setCalories_per_100_grams] = useState(ingredientObj.blankState.calories_per_100_grams)
  const [category, setCategory] = useState(ingredientObj.foodCategoryObj)
  const [category_sub, setCategory_sub] = useState(ingredientObj.specificFoodCategoryObj)
  const [contains_sub_ingredients, setContains_sub_ingredients] = useState(false)
  const [cultivar, setCultivar] = useState("")
  const [diet_category_list, setDiet_category_list] = useState(ingredientObj.dietCategoryObj)
  const [display_name, setDisplay_name] = useState("")
  const [freezeability, setFreezeability] = useState(ingredientObj.blankState.freezeability)
  const [grams_carbs_per_100g, setGrams_carbs_per_100g] = useState("")
  const [grams_fat_per_100g, setGrams_fat_per_100g] = useState("")
  const [grams_fiber_per_100g, setGrams_fiber_per_100g] = useState("")
  const [grams_sugar_per_100g, setGrams_sugar_per_100g] = useState("")
  const [grams_protien_per_100g, setGrams_protien_per_100g] = useState("")
  const [ingredient_list, setIngredient_list] = useState([])
  const [mg_sodium_per_100g, setMg_sodium_per_100g] = useState("")
  const [name, setName] = useState("")
  const [name_plural, setName_plural] = useState("")
  const [needs_refrigeration, setNeeds_refrigeration] = useState(ingredientObj.blankState.needs_refrigeration)
  const [prepared_as, setPrepared_as] = useState("")
  const [recipeId, setRecipeId] = useState([""]) // Link to recipe if ingredient is a compound ingredient
  const [shelf_life_pantry_unopened_total_days, setShelf_life_pantry_unopened_total_days] = useState("")
  const [shelf_life_pantry_opened_total_days, setShelf_life_pantry_opened_total_days] = useState("")
  const [shelf_life_fridge_total_days, setShelf_life_fridge_total_days] = useState("")
  const [shelf_life_freezer_total_days, setShelf_life_freezer_total_days] = useState("")
  const [spiciness, setSpiciness] = useState(ingredientObj.blankState.spiciness)
  const [type, setType] = useState("")

  

  // DATABASE CONNECTION (INGREDIENTS)
  async function getIngredientsFromDB(firestore) {
    const ingredientCol = collection(firestore, 'ingredients');
    const ingredientSnapshot = await getDocs(ingredientCol);
    const all_ingredients_list = ingredientSnapshot.docs.map(doc => {
      return {
        ingredient : doc.data(),
        // exists : doc.exists(),
        // id : doc.id
      }
    });
    if (all_ingredients_list.length === 0) setError("No ingredients found")
    return all_ingredients_list;
  }
  
  // Set Ingredients
  useEffect(() => {
    setIsPending(true)
    getIngredientsFromDB(firestore).then(data => {

      // This could be probably be optimized
      let arrayOfIngredients = []
      data.map((item) => arrayOfIngredients.push({
        cultivar: item.ingredient.cultivar,
        display_name: item.ingredient.display_name ? item.ingredient.display_name : `${item.ingredient.name}${Math.floor(Math.random()*999999)+100000}`,
        ingredientId: item.ingredient.ingredientId,
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
      setIngredientsFromDB(sortedData)
      setIsPending(false)
    })
  }, [])

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()

    //////////  Create ID  //////////

    let specificKind = ""
    let uniqueId = name.substring(0,14)

    if (cultivar.length > 0) { 
      specificKind = cultivar
    } else if (type.length > 0) {
      specificKind = type
    } else if (prepared_as.length > 0) {
      specificKind = prepared_as
    }

    uniqueId += specificKind.substring(0,9)

    // Remove special characters
    let validatedId = uniqueId.replace(/[^a-zA-Z0-9]/g, '')

    // Remove all whitespace
    while(validatedId.includes(" "))
    { 
      validatedId = validatedId.replace(" ", "");
    }

    let id1 = uuidv4()

    validatedId +=
      "-" + 
      id1.substring(0,8) + 
      id1.substring(24,36)

    let ingredientId = validatedId.substring(0,25).toLowerCase()

    ////////  Write to Database  ////////
  
    let data = {
      allergens: allergens.filter((item) => item.checked).map(item => item.name),
      availability,
      calories_per_100_grams: calories_per_100_grams ? calories_per_100_grams : "0",
      category: category.filter((item) => item.checked).map(item => item.name),
      category_sub: category_sub.filter((item) => item.checked).map(item => item.name),
      contains_sub_ingredients,
      createdAt: new Date().toString(),
      cultivar,
      diet_category_list: diet_category_list.filter((item) => item.checked).map(item => item.name),
      display_name,
      freezeability,
      grams_carbs_per_100g: grams_carbs_per_100g ? grams_carbs_per_100g : "0",
      grams_fat_per_100g: grams_fat_per_100g ? grams_fat_per_100g : "0",
      grams_fiber_per_100g: grams_fiber_per_100g ? grams_fiber_per_100g : "0",
      grams_sugar_per_100g: grams_sugar_per_100g ? grams_sugar_per_100g : "0",
      grams_protien_per_100g: grams_protien_per_100g ? grams_protien_per_100g : "0",
      ingredientId,
      ingredient_list: ingredient_list.length > 0 ? ingredient_list.map(item => item.ingredientId) : [],
      mg_sodium_per_100g,
      name,
      name_plural,
      needs_refrigeration,
      prepared_as,
      recipeId,
      shelf_life_pantry_unopened_days: shelf_life_pantry_unopened_total_days ? shelf_life_pantry_unopened_total_days : "0",
      shelf_life_pantry_opened_days: shelf_life_pantry_opened_total_days ? shelf_life_pantry_opened_total_days : "0",
      shelf_life_fridge_days: shelf_life_fridge_total_days ? shelf_life_fridge_total_days : "0",
      shelf_life_freezer_days: shelf_life_freezer_total_days ? shelf_life_freezer_total_days : "0",
      spiciness,
      type,
      updatedAt: new Date().toString(),
    }

    console.log("!!!!!", data)

    const newIngredient = doc(firestore, `ingredients/${ingredientId}`)
    setDoc(newIngredient, data)
    setDataHasBeenWrittenToDB(true)
  }


  // Force initial reset of Radio button & checkbox groups
  useEffect(() => {

    let categoryObj = [...ingredientObj.foodCategoryObj]
    let diet_category_listObj = [...ingredientObj.dietCategoryObj]
    let allergenObj = [...ingredientObj.allergenObj]
    let category_subObj = [...ingredientObj.specificFoodCategoryObj]

    categoryObj.forEach((item) => item.checked = false)
    diet_category_listObj.forEach((item) => item.checked = false)
    allergenObj.forEach((item) => item.checked = false)
    category_subObj.forEach((item) => item.checked = false)

    setCategory(categoryObj)
    setDiet_category_list(diet_category_listObj)
    setAllergens(allergenObj)
    setCategory_sub(category_subObj)
    
  }, [])



  // Scroll to top
  useEffect(() => {
    try { window.scroll({top: 0, left: 0, behavior: 'smooth' })
    } catch (error) { // for older browser
      window.scrollTo(0, 0)
    }
 }, []);

  // Redirect user when we get a data response
  useEffect(() => {
    if (dataHasBeenWrittenToDB) {
      history.push('/ingredients')
    }
  },[dataHasBeenWrittenToDB, history])

  return (
    <div className="create">
      <h1 className="page-title"> Add a New Ingredient</h1>
      <form onSubmit={handleSubmit}>
        <Form01Name 
          name={name}
          setName={setName}
          name_plural={name_plural}
          setName_plural={setName_plural}
          type={type}
          setType={setType}
          prepared_as={prepared_as}
          setPrepared_as={setPrepared_as}
          cultivar={cultivar}
          setCultivar={setCultivar}
          display_name={display_name}
          setDisplay_name={setDisplay_name}
          disableInputControl={disableInputControl}
        />

        <Form02Type 
          category={category}
          setCategory={setCategory}
          diet_category_list={diet_category_list}
          setDiet_category_list={setDiet_category_list}
          allergens={allergens}
          setAllergens={setAllergens}
          category_sub={category_sub}
          setCategory_sub={setCategory_sub}
        />
        <hr />
        <Form03Nutrition
          calories_per_100_grams={calories_per_100_grams}
          setCalories_per_100_grams={setCalories_per_100_grams}
          grams_fat_per_100g={grams_fat_per_100g}
          setGrams_fat_per_100g={setGrams_fat_per_100g}
          mg_sodium_per_100g={mg_sodium_per_100g}
          setMg_sodium_per_100g={setMg_sodium_per_100g}
          grams_carbs_per_100g={grams_carbs_per_100g}
          setGrams_carbs_per_100g={setGrams_carbs_per_100g}
          grams_fiber_per_100g={grams_fiber_per_100g}
          setGrams_fiber_per_100g={setGrams_fiber_per_100g}
          grams_sugar_per_100g={grams_sugar_per_100g}
          setGrams_sugar_per_100g={setGrams_sugar_per_100g}
          grams_protien_per_100g={grams_protien_per_100g}
          setGrams_protien_per_100g={setGrams_protien_per_100g}
        />
        <hr />
        <Form04SubIng 
          contains_sub_ingredients={contains_sub_ingredients}
          setContains_sub_ingredients={setContains_sub_ingredients}
          recipeId={recipeId}
          setRecipeId={setRecipeId}
          ingredient_list={ingredient_list}
          setIngredient_list={setIngredient_list}
          ingredientsFromDB={ingredientsFromDB}
          setIngredientsFromDB={setIngredientsFromDB}
          selectedIngredient={selectedIngredient}
          setSelectedIngredient={setSelectedIngredient}
          ingredientError={ingredientError}
          setIngredientError={setIngredientError}
        />
        <hr />
        <Form05Stats
          availability={availability}
          setAvailability={setAvailability}
          needs_refrigeration={needs_refrigeration}
          setNeeds_refrigeration={setNeeds_refrigeration}
          freezeability={freezeability}
          setFreezeability={setFreezeability}
          spiciness={spiciness}
          setSpiciness={setSpiciness}
        />
        <hr />
        <Form06Shelf 
          shelf_life_pantry_unopened_total_days={shelf_life_pantry_unopened_total_days}
          setShelf_life_pantry_unopened_total_days={setShelf_life_pantry_unopened_total_days}
          shelf_life_pantry_opened_total_days={shelf_life_pantry_opened_total_days}
          setShelf_life_pantry_opened_total_days={setShelf_life_pantry_opened_total_days}
          shelf_life_fridge_total_days={shelf_life_fridge_total_days}
          setShelf_life_fridge_total_days={setShelf_life_fridge_total_days}
          shelf_life_freezer_total_days={shelf_life_freezer_total_days}
          setShelf_life_freezer_total_days={setShelf_life_freezer_total_days}
        />

        <hr />
        <button className="ingredientSubmitButton">Submit Ingredient</button>
       </form>
    </div>
  )
}
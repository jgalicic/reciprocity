import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/firebase-config'


/* TODO:

BUGS:

1.

COMPLETE:

1. Add special state hooks for arrays of data taken from database and pass that into respective components
2. Fix storage equations so the correct days/years appear in the input fields
3. Fix Form01Name issues (maybe get rid of buttons?)
4. When only name and cultivar are entered, cultivar does not appear in Full ingredient name
5. Figure out why response time is so slow (Need to add React.memo to each component)
6. Once name issues are fixed, test out by entering a few new ingredients to the Database
7. Hide "Before type" button if "No" is selected for "Does this ingredient have a specific type?"
8. Capitalize full ingredient display name appropriately for all variations of ingredient names

 */

export default function EditOneIngredient() {

  // Get ingredient ID from URL parameter
  let { id } = useParams();

  // Prevent selected fields from being edited
  const disableInputControl = true

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

  // Ingredient attributes stored as arrays (Example: ["Soy", "wheat"])
  const [allergens_array, setAllergens_array] = useState([])
  const [category_array, setCategory_array] = useState([])
  const [category_sub_array, setCategory_sub_array] = useState([])
  const [diet_category_list_array, setDiet_category_list_array] = useState([])
  const [ingredient_list_array, setIngredient_list_array] = useState([])

  // Firebase
  const [data, setData] = useState(null)
  const [dataHasBeenWrittenToDB, setDataHasBeenWrittenToDB] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [ingredientsFromDB, setIngredientsFromDB] = useState([])
  const [ingredientError, setIngredientError] = useState("")
  const [selectedIngredient, setSelectedIngredient] = useState(null)

  // Helper state hooks
  const [prevIngredientId, setPrevIngredientId] = useState("")
  const [nextIngredientId, setNextIngredientId] = useState("")

  while (false) console.log(prevIngredientId,nextIngredientId)



  // Database connection
  async function getIngredientsFromDB(firestore) {
    const ingredientCol = collection(firestore, 'ingredients');
    const ingredientSnapshot = await getDocs(ingredientCol);
    const ingredientData = ingredientSnapshot.docs.map(doc => {
      return {
        ingredient : doc.data(),
        exists : doc.exists(),
        id : doc.id
      }
    });
    if (ingredientData.length === 0) setError("No ingredients found")
    return ingredientData;
  }

  useEffect(() => {
    setIsPending(true)
    getIngredientsFromDB(firestore).then(ingredientData => {

      // Find individual ingredient faster than using map() or forEach()
      let index = -1
      let prev = 0
      let next = 1
      for(let i = 0; i < ingredientData.length; i++) {
          if(ingredientData[i].id === id) {
              index = i;
              prev = i - 1;
              next = i + 1;
              break;
          }
      }
      setData(ingredientData[index])
      if (ingredientData[prev]) setPrevIngredientId(ingredientData[prev].id)
      if (ingredientData[next]) setNextIngredientId(ingredientData[next].id)

      // Sort entire ingredient list
      let arrayOfIngredients = []
      ingredientData.map((item) => arrayOfIngredients.push({
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
  }, [id])

  useEffect(() => {

    if (data) {


      // Legacy attributes (delete these once all legacy attributes have been removed from the ingredient entries in Firebase)
      data.ingredient.cultivar_or_variety && setCultivar(data.ingredient.cultivar_or_variety)
      data.ingredient.dietCategory && setDiet_category_list_array(data.ingredient.dietCategory)
      data.ingredient.list_sub_ingredients && setIngredient_list_array(data.ingredient.list_sub_ingredients)
      data.ingredient.shelf_life_fridge_total_days && setShelf_life_fridge_total_days(data.ingredient.shelf_life_fridge_total_days)
      data.ingredient.shelf_life_pantry_total_days && setShelf_life_pantry_opened_total_days(data.ingredient.shelf_life_pantry_total_days)


      // If data.ingredient.allergens exists, set allergens_array to what data.ingredient.allergens is
      data.ingredient.allergens && setAllergens_array(data.ingredient.allergens)
      setAvailability(data.ingredient.availability)
      data.ingredient.calories_per_100_grams && setCalories_per_100_grams(data.ingredient.calories_per_100_grams)
      data.ingredient.category && setCategory_array(data.ingredient.category)
      data.ingredient.category_sub && setCategory_sub_array(data.ingredient.category_sub)
      data.ingredient.contains_sub_ingredients && setContains_sub_ingredients(data.ingredient.contains_sub_ingredients)
      data.ingredient.cultivar && setCultivar(data.ingredient.cultivar)
      data.ingredient.diet_category_list && setDiet_category_list_array(data.ingredient.diet_category_list)
      data.ingredient.display_name && setDisplay_name(data.ingredient.display_name)
      setFreezeability(data.ingredient.freezeability)
      data.ingredient.grams_carbs_per_100g && setGrams_carbs_per_100g(data.ingredient.grams_carbs_per_100g)
      data.ingredient.grams_fat_per_100g && setGrams_fat_per_100g(data.ingredient.grams_fat_per_100g)
      data.ingredient.grams_fiber_per_100g && setGrams_fiber_per_100g(data.ingredient.grams_fiber_per_100g)
      data.ingredient.grams_sugar_per_100g && setGrams_sugar_per_100g(data.ingredient.grams_sugar_per_100g)
      data.ingredient.grams_protien_per_100g && setGrams_protien_per_100g(data.ingredient.grams_protien_per_100g)
      data.ingredient.ingredient_list && setIngredient_list_array(data.ingredient.ingredient_list)
      data.ingredient.mg_sodium_per_100g && setMg_sodium_per_100g(data.ingredient.mg_sodium_per_100g)
      data.ingredient.name && setName(data.ingredient.name)
      data.ingredient.name_plural && setName_plural(data.ingredient.name_plural)
      setNeeds_refrigeration(data.ingredient.needs_refrigeration)
      data.ingredient.prepared_as && setPrepared_as(data.ingredient.prepared_as)
      data.ingredient.recipeId && setRecipeId(data.ingredient.recipeId) // Link to recipe for compound ingredients
      setShelf_life_pantry_unopened_total_days(data.ingredient.shelf_life_pantry_unopened_days)
      setShelf_life_pantry_opened_total_days(data.ingredient.shelf_life_pantry_opened_days)
      setShelf_life_fridge_total_days(data.ingredient.shelf_life_fridge_days)
      setShelf_life_freezer_total_days(data.ingredient.shelf_life_freezer_days)
      setSpiciness(data.ingredient.spiciness)
      // data.ingredient.texture && setTexture_array(data.ingredient.texture)
      data.ingredient.type && setType(data.ingredient.type)
    }

  }, [data])


// Preload Allergens Checkboxes
useEffect(() => {
  if (data) {
    let allergenObject = [...ingredientObj.allergenObj]
    allergenObject.forEach((item, i) => {
      if (allergens_array.includes(item.name)) allergenObject[i].checked = true
    })
    setAllergens(allergenObject)
  }
}, [data, allergens_array])


// Preload Ingredient Category Checkboxes
useEffect(() => {
  if (data) {
    let categoryObject = [...ingredientObj.foodCategoryObj]
    categoryObject.forEach((item, i) => {
      if (category_array.includes(item.name)) categoryObject[i].checked = true
    })
    setCategory(categoryObject)
  }
}, [data, category_array])



// Preload Specific Ingredient Category Checkboxes
useEffect(() => {
  if (data) {
    let category_sub_Object = [...ingredientObj.specificFoodCategoryObj]
    category_sub_Object.forEach((item, i) => {
      if (category_sub_array.includes(item.name)) category_sub_Object[i].checked = true
    })
    setCategory_sub(category_sub_Object)
  }
}, [data, category_sub_array])


// Preload Diet Category List Checkboxes
useEffect(() => {
  if (data) {
    let diet_category_list_Object = [...ingredientObj.dietCategoryObj]
    diet_category_list_Object.forEach((item, i) => {
      if (diet_category_list_array.includes(item.name)) diet_category_list_Object[i].checked = true
    })
    setDiet_category_list(diet_category_list_Object)
  }
}, [data, diet_category_list_array])


  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()

    ////////  Write to Database  ////////
  
    let newData = {
      allergens: allergens.filter((item) => item.checked).map(item => item.name),
      availability,
      calories_per_100_grams: calories_per_100_grams ? calories_per_100_grams : "0",
      category: category.filter((item) => item.checked).map(item => item.name),
      category_sub: category_sub.filter((item) => item.checked).map(item => item.name),
      contains_sub_ingredients,
      // Note: createdAt isn't editable or updateable
      cultivar: cultivar.trim(),
      diet_category_list: diet_category_list.filter((item) => item.checked).map(item => item.name),
      display_name: display_name.trim(),
      freezeability,
      grams_carbs_per_100g: grams_carbs_per_100g ? grams_carbs_per_100g : "0",
      grams_fat_per_100g: grams_fat_per_100g ? grams_fat_per_100g : "0",
      grams_fiber_per_100g: grams_fiber_per_100g ? grams_fiber_per_100g : "0",
      grams_sugar_per_100g: grams_sugar_per_100g ? grams_sugar_per_100g : "0",
      grams_protien_per_100g: grams_protien_per_100g ? grams_protien_per_100g : "0",
      // Note: IngredientId isn't editable or updateable
      ingredient_list: ingredient_list.length > 0 ? ingredient_list.map(item => item.ingredientId) : [],
      mg_sodium_per_100g,
      // Note: Name isn't editable or updateable
      name_plural: name_plural.trim(),
      needs_refrigeration,
      prepared_as: prepared_as.trim(),
      recipeId,
      shelf_life_pantry_unopened_days: shelf_life_pantry_unopened_total_days ? shelf_life_pantry_unopened_total_days : "0",
      shelf_life_pantry_opened_days: shelf_life_pantry_opened_total_days ? shelf_life_pantry_opened_total_days : "0",
      shelf_life_fridge_days: shelf_life_fridge_total_days ? shelf_life_fridge_total_days : "0",
      shelf_life_freezer_days: shelf_life_freezer_total_days ? shelf_life_freezer_total_days : "0",
      spiciness,
      type: type.trim(),
      updatedAt: new Date().toString(),
    }

    if (!isPending && !error) {

    const docRef = doc(firestore, `ingredients/${id}`)
    updateDoc(docRef, newData)
    setDataHasBeenWrittenToDB(true)
    }
  }

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
      history.push('/editingredients')
    }
  },[dataHasBeenWrittenToDB, history])

  return (
    <div className="create">
      {!data &&     
        <Box sx={{ display: 'flex', justifyContent: "center"}}>
          <CircularProgress />
        </Box>}
        {data && <h1 style={{textAlign: "center", margin: "0 0 20px 0", color: "rgb(227, 91, 50)"}}>Edit ingredient</h1>}
        <div className="ingredientImage0283759">
        {data && <img src={`https://reciprocity-api.herokuapp.com/ingredients/_alpha250/${id}.png`} alt={name}></img>}
      </div>
        {data && <h2 style={{textAlign: "center"}}>{display_name}</h2>}

      <form onSubmit={handleSubmit}>
      {data && <Form01Name 
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
        />}
        {data && <Form02Type 
          category={category}
          setCategory={setCategory}
          diet_category_list={diet_category_list}
          setDiet_category_list={setDiet_category_list}
          allergens={allergens}
          setAllergens={setAllergens}
          category_sub={category_sub}
          setCategory_sub={setCategory_sub}
          allergens_array={allergens_array}
          setAllergens_array={setAllergens_array}
          category_array={category_array}
          setCategory_array={setCategory_array}
          category_sub_array={category_sub_array}
          setCategory_sub_array={setCategory_sub_array}
          diet_category_list_array={diet_category_list_array}
          setDiet_category_list_array={setDiet_category_list_array}
        />}
        {data && <hr />}
        {data &&
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
        }
        {data && <hr />}
        {data &&
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
          ingredient_list_array={ingredient_list_array}
        />
        }
        {data && <hr />}    
        {data &&
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
        }
        {data && <hr />}
        {data &&
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
        }

        {data && <hr />}      
        {data && <button className="ingredientSubmitButton">Update Ingredient</button>}
       </form>
    </div>
  )
}
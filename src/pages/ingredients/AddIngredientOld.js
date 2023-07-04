import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./AddIngredient.css"
import CheckboxGroup from './CheckboxGroup';
import ingredientObj from "./IngredientTypeCreate"
import RadioButtonsGroup from './RadioButtonsGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box'; 
import Slider from '@mui/material/Slider';
import { useHistory } from 'react-router';

// Material UI
import AutoCompleteMUI from '../../components/AutoCompleteMUI';

// Firebase
import { doc, collection, getDocs, setDoc } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/firebase-config'

export default function AddIngredient() {

    // Firebase
  const [dataHasBeenWrittenToDB, setDataHasBeenWrittenToDB] = useState(false)
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [ingredientsFromDB, setIngredientsFromDB] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  const [ingredientError, setIngredientError] = useState("")
  const [selectedIngredient, setSelectedIngredient] = useState(null)

  // Initialze state hooks
  
  const [allergens, setAllergens] = useState(ingredientObj.allergenObj)
  // const [also_known_as_singular, setAlso_known_as_singular] = useState("")
  // const [also_known_as_plural, setAlso_known_as_plural] = useState("")
  const [availability, setAvailability] = useState(ingredientObj.blankState.availability)
  const [calories_per_100_grams, setCalories_per_100_grams] = useState(ingredientObj.blankState.calories_per_100_grams)
  const [category, setCategory] = useState(ingredientObj.foodCategoryObj)
  const [category_sub, setCategory_sub] = useState(ingredientObj.specificFoodCategoryObj)
  const [contains_sub_ingredients, setContains_sub_ingredients] = useState(null)
  const [cultivar, setCultivar] = useState("")
  const [cultivar_goes_before_name, setCultivar_goes_before_name] = useState(false)
  const [freezeability, setFreezeability] = useState(ingredientObj.blankState.freezeability)
  const [grams_carbs_per_100g, setGrams_carbs_per_100g] = useState("")
  const [grams_fat_per_100g, setGrams_fat_per_100g] = useState("")
  const [grams_fiber_per_100g, setGrams_fiber_per_100g] = useState("")
  const [grams_sugar_per_100g, setGrams_sugar_per_100g] = useState("")
  const [grams_protien_per_100g, setGrams_protien_per_100g] = useState("")
  const [hasCultivar, setHasCultivar] = useState(false) // Input helper; not for database
  const [hasType, setHasType] = useState(false) // Input helper; not for database
  const [mg_sodium_per_100g, setMg_sodium_per_100g] = useState("")
  const [name, setName] = useState("")
  const [name_plural, setName_plural] = useState("")
  const [needs_refrigeration, setNeeds_refrigeration] = useState(ingredientObj.blankState.needs_refrigeration)
  const [prepared_as, setPrepared_as] = useState("")
  const [prepared_as_show, setPrepared_as_show] = useState(false) // Input helper; not for database
  const [prep_method_goes_before_name, setPrep_method_goes_before_name] = useState(false)
  const [recipeId, setRecipeId] = useState([""]) // Use to link to recipe if ingredient is a compound ingredient
  const [shelf_life_pantry_unopened_days, setShelf_life_pantry_unopened_days] = useState("")
  const [shelf_life_pantry_unopnened_years, setShelf_life_pantry_unopened_years] = useState("")
  const [shelf_life_pantry_unopened_total_days, setShelf_life_pantry_unopened_total_days] = useState("")
  const [shelf_life_pantry_opened_days, setShelf_life_pantry_opened_days] = useState("")
  const [shelf_life_pantry_opened_years, setShelf_life_pantry_opened_years] = useState("")
  const [shelf_life_pantry_opened_total_days, setShelf_life_pantry_opened_total_days] = useState("")
  const [shelf_life_fridge_days, setShelf_life_fridge_days] = useState("")
  const [shelf_life_fridge_years, setShelf_life_fridge_years] = useState("")
  const [shelf_life_fridge_total_days, setShelf_life_fridge_total_days] = useState("")
  const [spiciness, setSpiciness] = useState(ingredientObj.blankState.spiciness)
  const [texture, setTexture] = useState(ingredientObj.textureObj)
  const [type, setType] = useState("")
  const [dietCategoryList, setDietCategoryList] = useState(ingredientObj.dietCategoryObj)

  while (false) console.log(
    error, isPending
    )

    // DATABASE CONNECTION (INGREDIENTS)
    async function getIngredientsFromDB(firestore) {
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
        getIngredientsFromDB(firestore).then(data => {
    
          // This could be probably be optimized
          let arrayOfIngredients = []
          data.map((item) => arrayOfIngredients.push({
            cultivar: item.ingredient.cultivar,
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

      
  // CSS class states
  const [subIngredientYes, setSubIngredientYes] = useState("#718f94")
  const [subIngredientNo, setSubIngredientNo] = useState("#718f94")

  const [cultivarYes, setCultivarYes] = useState("#718f94")
  const [cultivarNo, setCultivarNo] = useState("#718f94")
  // const [cultivarBefore, setCultivarBefore] = useState("#718f94")
  // const [cultivarAfter, setCultivarAfter] = useState("#718f94")

  const [typeYes, setTypeYes] = useState("#718f94")
  const [typeNo, setTypeNo] = useState("#718f94")
  // const [typeBefore, setTypeBefore] = useState("#718f94")
  // const [typeAfter, setTypeAfter] = useState("#718f94")

  const [ingredientIsPreparedYes, setIngredientIsPreparedYes] = useState("#718f94")
  const [ingredientIsPreparedNo, setIngredientIsPreparedNo] = useState("#718f94")
  const [preparationMethodBefore, setPreparationMethodBefore] = useState("#718f94")
  const [preparationMethodAfter, setPreparationMethodAfter] = useState("#718f94")


  const history = useHistory()


  const handleSubCategoryChange = (e, id) => {
    e.preventDefault()

    // 1. Make a shallow copy of the items
    let tempSubCategoryObj = [...category_sub]
    // 2. Make a shallow copy of the item you want to mutate
    let tempSubCategoryItem = {...tempSubCategoryObj[id]}
    // 3. Replace the property you're intested in
    tempSubCategoryItem.checked = !category_sub[id].checked
    // 4. Put item back into our temporary array
    tempSubCategoryObj[id] = tempSubCategoryItem
    // 5. Set the state to our new copy
    setCategory_sub(tempSubCategoryObj)
  }

  const handleTextureChange = (e, id) => {
    e.preventDefault()

    // 1. Make a shallow copy of the items
    let tempTextureObj = [...texture]
    // 2. Make a shallow copy of the item you want to mutate
    let tempTextureItem = {...tempTextureObj[id]}
    // 3. Replace the property you're intested in
    tempTextureItem.checked = !texture[id].checked
    // 4. Put item back into our temporary array
    tempTextureObj[id] = tempTextureItem
    // 5. Set the state to our new copy
    setTexture(tempTextureObj)
  }

  const setCaloriesHelper = e => {

    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = 900

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = calories_per_100_grams

    setCalories_per_100_grams(tempQty.toString()) 
  }

  const setCarbsHelper = e => {
    e.preventDefault()
    
    let tempQty = 0
    let min = 0
    let max = 100

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = grams_carbs_per_100g

    setGrams_carbs_per_100g(tempQty.toString()) 
  } 

  const setGramsFatHelper = e => {
    e.preventDefault()
    
    let tempQty = 0
    let min = 0
    let max = 100

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = grams_fat_per_100g

    setGrams_fat_per_100g(tempQty.toString()) 
  } 

  const setGramsFiberHelper = e => {
    e.preventDefault()
    
    let tempQty = 0
    let min = 0
    let max = 100

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = grams_fiber_per_100g

    setGrams_fiber_per_100g(tempQty.toString()) 
  }

  const setGramsSugarHelper = e => {
    e.preventDefault()
    
    let tempQty = 0
    let min = 0
    let max = 100

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = grams_sugar_per_100g

    setGrams_sugar_per_100g(tempQty.toString()) 
  }

  const setGramsProteinHelper = e => {
    e.preventDefault()
    
    let tempQty = 0
    let min = 0
    let max = 100

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = grams_protien_per_100g

    setGrams_protien_per_100g(tempQty.toString()) 
  }

  const setMgSodiumHelper = e => {
    e.preventDefault()
    
    let tempQty = 0
    let min = 0
    let max = 100000

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = mg_sodium_per_100g

    setMg_sodium_per_100g(tempQty.toString()) 
  }



  const cultivarYesClick = e => {
    e.preventDefault()
    setCultivarYes("#259944")
    setCultivarNo("lightgray")
    setHasCultivar(true)
  }

  const cultivarNoClick = e => {
    e.preventDefault()
    setCultivarNo("tomato")
    setCultivarYes("lightgray")
    setHasCultivar(false)
    setCultivar("")
  }

  const typeYesClick = e => {
    e.preventDefault()
    setTypeYes("#259944")
    setTypeNo("lightgray")
    setHasType(true)
  }

  const typeNoClick = e => {
    e.preventDefault()
    setTypeNo("tomato")
    setTypeYes("lightgray")
    setHasType(false)
  }

  // const cultivarBeforeClick = e => {
  //   e.preventDefault()
  //   setCultivarBefore("#259944")
  //   setCultivarAfter("lightgray")
  //   setCultivar_goes_before_name(true)
  // }

  // const cultivarAfterClick = e => {
  //   e.preventDefault()
  //   setCultivarAfter("tomato")
  //   setCultivarBefore("lightgray")
  //   setCultivar_goes_before_name(false)
  // }

  // const typeBeforeClick = e => {
  //   e.preventDefault()
  //   setTypeBefore("#259944")
  //   setTypeAfter("lightgray")
  //   setCultivar_goes_before_name(true)
  // }

  // const typeAfterClick = e => {
  //   e.preventDefault()
  //   setCultivarAfter("tomato")
  //   setCultivarBefore("lightgray")
  //   setCultivar_goes_before_name(false)
  // }


  const ingredientIsPreparedYesClick = e => {
    e.preventDefault()
    setIngredientIsPreparedYes("#259944")
    setIngredientIsPreparedNo("lightgray")
    setPrepared_as_show(true)
  }

  const ingredientIsPreparedNoClick = e => {
    e.preventDefault()
    setIngredientIsPreparedNo("tomato")
    setIngredientIsPreparedYes("lightgray")
    setPrepared_as_show(false)
  }

  const preparationMethodBeforeClick = e => {
    e.preventDefault()
    setPreparationMethodBefore("#259944")
    setPreparationMethodAfter("lightgray")
    setPrep_method_goes_before_name(true)
  }

  const preparationMethodAfterClick = e => {
    e.preventDefault()
    setPreparationMethodAfter("tomato")
    setPreparationMethodBefore("lightgray")
    setPrep_method_goes_before_name(false)
  }

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

      // Default to plural ingredient name
      if (selectedIngredient.name_plural) {
        newIngredientObj.name = selectedIngredient.name_plural
      } else {
        newIngredientObj.name = selectedIngredient.name
      }
      
      setIngredientList([...ingredientList, newIngredientObj])
      setIngredientError("")
      setSelectedIngredient(null)
    } 
  }

  const removeIngredient = e => {
    e.preventDefault()
    let index = e.target.attributes.idx.value

    setIngredientList(prev => {
      let newArr = prev.slice()
      newArr.splice(index,1)
      return newArr
    })
  }

  useEffect(() => {
    console.log(ingredientList)
  }, [ingredientList])

  const setShelfLifePantryUnopenedYearsHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = 50

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = shelf_life_pantry_unopnened_years

    setShelf_life_pantry_unopened_years(tempQty.toString())

    if (shelf_life_pantry_unopened_days) {
      setShelf_life_pantry_unopened_total_days(((parseInt(tempQty) * 365) + parseInt(shelf_life_pantry_unopened_days)).toString())
    } else {
      setShelf_life_pantry_unopened_total_days((tempQty * 365).toString())
    }
  }

  const setShelfLifePantryUnopenedDaysHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = 365

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = shelf_life_pantry_unopened_days

    setShelf_life_pantry_unopened_days(tempQty.toString())

    if (shelf_life_pantry_unopnened_years) {
      setShelf_life_pantry_unopened_total_days((parseInt(shelf_life_pantry_unopnened_years * 365) + parseInt(tempQty)).toString())
    } else {
      setShelf_life_pantry_unopened_total_days(tempQty.toString())
    }
  }

  const setShelfLifePantryOpenedYearsHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = 50

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = shelf_life_pantry_opened_years

    setShelf_life_pantry_opened_years(tempQty.toString())

    if (shelf_life_pantry_opened_days) {
      setShelf_life_pantry_opened_total_days(((parseInt(tempQty) * 365) + parseInt(shelf_life_pantry_opened_days)).toString())
    } else {
      setShelf_life_pantry_opened_total_days((tempQty * 365).toString())
    }
  }

  const setShelfLifePantryOpenedDaysHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = 365

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = shelf_life_pantry_opened_days

    setShelf_life_pantry_opened_days(tempQty.toString())

    if (shelf_life_pantry_opened_years) {
      setShelf_life_pantry_opened_total_days((parseInt(shelf_life_pantry_opened_years * 365) + parseInt(tempQty)).toString())
    } else {
      setShelf_life_pantry_opened_total_days(tempQty.toString())
    }
  }

  const setShelfLifeFridgeYearsHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = 5

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = shelf_life_fridge_years

    setShelf_life_fridge_years(tempQty.toString())

    if (shelf_life_fridge_days) {
      setShelf_life_fridge_total_days(((parseInt(tempQty) * 365) + parseInt(shelf_life_fridge_days)).toString())
    } else {
      setShelf_life_fridge_total_days((tempQty * 365).toString())
    }
  }

  const setShelfLifeFridgeDaysHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = 365

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = shelf_life_fridge_days

    setShelf_life_fridge_days(tempQty.toString())

    if (shelf_life_fridge_years) {
      setShelf_life_fridge_total_days((parseInt(shelf_life_fridge_years * 365) + parseInt(tempQty)).toString())
    } else {
      setShelf_life_fridge_total_days(tempQty.toString())
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    /////////////////////////////////
    //////////  Create ID  //////////
    /////////////////////////////////
    let uniqueId = name.substring(0,14) + 
    cultivar.substring(0,9)

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

    /////////////////////////////////
    ////////  End create ID  ////////
    /////////////////////////////////
  
    let data = {
      allergens: allergens.filter((item) => item.checked).map(item => item.name),
      // also_known_as_singular,
      // also_known_as_plural,
      availability,
      calories_per_100_grams,
      category: category.filter((item) => item.checked).map(item => item.name),
      category_sub: category_sub.filter((item) => item.checked).map(item => item.name),
      contains_sub_ingredients,
      createdAt: new Date().toString(),
      cultivar,
      cultivar_goes_before_name,
      dietCategory: dietCategoryList.filter((item) => item.checked).map(item => item.name),
      freezeability,
      grams_carbs_per_100g,
      grams_fat_per_100g,
      grams_fiber_per_100g,
      grams_sugar_per_100g,
      grams_protien_per_100g,
      ingredientId,
      ingredientList,
      hasCultivar,
      mg_sodium_per_100g,
      name,
      name_plural,
      needs_refrigeration,
      prep_method_goes_before_name,
      prepared_as,
      recipeId,
      shelflife_pantry_unopened_days: shelf_life_pantry_unopened_total_days,
      shelflife_pantry_opened_days: shelf_life_pantry_opened_total_days,
      shelf_life_fridge_days: shelf_life_fridge_total_days,
      spiciness,
      texture: texture.filter((item) => item.checked).map(item => item.name),
      type,
      updatedAt: new Date().toString(),
    }

    console.log(data)

    const newIngredient = doc(firestore, `ingredients/${ingredientId}`)
    setDoc(newIngredient, data)
    setDataHasBeenWrittenToDB(true)

  }

  // Scroll to top
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    } catch (error) {
      // for older browser
      window.scrollTo(0, 0)
    }
 }, []);

  // Redirect user when we get a data response
  useEffect(() => {
    if (dataHasBeenWrittenToDB) {
      history.push('/ingredients')
    }
  },[dataHasBeenWrittenToDB, history])


    /////////////////////////////////
    ////////       JSX       ////////
    /////////////////////////////////

  return (
    <div className="create">
      <h1 className="page-title"> Add a New Ingredient</h1>
      <form onSubmit={handleSubmit}>
        <div className="ingredientsSection1"> {/* SECTION 1 TOP */}
          <label><h4>Ingredient Name (singular):</h4></label>
          
          <input 
            type="text" 
            onChange={e=>setName(e.target.value)}
            value={name}
            placeholder="Apple" 
            required />
          <p>Just the ingredient name - do not include method of preparation, cultivar, or type</p>

          <label><h4>Ingredient Name (plural):</h4></label>
          
          <input 
            type="text" 
            onChange={e=>setName_plural(e.target.value)}
            value={name_plural}
            placeholder="Apples" /> 
          <p>Leave blank if ingredient name is uncountable like "shrimp" or "pasta"</p>

          {/* */}

          <h4>Does this ingredient have a specific type? (don't enter cultivar here)</h4>
          <div className="ingredientButtonContainer">
            <button 
              className="ingredientYesButton"
              onClick={typeYesClick}
              style={{backgroundColor: typeYes}}>
                Yes
            </button>
            <button 
            className="ingredientNoButton"
            onClick={typeNoClick}
            style={{backgroundColor: typeNo}}>
              No
            </button>
          </div>

          {hasType && <div>
            <label><h4>Specific Type: (not cultivar!)</h4></label>
            <input 
              type="text" 
              onChange={e=>setType(e.target.value)}
              value={type}
              placeholder="Parmesan, filet mignon etc." />
          </div>}

          {/* {hasType && <div>
            <h4>Should the type go before the ingredient name or after? (Before is recommended)</h4>
            <div className="ingredientButtonContainer">
              <button 
                className="ingredientYesButton"
                onClick={typeBeforeClick}
                style={{backgroundColor: typeBefore}}>
                  Before
              </button>
              <button 
                className="ingredientNoButton"
                onClick={typeAfterClick}
                style={{backgroundColor: typeAfter}}>
                  After
              </button>
            </div>
            <div style={{textAlign: "center"}}>
              <h3 style={{color: typeBefore}}>
                {type} {name.toLowerCase()}
              </h3>
              <h3 style={{color: typeAfter}}> {name} ({type}) </h3>
            </div>
          </div>} */}


          {/* */}




          <h4>Is this ingredient prepared in a certain way?</h4>
          <p>Examples: Dried, fresh, pickled, fillet, bone-in steak, etc.</p>
          <div className="ingredientButtonContainer">
            <button 
              className="ingredientYesButton"
              onClick={ingredientIsPreparedYesClick}
              style={{backgroundColor: ingredientIsPreparedYes}}>
                Yes
            </button>
            <button 
            className="ingredientNoButton"
            onClick={ingredientIsPreparedNoClick}
            style={{backgroundColor: ingredientIsPreparedNo}}>
              No
            </button>
          </div>

          {prepared_as_show && <div>
            <label><h4>Method of preparation:</h4></label>
            <input 
              type="text" 
              onChange={e=>setPrepared_as(e.target.value)}
              value={prepared_as}
              placeholder="Dried, fresh, pickled, fillet, bone-in steak, etc. " />
          </div>}



          {prepared_as_show && <div>
            <h4>Should the method of preparation go before or after the ingredient name?</h4>
            <div className="ingredientButtonContainer">
              <button 
                className="ingredientYesButton"
                onClick={preparationMethodBeforeClick}
                style={{backgroundColor: preparationMethodBefore}}>
                  Before
              </button>
              <button 
                className="ingredientNoButton"
                onClick={preparationMethodAfterClick}
                style={{backgroundColor: preparationMethodAfter}}>
                  After
              </button>
            </div>
            <div style={{textAlign: "center"}}>
              <h3 style={{color: preparationMethodBefore}}>
                {type} {prepared_as} {name.toLowerCase()}
                </h3>
              <h3 style={{color: preparationMethodAfter}}>
                {type} {name} {prepared_as.toLowerCase()}
                </h3>
            </div>
          </div>}

          <br />
          <hr />

          <h4>Does this ingredient have a specific cultivar?</h4>
          <div className="ingredientButtonContainer">
            <button 
              className="ingredientYesButton"
              onClick={cultivarYesClick}
              style={{backgroundColor: cultivarYes}}>
                Yes
            </button>
            <button 
            className="ingredientNoButton"
            onClick={cultivarNoClick}
            style={{backgroundColor: cultivarNo}}>
              No
            </button>
          </div>


          {hasCultivar && <div>
            <label><h4>Cultivar:</h4></label>
            <input 
              type="text" 
              onChange={e=>setCultivar(e.target.value)}
              value={cultivar}
              placeholder="Granny Smith, Parmesan, etc." />
          </div>}

          <hr style={{margin: "22px 0"}}/>


          <h4>Full ingredient name:</h4>
          <div style={{textAlign: "center"}}>
            <h3 style={{color: "#259944"}}>
              {type} {prepared_as} {name.toLowerCase()} {cultivar.length > 0 ? `'${cultivar}'` : ""}
            </h3>
          </div>


{/* 
          <label><h4>Alternate Name (singular):</h4></label>
          <input 
            type="text" 
            onChange={e=>setAlso_known_as_singular(e.target.value)}
            value={also_known_as_singular}
            placeholder="Ingredient (optional)" />
          
          <label><h4>Alternate Name (plural):</h4></label>
          <input 
            type="text" 
            onChange={e=>setAlso_known_as_plural(e.target.value)}
            value={also_known_as_plural}
            placeholder="Ingredient (optional)" /> */}
          
          <hr style={{margin: "22px 0"}}/>

          <p>Image drag and drop will go here.</p>
        
        <br />
        <hr style={{marginBottom: "22px"}}/>
        </div> {/* SECTION 1 BOTTOM */}
        <div className="ingredientsSection2"> {/* SECTION 2 TOP */}
          <div className="radioBtnRowContainer">
            <FormControl style={{width: "40%"}}>
              <RadioButtonsGroup groupTitle="Ingredient Category" items={category} setItems={setCategory} />
            </FormControl>
            <div className="verticalDivider"></div>
            <FormControl style={{width: "32%"}}>
              <CheckboxGroup groupTitle="Diet Category" items={dietCategoryList} setItems={setDietCategoryList}/>
            </FormControl>
            <div className="verticalDivider"></div>
            <FormControl style={{width: "28%"}}>
              <CheckboxGroup groupTitle="Allergens" items={allergens} setItems={setAllergens}/>
            </FormControl>  
          </div>



        
        <hr style={{marginTop: "22px"}}/>
        <h4>Specific catetory (check all that apply)</h4>
        <FormGroup className="ingredientCheckboxList" style={{maxHeight:`${category_sub.length * 21.5}px`}}>
            {category_sub.map(subCategory => (
              <FormControlLabel
                className="FormControlLabel"
                key={subCategory.id} 
                label={subCategory.name} 
                onChange={(e) => handleSubCategoryChange(e, subCategory.id)} 
                style={subCategory.categoryHeader ? {borderTop: "1px solid black", marginTop: "18.8px", paddingTop: "20.8px"} : {}}
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
        <hr style={{marginTop: "22px"}}/>


        <h4>Texture (check all that apply)</h4>
        <FormGroup className="textureCheckboxList" style={{maxHeight:`${texture.length * 19}px`}}>
            {texture.map(texture => (
              <FormControlLabel
                className="FormControlLabel"
                key={texture.id} 
                label={texture.name} 
                onChange={(e) => handleTextureChange(e, texture.id)} 
                style={texture.categoryHeader ? {borderTop: "1px solid black", marginTop: "18.9375px", paddingTop: "20.9375px"} : {}}
                control={
                  <Checkbox
                  style={{position: "relative", bottom: "3px"}}
                    className="Checkbox"
                    checked={texture.checked}
                    key={texture.id} 
                    inputProps={{ 'aria-label': 'controlled' }}/>
                } 
              />
            ))}        
          </FormGroup>
        <hr style={{marginTop: "22px"}}/>


      </div> {/* SECTION 2 BOTTOM */}


        <div> {/* SECTION 3 TOP */}
          <h4>Nutrition Info Per 100 Grams</h4>

          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={calories_per_100_grams.toString()}
              placeholder="1"
              onChange={setCaloriesHelper}
              required/>
              <div>calories (0-900)</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={grams_fat_per_100g.toString()}
              placeholder="1"
              onChange={setGramsFatHelper}
              required/>
              <div>grams of fat (0-100)</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={mg_sodium_per_100g.toString()}
              placeholder="1"
              onChange={setMgSodiumHelper}
              required/>
              <div>milligrams of sodium (0-100k)</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={grams_carbs_per_100g.toString()}
              placeholder="1"
              onChange={setCarbsHelper}
              required/>
              <div>grams of carbs (0-100)</div>
          </div>

          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={grams_fiber_per_100g.toString()}
              placeholder="1"
              onChange={setGramsFiberHelper}
              required/>
              <div>grams of fiber (0-100)</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={grams_sugar_per_100g.toString()}
              placeholder="1"
              onChange={setGramsSugarHelper}
              required/>
              <div>grams of sugar (0-100)</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={grams_protien_per_100g.toString()}
              placeholder="1"
              onChange={setGramsProteinHelper}
              required/>
              <div>grams of protein (0-100)</div>
          </div>


        
        </div> {/* SECTION 3 BOTTOM */}
        <hr />
        <div> {/* SECTION 4 TOP */}
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
         {/* ************************************** */}
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
              {ingredientList.length > 0 && <div>
                {ingredientList && ingredientList.map((ingredient, i)=>(
                  <div key={i} className="ingredientsList">
                    <div className="ingredientsListText">
                      {`${" "}`}
                      <img src={ingredient.imgUrlSm} alt={ingredient.name} style={{marginRight: "15px"}}></img>{`${" "}`}
                      {ingredient.cultivar && ingredient.cultivar}{`${" "}`}
                      {ingredient.name}{`${"  "}`}
                    </div>
                    <b onClick={removeIngredient} idx={i} style={{color:"tomato", cursor: "pointer", float: "right"}}>x </b>
                  </div>
                ))}
                <hr />
                <br />
              </div>}
              
              <div className="IngredientsDropdownContainer">
                <AutoCompleteMUI data={ingredientsFromDB} value={selectedIngredient} setValue={setSelectedIngredient}/>
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



          {/* ************************************** */}
          <hr />
        </div> {/* SECTION 4 BOTTOM */}
        <div> {/* SECTION 5 TOP */}
          <div className="ingredientSliders">
            <Box sx={{ width: "40%" }}>
                <label><h3>Availability:</h3></label>
              <Slider
                label="availability" 
                value={availability}
                onChange={(e) => {setAvailability(e.target.value)}}
                step={1}
                marks
                min={0}
                max={3}
              />
              {availability === 0 && <p style={{color: "Tomato"}}><b>Specialty Item</b></p>}
              {availability === 1 && <p style={{color: "Orange"}}><b>Seasonal Item</b></p>}
              {availability === 2 && <p style={{color: "Green"}}><b>Readily Available</b></p>}
              {availability === 3 && <p style={{color: "Black"}}><b>Staple item</b></p>}
            </Box>
            <Box sx={{ width: "40%" }}>
                <label><h3>Regrigerate?</h3></label>
              <Slider
                label="needs_refrigeration" 
                value={needs_refrigeration}
                onChange={(e) => {setNeeds_refrigeration(e.target.value)}}
                step={1}
                marks
                min={0}
                max={3}
              />
              {needs_refrigeration === 0 && <p style={{color: "Tomato"}}><b>Always</b></p>}
              {needs_refrigeration === 1 && <p style={{color: "Orange"}}><b>Prolongs life</b></p>}
              {needs_refrigeration === 2 && <p style={{color: "Green"}}><b>Not needed</b></p>}
              {needs_refrigeration === 3 && <p style={{color: "Black"}}><b>Don't refrigerate</b></p>}
            </Box>
          </div>
          <div className="ingredientSliders">
            <Box sx={{ width: "40%" }}>
                <label><h3>Freezability:</h3></label>
              <Slider
                label="freezability" 
                value={freezeability}
                onChange={(e)=> {setFreezeability(e.target.value)}}
                step={1}
                marks
                min={0}
                max={3}
              />
              {freezeability === 0 && <p style={{color: "Tomato"}}><b>Always</b></p>}
              {freezeability === 1 && <p style={{color: "Orange"}}><b>Freezable</b></p>}
              {freezeability === 2 && <p style={{color: "Green"}}><b>Not needed</b></p>}
              {freezeability === 3 && <p style={{color: "Black"}}><b>Don't freeze</b></p>}
            </Box>
            <Box sx={{ width: "40%" }}>

              <label><h3>Spiciness:</h3></label>
              <Slider
                label="rating" 
                value={spiciness}
                onChange={(e)=> {setSpiciness(e.target.value)}}
                step={1}
                marks
                min={0}
                max={3}
              />
              {spiciness === 0 && <p style={{height: "20px"}}><b>No spiciness</b></p>}
              {spiciness === 1 && <p style={{height: "20px"}}><b>🌶️</b></p>}
              {spiciness === 2 && <p style={{height: "20px"}}><b>🌶️🌶️</b></p>}
              {spiciness === 3 && <p style={{height: "20px"}}><b>🌶️🌶️🌶️</b></p>}
            </Box>
          </div>
        </div> {/* SECTION 5 BOTTOM */}
        <hr />
        <div> {/* SECTION 6 TOP */}
          <div> 
            <h4>Pantry Shelf Life, Unopened</h4>
            <p>Leave blank if ingredient is not sealed or if it should be stored in the fridge.</p>
            <div className="shelfLifeRow">
              <div className="nutritionInfoBox">
                <input 
                  type="text"
                  className="ingredientQty"
                  value={shelf_life_pantry_unopnened_years.toString()}
                  placeholder="0"
                  onChange={setShelfLifePantryUnopenedYearsHelper}/>
                  <div>years (0-30)</div>
              </div>
              <div className="nutritionInfoBox">
                <input 
                  type="text"
                  className="ingredientQty"
                  value={shelf_life_pantry_unopened_days.toString()}
                  placeholder="1"
                  onChange={setShelfLifePantryUnopenedDaysHelper}/>
                  <div>days (0-365)</div>
              </div>
            </div>
          </div> 
          <div>
            <h4>Pantry Shelf Life, Opened</h4>
            <p>Leave blank if ingredient should be stored in the fridge.</p>
            <div className="shelfLifeRow">
              <div className="nutritionInfoBox">
                <input 
                  type="text"
                  className="ingredientQty"
                  value={shelf_life_pantry_opened_years.toString()}
                  placeholder="0"
                  onChange={setShelfLifePantryOpenedYearsHelper}/>
                  <div>years (0-50)</div>
              </div>
              <div className="nutritionInfoBox">
                <input 
                  type="text"
                  className="ingredientQty"
                  value={shelf_life_pantry_opened_days.toString()}
                  placeholder="1"
                  onChange={setShelfLifePantryOpenedDaysHelper}/>
                  <div>days (0-365)</div>
              </div>
            </div>
          </div>
          <div>
            <h4>Refrigerated Shelf Life</h4>
            <p>Ingredients stored in fridge are assumed to be opened.</p>
            <div className="shelfLifeRow">
              <div className="nutritionInfoBox">
                <input 
                  type="text"
                  className="ingredientQty"
                  value={shelf_life_fridge_years.toString()}
                  placeholder="0"
                  onChange={setShelfLifeFridgeYearsHelper}/>
                  <div>years (0-5)</div>
              </div>
              <div className="nutritionInfoBox">
                <input 
                  type="text"
                  className="ingredientQty"
                  value={shelf_life_fridge_days.toString()}
                  placeholder="1"
                  onChange={setShelfLifeFridgeDaysHelper}/>
                  <div>days (0-365)</div>
              </div>
            </div>
          </div>
        </div> {/* SECTION 6 BOTTOM */}
        <hr />
        <button className="ingredientSubmitButton">Submit Ingredient</button>
       </form>
    </div>
  )
}
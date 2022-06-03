import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
//import { useFetch } from '../../hooks/useFetch'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./Create.css"
import stateCreate from './stateCreate';
import statObj from './mealTypeCreate'
import { useHistory } from 'react-router';

// Firebase
import { doc, setDoc } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/firebase-config'

export default function Create() {

  const [dataHasBeenWrittenToDB, setDataHasBeenWrittenToDB] = useState(false)
  
  // Basic Recipe Info
  const [title, setTitle] = useState(stateCreate.title)
  const [subtitle, setSubtitle] = useState(stateCreate.subtitle)
  const [description, setDescription] = useState(stateCreate.description)
  const [recipeImgUrl, setRecipeImgURL] = useState(stateCreate.recipeImgUrl)
  const [attributedTo, setAttributedTo] = useState(stateCreate.attributedTo)
  const [submittedBy, setSubmittedBy] = useState(stateCreate.submittedBy)
  const [createdAt, setCreatedAt] = useState(new Date().toString())
  const [updatedAt, setUpdatedAt] = useState(new Date().toString())


  // Ingredients
  const [newIngredientQty, setNewIngredientQty] = useState('')
  const [newIngredientUnit, setNewIngredientUnit] = useState('')
  const [newIngredientName, setNewIngredientName] = useState('')
  const [ingredients, setIngredients] = useState(stateCreate.ingredients)

  // Steps
  const [stepError, setStepError] = useState('')
  const [step, setStep] = useState('')
  const [stepImgURL, setStepImgURL] = useState('')
  const [subStep, setSubStep] = useState('')
  const [subSteps, setSubSteps] = useState([''])
  const [steps, setSteps] = useState(stateCreate.steps)

  // PrepTime
  const [activePrepTimeInputHours, setActivePrepTimeInputHours] = useState(stateCreate.prepTimeActiveHours)
  const [activePrepTimeInputMinutes, setActivePrepTimeInputMinutes] = useState(stateCreate.prepTimeActiveMinutes)
  const [totalTimeInputHours, setTotalTimeInputHours] = useState(stateCreate.prepTimeTotalHours)
  const [totalTimeInputMinutes, setTotalTimeInputMinutes] = useState(stateCreate.prepTimeTotalMinutes)

  // Stats
  const [difficulty, setDifficulty] = useState(stateCreate.difficulty) 
  const [rating, setRating] = useState(stateCreate.rating)
  const [freezability, setFreezability] = useState(stateCreate.freezeability)
  const [leftoverability, setLeftoverability] = useState(stateCreate.leftoverability)
  const [servings, setServings] = useState(0)
  const [mealType, setMealType] = useState(statObj.mealTypeObj)
  const [regionType, setRegionType] = useState(statObj.regionObj)
  const [celebrationType, setCelebrationType] = useState(statObj.celebrationObj)
  const [miscTagType, setMiscTagType] = useState(statObj.miscTagObj)


  // History
  const history = useHistory()

  while (false) {console.log(history,attributedTo,setAttributedTo,submittedBy,setSubmittedBy,createdAt,setCreatedAt,updatedAt,setUpdatedAt)}

  // INGREDIENTS
  const addIngredientQty = e => {
    e.preventDefault()
    // The validation below ensures only integers, fractions, or decimals are stored.

    let tempQty = "0"

    // limit quantity to 5 characters like 99999 or 9 3/4
    let truncatedQty = e.target.value.substring(0,5)

    // If qty contains a decimal (.)
    if (truncatedQty.match(/(\.)/)) {
      let regex1 = /([0-9]{0,4}\.[0-9]{0,2})/g
      tempQty = truncatedQty.match(regex1)
      // If qty contains a fraction symbol (/)
    } else if (truncatedQty.match(/(\/)/)) {
      let regex2 = /[0-9]{0,2}(?:\/[0-9]{0,2})/g
      tempQty = truncatedQty.match(regex2)

      // If qty is an integer
    } else if (Number.isInteger(parseInt(truncatedQty))) {
      tempQty = parseInt(truncatedQty)
    } else {
      // Default quantity to 0 if nothing else matches
      tempQty = "0"
    }
    setNewIngredientQty(tempQty.toString())
  }

  const addIngredientUnit = e => {
    e.preventDefault()
    setNewIngredientUnit(e.target.value)
  }

  const addIngredientName = e => {
    e.preventDefault()
    setNewIngredientName(e.target.value)
  }

  const addIngredientToIngredients = e => {
    e.preventDefault()

    // Ingredients will be matched automatically to stored ingredients in the database
    let newIngredientObj = {
      name: newIngredientName,
      qty: newIngredientQty,
      unit: newIngredientUnit,
    }

    setIngredients([...ingredients, newIngredientObj])

  }

  const removeIngredient = e => {
    e.preventDefault()
    let index = e.target.attributes.idx.value

    setIngredients(prev => {
      let newArr = prev.slice()
      newArr.splice(index,1)
      return newArr
    })
  }

  // STEPS
  const editSubStep = (e) => {
    e.preventDefault()
    let index = e.target.attributes.idx.value
    let value = e.target.value
    setSubSteps(prev => {
      let newArr = prev.slice()
      newArr.splice(index, 1, value)
      return newArr
    })
  }

  const removeSubStep = e => {
    e.preventDefault()
    let index = e.target.attributes.idx.value

    setSubSteps(prev => {
      let newArr = prev.slice()
      newArr.splice(index,1)
      return newArr
    })
  }

  const addSubStep = (e) => {
    e.preventDefault()
    if (step.length < 1) {
      setStepError(`Please add Step ${steps.length + 1} first!`)
    } else {
      setStepError("")
      setSubSteps([...subSteps, subStep])
    }   
  }

  const submitStep = (e) => {
    e.preventDefault()

    if (step.length < 1) {
      setStepError(`Please add Step ${steps.length + 1} first!`)
    } else {
      setStepError("")

      let tempSubSteps = [...subSteps]

      // Truncate any empty subSteps
      let trunctSubSteps = tempSubSteps.filter(subStep => subStep.length > 0)
      

      let tempStep = {
        imgUrlLg: stepImgURL,
        imgUrlSm: "",
        mainStep: step,
        subSteps: trunctSubSteps
      }
      
      setSteps([...steps, tempStep])
    }
  }

  const removeStep = (e) => {
    e.preventDefault()
    setStepError("")
    
    let index = e.target.attributes.idx.value

    setSteps(prev => {
      let newArr = prev.slice()
      newArr.splice(index,1)
      return newArr
    })
  }

  // PREP TIME
  const changeActivePrepTime = (value, hoursOrMinutes) => {

    let val = parseInt(value)

    let maxHours = 16
    let maxMinutes = 59

    if (hoursOrMinutes === "hours" && val >= 0 && val <= maxHours) {

      if (val > totalTimeInputHours) setTotalTimeInputHours(val)
      setActivePrepTimeInputHours(val)

    } else if (hoursOrMinutes === "minutes" && val >= 0 && val <= maxMinutes) {

      if (val > totalTimeInputMinutes) setTotalTimeInputMinutes(val)
      setActivePrepTimeInputMinutes(val)
    }
  }

  // SERVINGS
  const changeServings = (e) => {
    if (e.target.value >= 0 && e.target.value <= 100) {
      setServings(e.target.value)
    }
  }

  // TOTAL TIME
  const changeTotalTime = (value, hoursOrMinutes) => {

    let val = parseInt(value)

    let maxHours = 24
    let maxMinutes = 59
    
    if (hoursOrMinutes === "hours" && val >= 0 && val <= maxHours) {

      // Make sure total time isn't more than active prep time
      if (val < activePrepTimeInputHours) setActivePrepTimeInputHours(val)
      setTotalTimeInputHours(val)
      
    } else if (hoursOrMinutes === "minutes" && val >= 0 && val <= maxMinutes) {

      // Make sure total time isn't more than active prep time
      if (val < activePrepTimeInputMinutes) setActivePrepTimeInputMinutes(val)
      setTotalTimeInputMinutes(val)
      
    }
  }

  // CHECKBOXES
  const handleCheckboxChange = (e, id, stateItem, setStateItem) => {
    e.preventDefault()

    // 1. Make a shallow copy of the items
    let tempMealTypeObj = [...stateItem]
    // 2. Make a shallow copy of the item you want to mutate
    let tempMealType = {...tempMealTypeObj[id]}
    // 3. Replace the property you're intested in
    tempMealType.checked = !stateItem[id].checked
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    tempMealTypeObj[id] = tempMealType
    // 5. Set the state to our new copy
    setStateItem(tempMealTypeObj)
  }
  
  useEffect(() => {
    setNewIngredientQty('')
    setNewIngredientUnit('')
    setNewIngredientName('')
  },[ingredients])

  useEffect(() => {
    setStep('')
    setStepImgURL('')
    setSubStep('')
    setSubSteps([''])
  },[steps])


  const handleSubmit = e => {
    e.preventDefault() 

    ////////////////////////////////
    // TODO: Allergen computation //
    ////////////////////////////////
    
    // Note: If in edit mode, disable setCreatedAt()
    setCreatedAt(new Date().toString())
    setUpdatedAt(new Date().toString())

    let data = {
      allergens : [""],
      attributedTo : "",
      celebrationTypes: celebrationType.filter((item) => item.checked).map(item => item.name),
      createdAt,
      description,
      dietCategory: [""],
      difficulty : difficulty.toString(),
      freezability: freezability.toString(),
      ingredients,
      leftoverability : leftoverability.toString(),
      mealTypes: mealType.filter((item) => item.checked).map(item => item.name),
      prepTimeAactiveHours: activePrepTimeInputHours.toString(),
      prepTimeActiveMinutes: activePrepTimeInputMinutes.toString(),
      prepTimeTotalHours: totalTimeInputHours.toString(),
      prepTimeTotalMinutes: totalTimeInputMinutes.toString(),
      rating : rating.toString(),
      recipeImgUrl,
      region: regionType.filter((item) => item.checked).map(item => item.name),
      servings: servings.toString(),
      steps,
      submittedBy: "",
      subtitle,
      tags: miscTagType.filter((item) => item.checked).map(item => item.name),
      title,
      updatedAt,
      uuid: uuidv4()
    }

    // console.log(data)

    // Write data to firestore

    const newRecipe = doc(firestore, `recipes/${uuidv4()}`)
    setDoc(newRecipe, data)
    setDataHasBeenWrittenToDB(true)
  }

  // Redirect user when we get a data response
  useEffect(() => {
    if (dataHasBeenWrittenToDB) {
      history.push('/')
    }
  },[dataHasBeenWrittenToDB, history])
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="create">
      
      
      <h1 className="page-title"> Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div> {/* COLLAPSE INGREDIENTS TOP */}
          <label><h4>Title:</h4></label>
            <input 
              type="text" 
              onChange={e=>setTitle(e.target.value)}
              value={title}
              placeholder="Artichoke Carbonara"
              required />
          <label><h5>Subtitle:</h5></label>
          <input 
            type="text" 
            onChange={e=>setSubtitle(e.target.value)}
            value={subtitle}
            placeholder="with Pancetta and Pecorino Romano"
            required />
          <label><h5>Description:</h5></label>
          <textarea
            className="recipeDescription"
            onChange={e=>setDescription(e.target.value)}
            value={description}
            placeholder="Sautéed artichokes with leeks and pancetta make a hearty, earthy sauce for pasta, brightened by a squeeze of lemon and some herbal dry vermouth."
            required />   
          <label><span>Recipe Image URL:</span></label>
          <input 
                type="text" 
                value={recipeImgUrl} 
                placeholder="add recipe image URL here"
                onChange={(e) => setRecipeImgURL(e.target.value)}
                />
          <br />
          <hr />
          <label><h3>Ingredients:</h3></label> 
            <div className="ingredients">
              {ingredients.length > 0 && <div>
                {ingredients && ingredients.map((ingredient, i)=>(
                  <div key={i}>
                    <b onClick={removeIngredient} idx={i} style={{color:"tomato", cursor: "pointer"}}>x </b>
                    {ingredient.qty} {ingredient.unit} {ingredient.name}
                  </div>
                ))}
              </div>}
              <div className="ingredientQtyAndUnit">
                <div>
                  <label><span>Quantity:</span></label>
                  <input 
                    type="text"
                    className="ingredientQty"
                    value={newIngredientQty.toString()}
                    placeholder="1"
                    onChange={addIngredientQty}/>
                </div>
                <div>
                  <label><span>Unit/Size:</span></label> 
                  <input 
                    type="text" 
                    className="ingredientUnit"
                    value={newIngredientUnit} 
                    placeholder="medium"
                    onChange={addIngredientUnit}/>
                </div>
              </div>
        
              <label><span>Ingredient Name:</span></label>
              <input 
                type="text" 
                value={newIngredientName} 
                placeholder="yellow onion"
                onChange={addIngredientName}/>
              
              <button className="btn" onClick={addIngredientToIngredients}>Add ingredient</button> 

            </div>
          </div> {/* COLLAPSE INGREDIENTS BOTTOM */}
        <hr />
        <div> {/* COLLAPSE STEPS TOP*/}
          {steps.length === 0 ? <h3>Steps</h3> : <div>

            {steps && steps.map((step, i)=>(
              <div key={i}>
                <h4><b onClick={removeStep} idx={i} style={{color:"tomato", cursor: "pointer"}}>x </b>Step {i+1}: {step.mainStep}</h4>
                
                <ul>
                  {step.subSteps.map((subStep, j) => {
                    return <li key={j}>{subStep}</li>
                  })}
                </ul>
              </div>
            ))}
            <hr />
          </div>}
          <label><h4>Step {steps.length + 1}:</h4></label>
          <textarea 
            onChange={e=>{setStep(e.target.value); setStepError("")}}
            value={step}/>

          <label><span>Step {steps.length + 1} Image URL:</span></label>
          <input 
                type="text" 
                value={stepImgURL} 
                placeholder="add step image URL here"
                onChange={(e) => setStepImgURL(e.target.value)}
                />
          <div style={{"marginLeft": "20px"}}>
            <label>{subSteps.length > 1 ? <h5>Sub-steps:</h5>:<h5>Sub-step:</h5>}</label>
            <ul>
            {subSteps.map((subStep, i)=>(
              <li key={i}>
                  <b onClick={removeSubStep} idx={i} style={{color:"tomato", cursor: "pointer"}}>x </b>
                  <textarea 
                    onChange={editSubStep}
                    idx={i}
                    value={subSteps[i]}
                  />
              </li>
            ))}
            </ul>

          </div> {/* COLLAPSE STEPS BOTTOM*/}
          {stepError && <b className="error">{stepError}</b>}
          <button className="btn" onClick={addSubStep}>Add sub-step</button>
          
          <button className="btn" onClick={submitStep}>Submit Step {steps.length + 1}</button>

          <hr />
        </div> 
        <div> {/* COLLAPSE PREP TIME TOP */}
        <label><h3>Active Prep Time:</h3></label>
        <p>Time actively spent in the kitchen</p>
        <input
          className="cookingTime"
          type="number"
          value={activePrepTimeInputHours}
          onChange={e=>changeActivePrepTime(e.target.value, "hours")}
        ></input><span>&nbsp;Hours&nbsp;&nbsp;&nbsp;</span>
        <input
          className="cookingTime"
          type="number"
          value={activePrepTimeInputMinutes}
          onChange={e=>changeActivePrepTime(e.target.value, "minutes")}
        ></input><span>&nbsp;Minutes</span>
        <hr />
        <label><h3>Total Time:</h3></label>
        <p>Total time from start to finish</p>
        <input
          className="cookingTime"
          type="number"
          value={totalTimeInputHours}
          onChange={e=>changeTotalTime(e.target.value, "hours")}
        ></input><span>&nbsp;Hours&nbsp;&nbsp;&nbsp;</span>
        <input
          className="cookingTime"
          type="number"
          value={totalTimeInputMinutes}
          onChange={e=>changeTotalTime(e.target.value, "minutes")}
        ></input><span>&nbsp;Minutes</span>
        </div> {/* COLLAPS PREP TIME BOTTOM */}
        <hr />
        <div> {/* COLLAPSE SERVINGS TOP */}
        <label><h3>Servings:</h3></label>
        <input
          className="cookingTime"
          type="number"
          value={servings}
          onChange={changeServings}
        ></input><span>&nbsp;Servings (total)</span>
        <hr />
        </div> {/* COLLAPSE SERVINGS BOTTOM */}


        <div> {/* COLLAPSE CHECKBOXES TOP */}
          <label><h3>Meal Type:</h3></label>
          <p>Select all that apply</p>
          {/* setting maxHeight to roughly half the content height forces two flexbox columns, arranged alphabetically */}
          <FormGroup className="checkboxList" style={{maxHeight:`${mealType.length * 21}px`}}>
            {mealType.map(meal => (
              <FormControlLabel
                className="FormControlLabel"
                key={meal.id} 
                label={meal.name} 
                control={
                  <Checkbox
                    className="Checkbox"
                    checked={meal.checked}
                    key={meal.id} 
                    onChange={(e) => handleCheckboxChange(e, meal.id, mealType, setMealType)} 
                    inputProps={{ 'aria-label': 'controlled' }}/>
                } 
              />
            ))}        
          </FormGroup>
          <br />
          <hr />

          <label><h3>Region Type:</h3></label>
          <p>Select all that apply</p>
          {/* setting maxHeight to roughly half the content height forces two flexbox columns, arranged alphabetically */}
          <FormGroup className="checkboxList" style={{maxHeight:`${regionType.length * 19.2}px`}}>
            {regionType.map(region => (
              <FormControlLabel
                className="FormControlLabel"
                key={region.id} 
                label={region.name} 
                control={
                  <Checkbox
                    className="Checkbox"
                    checked={region.checked}
                    key={region.id} 
                    onChange={(e) => handleCheckboxChange(e, region.id, regionType, setRegionType)} 
                    inputProps={{ 'aria-label': 'controlled' }}/>
                } 
              />
            ))}
          </FormGroup>

          <br />
          <hr />
          <label><h3>Associated Celebrations:</h3></label>
          <p>Select all that apply</p>
          {/* setting maxHeight to roughly half the content height forces two flexbox columns, arranged alphabetically */}
          <FormGroup className="checkboxList" style={{maxHeight:`${celebrationType.length * 20}px`}}>
            {celebrationType.map(celebration => (
              <FormControlLabel
                className="FormControlLabel"
                key={celebration.id} 
                label={celebration.name} 
                control={
                  <Checkbox
                    className="Checkbox"
                    checked={celebration.checked}
                    key={celebration.id} 
                    onChange={(e) => handleCheckboxChange(e, celebration.id, celebrationType, setCelebrationType)} 
                    inputProps={{ 'aria-label': 'controlled' }}/>
                } 
              />
            ))}
          </FormGroup>
          <br />
          <hr />
          <label><h3>Miscellaneous Labels:</h3></label>
          <p>Select all that apply</p>
          {/* setting maxHeight to roughly half the content height forces two flexbox columns, arranged alphabetically */}
          <FormGroup className="checkboxList" style={{maxHeight:`${miscTagType.length * 19.5}px`}}>
            {miscTagType.map(miscTag => (
              <FormControlLabel
                className="FormControlLabel"
                key={miscTag.id} 
                label={miscTag.name} 
                control={
                  <Checkbox
                    className="Checkbox"
                    checked={miscTag.checked}
                    key={miscTag.id} 
                    onChange={(e) => handleCheckboxChange(e, miscTag.id, miscTagType, setMiscTagType)} 
                    inputProps={{ 'aria-label': 'controlled' }}/>
                } 
              />
            ))}
          </FormGroup>
        </div> {/* COLLAPSE CHECKBOXES BOTTOM */}
        <div> {/* COLLAPSE SLIDERS TOP */}
          <br />
          <hr />
          <div className="difficultySliders">
            <Box sx={{ width: "40%" }}>
                <label><h3>Difficulty:</h3></label>
              <Slider
                label="difficulty" 
                value={difficulty}
                onChange={(e) => {setDifficulty(e.target.value)}}
                step={1}
                marks
                min={0}
                max={3}
              />
              {difficulty === 0 && <p style={{color: "Green"}}><b>Beginner</b></p>}
              {difficulty === 1 && <p style={{color: "Orange"}}><b>Intermediate</b></p>}
              {difficulty === 2 && <p style={{color: "Tomato"}}><b>Advanced</b></p>}
              {difficulty === 3 && <p style={{color: "#333"}}><b>Expert</b></p>}
            </Box>
            <Box sx={{ width: "40%" }}>

              <label><h3>Rating:</h3></label>
              <Slider
                label="rating" 
                value={rating}
                onChange={(e)=> {setRating(e.target.value)}}
                step={1}
                marks
                min={0}
                max={4}
              />
              {rating === 0 && <p><b>⭐️</b></p>}
              {rating === 1 && <p><b>⭐️⭐️</b></p>}
              {rating === 2 && <p><b>⭐️⭐️⭐️</b></p>}
              {rating === 3 && <p><b>⭐️⭐️⭐️⭐️</b></p>}
              {rating === 4 && <p><b>⭐️⭐️⭐️⭐️⭐️</b></p>}
            </Box>
          </div>
          <br />


          <div className="difficultySliders">
            <Box sx={{ width: "40%" }}>
                <label><h3>Freezability:</h3></label>
              <Slider
                label="freezability" 
                value={freezability}
                onChange={(e)=> {setFreezability(e.target.value)}}
                step={1}
                marks
                min={0}
                max={2}
              />
              {freezability === 0 && <p style={{color: "Tomato"}}><b>Unfreezeable</b></p>}
              {freezability === 1 && <p style={{color: "Orange"}}><b>Freezable?</b></p>}
              {freezability === 2 && <p style={{color: "Green"}}><b>Freezeable</b></p>}
            </Box>
            <Box sx={{ width: "40%" }}>

              <label><h3>Leftovers:</h3></label>
              <Slider
                label="leftoverability" 
                value={leftoverability}
                onChange={(e)=> {setLeftoverability(e.target.value)}}
                step={1}
                marks
                min={0}
                max={3}
              />
              {leftoverability === 0 && <p style={{color: "#333"}}><b>Must eat fresh</b></p>}
              {leftoverability === 1 && <p style={{color: "Tomato"}}><b>Poor leftovers</b></p>}
              {leftoverability === 2 && <p style={{color: "#718f94"}}><b>Good leftovers</b></p>}
              {leftoverability === 3 && <p style={{color: "Green", fontSize: "1.19em"}}><b>Great leftovers</b></p>}
            </Box>
          </div>
        </div> {/* COLLAPSE SLIDERS BOTTOM */}
        <hr />
        <label><h4>Attributed to:</h4></label>
            <input 
              type="text" 
              onChange={e=>setAttributedTo(e.target.value)}
              value={attributedTo}
              placeholder="Recipe creator's name"
              required />
        <hr />
        <button className="btn">Submit Recipe</button>
        <hr />
      </form>
      <br />
    </div>
  )
}

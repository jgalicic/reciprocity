import { memo } from 'react'

const Form03Nutrition = ({
  calories_per_100_grams, setCalories_per_100_grams,
  grams_fat_per_100g, setGrams_fat_per_100g,
  mg_sodium_per_100g, setMg_sodium_per_100g,
  grams_carbs_per_100g, setGrams_carbs_per_100g,
  grams_fiber_per_100g, setGrams_fiber_per_100g,
  grams_sugar_per_100g, setGrams_sugar_per_100g,
  grams_protien_per_100g, setGrams_protien_per_100g
}) => {


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

    /////////////////////////////////
    ////////       JSX       ////////
    /////////////////////////////////

  return (

    <div> 
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

    </div> 
  )
}

export default memo(Form03Nutrition)
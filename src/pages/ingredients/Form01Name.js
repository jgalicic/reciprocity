import { useState, useEffect, memo } from 'react'
import "./AddIngredient.css"

const Form01Name = ({
  name, setName,
  name_plural, setName_plural,
  type, setType,
  prepared_as, setPrepared_as,
  cultivar, setCultivar,
  display_name, setDisplay_name,
  disableInputControl
}) => {

  // CSS Class States
  const [typeYes, setTypeYes] = useState("#718f94")
  const [typeNo, setTypeNo] = useState("#718f94")
  const [cultivarYes, setCultivarYes] = useState("#718f94")
  const [cultivarNo, setCultivarNo] = useState("#718f94")
  const [ingredientIsPreparedYes, setIngredientIsPreparedYes] = useState("#718f94")
  const [ingredientIsPreparedNo, setIngredientIsPreparedNo] = useState("#718f94")

  // Helper Boolean States
  const [hasType, setHasType] = useState(false) 
  const [prepared_as_show, setPrepared_as_show] = useState(false) 
  const [hasCultivar, setHasCultivar] = useState(false) 

  useEffect(() => {
    if (type.length > 0) setHasType(true)
    if (prepared_as.length > 0) setPrepared_as_show(true)
    if (cultivar.length > 0) setHasCultivar(true)
    
  }, [type, prepared_as, cultivar])

  // For edit mode
  useEffect(() => {
    if (hasType) {
      setTypeYes("#259944")
      setTypeNo("lightgray")
    } else {
      setTypeNo("tomato")
      setTypeYes("lightgray")
    }

    if (prepared_as_show) {
      setIngredientIsPreparedYes("#259944")
      setIngredientIsPreparedNo("lightgray")
    } else {
      setIngredientIsPreparedNo("tomato")
      setIngredientIsPreparedYes("lightgray")
    }

    if (hasCultivar) {
      setCultivarYes("#259944")
      setCultivarNo("lightgray")
    } else {
      setCultivarNo("tomato")
      setCultivarYes("lightgray")
    }
  },[hasType, prepared_as_show, hasCultivar])


  // Button clicks
  const typeYesClick = e => {
    if (e) e.preventDefault()
    setTypeYes("#259944")
    setTypeNo("lightgray")
    setHasType(true)
  }

  const typeNoClick = e => {
    if (e) e.preventDefault()
    setTypeNo("tomato")
    setTypeYes("lightgray")
    setHasType(false)
    setType("")
  }

  const ingredientIsPreparedYesClick = e => {
    if (e) e.preventDefault()
    setIngredientIsPreparedYes("#259944")
    setIngredientIsPreparedNo("lightgray")
    setPrepared_as_show(true)
  }

  const ingredientIsPreparedNoClick = e => {
    if (e) e.preventDefault()
    setIngredientIsPreparedNo("tomato")
    setIngredientIsPreparedYes("lightgray")
    setPrepared_as_show(false)
    setPrepared_as("")
  }

  const cultivarYesClick = e => {
    if (e)  e.preventDefault()
    setCultivarYes("#259944")
    setCultivarNo("lightgray")
    setHasCultivar(true)
  }

  const cultivarNoClick = e => {
    if (e) e.preventDefault()
    setCultivarNo("tomato")
    setCultivarYes("lightgray")
    setHasCultivar(false)
    setCultivar("")
  }


  useEffect(() => {
    let tempDN = ""

    if (hasType && prepared_as_show && hasCultivar) tempDN = `${type} ${name.toLowerCase()}${prepared_as.length > 0 ? ",":""} ${prepared_as} '${cultivar}'`
    else if (hasType && prepared_as_show)  tempDN =`${type} ${name.toLowerCase()}${prepared_as.length > 0 ? ",":""} ${prepared_as.toLowerCase()}`
    else if (hasType && hasCultivar) tempDN = `${type} ${name.toLowerCase()}'${cultivar}'`
    else if (hasType) tempDN = `${type} ${name.toLowerCase()}`
    else if (prepared_as_show && hasCultivar) tempDN = `${name}${prepared_as.length > 0 ? ",":""} ${prepared_as.toLowerCase()} '${cultivar}'`
    else if (prepared_as_show) tempDN = `${name}${prepared_as.length > 0 ? ",":""} ${prepared_as.toLowerCase()}`
    else if (hasCultivar) tempDN = `${name} '${cultivar}'`
    else tempDN = `${name}`

    setDisplay_name(tempDN)

  }, [hasType, prepared_as_show, hasCultivar, type, prepared_as, cultivar, name, setDisplay_name])


    /////////////////////////////////
    ////////       JSX       ////////
    /////////////////////////////////

  return (
    <div className="ingredientsSection1"> 
      <label><h4>Base Ingredient Name (singular):</h4></label>
      
      <input 
        type="text" 
        onChange={e=>setName(e.target.value)}
        disabled={disableInputControl}
        value={name}
        placeholder="Apple" 
        required />
      <p>Just the base ingredient name - do not include method of preparation, cultivar, or type</p>

      <label><h4>Base Ingredient Name (plural):</h4></label>
      
      <input 
        type="text" 
        onChange={e=>setName_plural(e.target.value)}
        value={name_plural}
        placeholder="Apples" /> 
      <p>Leave blank if ingredient name is uncountable like "shrimp" or "pasta"</p>

      <hr style={{margin: "22px 0"}}/>
      
      <h4>Does this ingredient have a specific type?</h4>
      <p>Examples: Parmesan, Irish, yellow, etc.</p>
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
        <label><h4>Specific Type:</h4></label>
        <input 
          type="text" 
          onChange={e=>setType(e.target.value)}
          value={type}
          placeholder="Parmesan, filet mignon etc." />
          <p>Don't enter cultivar here</p>
      </div>
      }
      <hr style={{margin: "22px 0"}}/>

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
          {display_name}
        </h3>
      </div>

      <hr style={{margin: "22px 0"}}/>
      <br />

    </div>
  )
}

export default memo(Form01Name)
import { useState, useEffect, memo } from 'react'

const Form06Shelf = ({
  shelf_life_pantry_unopened_total_days, setShelf_life_pantry_unopened_total_days,
  shelf_life_pantry_opened_total_days, setShelf_life_pantry_opened_total_days,
  shelf_life_fridge_total_days, setShelf_life_fridge_total_days,
  shelf_life_freezer_total_days, setShelf_life_freezer_total_days
}) => {

  // console.log(
  //   "\nshelf_life_pantry_unopened_total_days",shelf_life_pantry_unopened_total_days,
  //   "\nshelf_life_pantry_opened_total_days",shelf_life_pantry_opened_total_days,
  //   "\nshelf_life_fridge_total_days",shelf_life_fridge_total_days,
  //   "\nshelf_life_freezer_total_days",shelf_life_freezer_total_days,
  // )

  const MAX_UNOPENED_YEARS = 50
  const MAX_UNOPENED_DAYS = 365
  const MAX_OPENED_YEARS = 50
  const MAX_OPENED_DAYS = 365
  const MAX_FRIDGE_YEARS = 5
  const MAX_FRIDGE_DAYS = 365
  const MAX_FREEZER_YEARS = 5
  const MAX_FREEZER_DAYS = 365

  // Helper state hooks
  const [shelf_life_pantry_unopnened_years, setShelf_life_pantry_unopened_years] = useState("")
  const [shelf_life_pantry_unopened_days, setShelf_life_pantry_unopened_days] = useState("")
  const [shelf_life_pantry_opened_years, setShelf_life_pantry_opened_years] = useState("")
  const [shelf_life_pantry_opened_days, setShelf_life_pantry_opened_days] = useState("")
  const [shelf_life_fridge_years, setShelf_life_fridge_years] = useState("")
  const [shelf_life_fridge_days, setShelf_life_fridge_days] = useState("")
  const [shelf_life_freezer_years, setShelf_life_freezer_years] = useState("")
  const [shelf_life_freezer_days, setShelf_life_freezer_days] = useState("")

  useEffect(() => {
    if (shelf_life_pantry_unopened_total_days > 0 && shelf_life_pantry_unopened_total_days < 365) {
      setShelf_life_pantry_unopened_years("0")
      setShelf_life_pantry_unopened_days(shelf_life_pantry_unopened_total_days.toString())
    } else if (shelf_life_pantry_unopened_total_days >= 365) {
      setShelf_life_pantry_unopened_years(Math.floor(shelf_life_pantry_unopened_total_days/365).toString())
      setShelf_life_pantry_unopened_days((shelf_life_pantry_unopened_total_days%365).toString())
    }
  }, [shelf_life_pantry_unopened_total_days])

  useEffect(() => {
    if (shelf_life_pantry_opened_total_days > 0 && shelf_life_pantry_opened_total_days < 365) {
      setShelf_life_pantry_opened_years("0")
      setShelf_life_pantry_opened_days(shelf_life_pantry_opened_total_days.toString())
    } else if (shelf_life_pantry_opened_total_days >= 365) {
      setShelf_life_pantry_opened_years(Math.floor(shelf_life_pantry_opened_total_days/365).toString())
      setShelf_life_pantry_opened_days((shelf_life_pantry_opened_total_days%365).toString())
    }
  }, [shelf_life_pantry_opened_total_days])

  useEffect(() => {
    if (shelf_life_fridge_total_days > 0 && shelf_life_fridge_total_days < 365) {
      setShelf_life_fridge_years("0")
      setShelf_life_fridge_days(shelf_life_fridge_total_days.toString())
    } else if (shelf_life_fridge_total_days >= 365) {
      setShelf_life_fridge_years(Math.floor(shelf_life_fridge_total_days/365).toString())
      setShelf_life_fridge_days((shelf_life_fridge_total_days%365).toString())
    }
  }, [shelf_life_fridge_total_days])

  useEffect(() => {
    if (shelf_life_freezer_total_days > 0 && shelf_life_freezer_total_days < 365) {
      setShelf_life_freezer_years("0")
      setShelf_life_freezer_days(shelf_life_freezer_total_days.toString())
    } else if (shelf_life_freezer_total_days >= 365) {
      setShelf_life_freezer_years(Math.floor(shelf_life_freezer_total_days/365).toString())
      setShelf_life_freezer_days((shelf_life_freezer_total_days%365).toString())
    }
  }, [shelf_life_freezer_total_days])

  const setShelfLifePantryUnopenedYearsHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = MAX_UNOPENED_YEARS

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
    let max = MAX_UNOPENED_DAYS

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
    let max = MAX_OPENED_YEARS

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
    let max = MAX_OPENED_DAYS

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
    let max = MAX_FRIDGE_YEARS

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
    let max = MAX_FRIDGE_DAYS

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

  const setShelfLifeFreezerYearsHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = MAX_FREEZER_YEARS

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = shelf_life_freezer_years

    setShelf_life_freezer_years(tempQty.toString())

    if (shelf_life_freezer_days) {
      setShelf_life_freezer_total_days(((parseInt(tempQty) * 365) + parseInt(shelf_life_freezer_days)).toString())
    } else {
      setShelf_life_freezer_total_days((tempQty * 365).toString())
    }
  }


  const setShelfLifeFreezerDaysHelper = e => {
    e.preventDefault()

    let tempQty = 0
    let min = 0
    let max = MAX_FREEZER_DAYS

    if (Number.isInteger(parseInt(e.target.value)) && 
      parseInt(e.target.value) >= min && 
      parseInt(e.target.value) <= max) {
      tempQty = parseInt(e.target.value)
    } else if (parseInt(e.target.value) > max) tempQty = shelf_life_freezer_days

    setShelf_life_freezer_days(tempQty.toString())

    if (shelf_life_freezer_years) {
      setShelf_life_freezer_total_days((parseInt(shelf_life_freezer_years * 365) + parseInt(tempQty)).toString())
    } else {
      setShelf_life_freezer_total_days(tempQty.toString())
    }
  }

  return (
    <div> 
      <div> 
        <h4>Pantry Shelf Life, Unopened</h4>
        <p>Only applicable to factory-sealed items.</p>
        <div className="shelfLifeRow">
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={shelf_life_pantry_unopnened_years.toString()}
              placeholder="0"
              onChange={setShelfLifePantryUnopenedYearsHelper}/>
              <div>years (0-{MAX_UNOPENED_YEARS.toString()})</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={shelf_life_pantry_unopened_days.toString()}
              placeholder="0"
              onChange={setShelfLifePantryUnopenedDaysHelper}/>
              <div>days (0-{MAX_UNOPENED_DAYS.toString()})</div>
          </div>
        </div>
      </div> 

      <div>
        <h4>Pantry Shelf Life, Opened</h4>
        <div className="shelfLifeRow">
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={shelf_life_pantry_opened_years.toString()}
              placeholder="0"
              onChange={setShelfLifePantryOpenedYearsHelper}/>
              <div>years (0-{MAX_OPENED_YEARS.toString()})</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={shelf_life_pantry_opened_days.toString()}
              placeholder="0"
              onChange={setShelfLifePantryOpenedDaysHelper}/>
              <div>days (0-{MAX_OPENED_DAYS.toString()})</div>
          </div>
        </div>
      </div>

      <div>
        <h4>Refrigerated Shelf Life</h4>
        <div className="shelfLifeRow">
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={shelf_life_fridge_years.toString()}
              placeholder="0"
              onChange={setShelfLifeFridgeYearsHelper}/>
              <div>years (0-{MAX_FRIDGE_YEARS.toString()})</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={shelf_life_fridge_days.toString()}
              placeholder="0"
              onChange={setShelfLifeFridgeDaysHelper}/>
              <div>days (0-{MAX_FRIDGE_DAYS.toString()})</div>
          </div>
        </div>
      </div> 

      <div>
        <h4>Frozen Shelf Life</h4>
        <div className="shelfLifeRow">
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={shelf_life_freezer_years.toString()}
              placeholder="0"
              onChange={setShelfLifeFreezerYearsHelper}/>
              <div>years (0-{MAX_FREEZER_YEARS.toString()})</div>
          </div>
          <div className="nutritionInfoBox">
            <input 
              type="text"
              className="ingredientQty"
              value={shelf_life_freezer_days.toString()}
              placeholder="0"
              onChange={setShelfLifeFreezerDaysHelper}/>
              <div>days (0-{MAX_FREEZER_DAYS.toString()})</div>
          </div>
        </div>
        <p>Leave blank fields where storage method doesn't apply.</p>
      </div> 
    </div>
  )
}

export default memo(Form06Shelf)
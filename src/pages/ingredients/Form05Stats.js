import { memo } from 'react'
import "./AddIngredient.css"
import Box from '@mui/material/Box'; 
import Slider from '@mui/material/Slider';

const Form05Stats = ({
  availability, setAvailability,
  needs_refrigeration, setNeeds_refrigeration,
  freezeability, setFreezeability,
  spiciness, setSpiciness
}) => {

    /////////////////////////////////
    ////////       JSX       ////////
    /////////////////////////////////

  return (
    <div> 
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
    </div> 
        
  )
}

export default memo(Form05Stats)
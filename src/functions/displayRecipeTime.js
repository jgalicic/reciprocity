import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock} from '@fortawesome/free-solid-svg-icons'

export default function displayRecipeTime(hrs, min) {

  let hours
  let minutes

  if (hrs === "") {
    hours = 0
  } else {
    hours = parseInt(hrs)
  }
  if (min === "") {
    minutes = 0
  } else {
    minutes = parseInt(min)
  }
  
  if (hours === 0 && minutes === 0) return <p></p>
  if (hours === 0 && minutes === 1) return <p><FontAwesomeIcon icon={faClock}/> 1 minute</p>
  if (hours === 0 && minutes > 1) return <p><FontAwesomeIcon icon={faClock}/> {minutes.toString()} minutes</p>

  if (hours === 1 && minutes === 0) return <p><FontAwesomeIcon icon={faClock}/> 1 hr</p>
  if (hours === 1 && minutes === 1) return <p><FontAwesomeIcon icon={faClock}/> 1 hr</p>
  if (hours === 1 && minutes > 1) return <p><FontAwesomeIcon icon={faClock}/> 1 hr {minutes.toString()} minutes</p>

  if (hours > 1 && minutes === 0) return <p><FontAwesomeIcon icon={faClock}/> {hours.toString()} hrs</p>
  if (hours > 1 && minutes === 1) return <p><FontAwesomeIcon icon={faClock}/> {hours.toString()} hrs</p>
  if (hours > 1 && minutes > 1) return <p><FontAwesomeIcon icon={faClock}/> {hours.toString()} hrs {minutes.toString()} minutes</p>
  


  return <p>{hours}:{minutes}</p>
}
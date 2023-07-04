import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/firebase-config'
import displayRecipeTime from '../../functions/displayRecipeTime'

import Spinner from '../../components/Spinner';

import "./Recipe.css"

export default function Recipe() {

  let { id } = useParams();

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

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

  useEffect(() => {
    setIsPending(true)
    getRecipes(firestore).then(recipeData => {

      // console.log(recipeData)

      // Find individual recipe faster than using map() or forEach()
      let index = -1
      for(let i = 0; i < recipeData.length; i++) {
          if(recipeData[i].id === id) {
              index = i;
              break;
          }
      }
      setData(recipeData[index])
      setIsPending(false)
    })
  }, [id])

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <div className="loading"><Spinner /></div>}
      {data && (
        <div>
          <h2 className="recipe-title">{data.recipe.title}</h2>
          <h3 className="recipe-subtitle">{data.recipe.subtitle}</h3>
          {displayRecipeTime(data.recipe.prepTimeTotalHours, data.recipe.prepTimeTotalMinutes)}
          <img src={data.recipe.recipeImgUrl} width="600px" height="600px" alt={data.recipe.title}/>
          <br />
          <br />
          <p style={{width: "610px", margin: "0 auto"}}>{data.recipe.description}</p>
          
          <h4>Ingredients:</h4>
          <ul className="ingredientListUl">
            {Object.entries(data.recipe.ingredientList).map(([i, ingredient]) => (
            <li key={i} className="ingredientListItem">
              <div className="ingredientListSubItem ingredientQty">{ingredient.qty} 
                <span className="ingredientUnit">{ingredient.unit} </span>
              </div>
              <div className="ingredientListSubItem ingredientName">{ingredient.name}</div>
            </li>
            ))}
          </ul>
          <h4>Directions:</h4>
          <ul>
            {Object.entries(data.recipe.steps).map(([i, step]) => (
            <li key={i}>
              <h3><span className="mainStepNumberCircle">{parseInt(i) + parseInt(1)}</span>{step.mainStep}</h3>
              <div className="stepContainer">
                <div className="stepImageContainer">
                  <img src={step.imgUrlLg} alt={step.mainStep} />
                </div>
                <ul>
                {step.subSteps.map((subStep, j) => (
                  <li className="subStepListItem" key={j}>{subStep}</li>))}
                </ul>
              </div>
              <br />
            </li>))}
          </ul>
        </div>)}  
        <br />
        <br />
    </div>
  )
}
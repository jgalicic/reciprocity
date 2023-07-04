import { Link } from "react-router-dom"
import './RecipeList.css'
import displayRecipeTime from '../functions/displayRecipeTime'
import displayRecipeDescription from '../functions/displayRecipeDescription'

export default function RecipeList({recipes}) {

  return (
    <div className="recipeList">
      {recipes.map((recipe, i) => (
        
        <Link to={`/recipes/${recipe.id}`} key={i} className="card">

            <div className="recipeImgContainer">
              <img src={recipe.recipe.recipeImgUrl} alt={recipe.recipe.title}/>
            </div>
            <div className="recipeTitleAndStatsContainer">
              <h3>{recipe.recipe.title}</h3>
              <p>{recipe.recipe.subtitle}</p>
              <div className="recipeTime">
               {displayRecipeTime(recipe.recipe.prepTimeTotalHours, recipe.recipe.prepTimeTotalMinutes)}
              </div>
            
              <div className="recipeDescription">
                {displayRecipeDescription(recipe.recipe.description)}
              </div>
            </div>
        </Link>
      ))}
    </div>
  )
}

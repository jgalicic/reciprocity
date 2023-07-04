import { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Firestore
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/firebase-config'

// Local Files
import "./Ingredients.css"
import "./EditIngredient.css"

// import EditOneIngredient from './EditOneIngredient';


export default function Ingredients() {

  const INGREDIENT_API_URL = `https://reciprocity-api.herokuapp.com/ingredients`

  // React Hooks
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [numIngredients, setNumIngredients] = useState(0)

  while (false) console.log(error, setError, isPending, setIsPending, ingredients, setIngredients)

  // Database connection (Ingredients)
  async function getIngredients(firestore) {
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
    getIngredients(firestore).then(data => {

      // This could be probably be optimized
      let arrayOfIngredients = []
      data.map((item) => arrayOfIngredients.push({
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
      setNumIngredients(sortedData.length)
      setIngredients(sortedData)
      setIsPending(false)
    })
  }, [INGREDIENT_API_URL])

  return (
    <div className="IngredientsContainer">
      <h3>Edit Ingredients</h3>
      <p style={{textAlign: "center"}}>Select from {numIngredients} ingredients:</p>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className="IngredientsBox80983">
        <nav aria-label="main mailbox folders">
          <List>
            {ingredients.map((ingredient, i) => (

            <ListItem disablePadding key={i} className="ingredientListItem9879347">
              <ListItemButton component="a" href={`/editingredient/${ingredient.ingredientId}`}>
                <ListItemIcon>
                  <img src={ingredient.imgUrlSm} alt={ingredient.name[0]}></img>
                </ListItemIcon>
                <ListItemText primary={ingredient.display_name} />
              </ListItemButton>
            </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </div> 
  );
}


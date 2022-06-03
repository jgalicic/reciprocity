import RecipeList from '../../components/RecipeList'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from "../../firebase/firebase-config"
import "./Home.css"
import Spinner from '../../components/Spinner';


export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(null)
  const [error, setError] = useState(null)

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
    getRecipes(firestore).then(data => {
      setIsPending(false)
      setData(data)
    })
  }, [])
  
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <div className="loading"><Spinner /></div>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}

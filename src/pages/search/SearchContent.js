import { useState, useEffect } from 'react'

// Firestore
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from "../../firebase/firebase-config"

// Local Components
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks"
import RecipeList from '../../components/RecipeList'
import statObj from '../create/mealTypeCreate'

// Local Files
import './SearchContent.css'

export default function SearchContent({ searchTerm, setSearchTerm}) {

  // Constants
  const MAX_RECIPE_TILES_TO_SHOW_PER_PAGE = 10

  // React Hooks
  const [mealTypeObj, setMealTypeObj] = useState(statObj.mealTypeObj)
  const [regionTypeObj, setRegionTypeObj] = useState(statObj.regionObj)
  const [celebrationTypeObj, setCelebrationTypeObj] = useState(statObj.celebrationObj)
  const [miscTagTypeObj, setMiscTagTypeObj] = useState(statObj.miscTagObj)
  const [filteredItems, setFilteredItems] = useState([])
  const [checkedTagsArray, setCheckedTagsArray] = useState([])
  const [allData, setAllData] = useState([])
  const [dataToRender, setDataToRender] = useState([])
  const [isPending, setIsPending] = useState(null)
  const [error, setError] = useState(null)

  while(false)console.log(isPending, error)

  // Database connection
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
      setAllData(data)
    })
  }, [])

  useEffect(() => {
    setFilteredItems(allData.filter(item => `${item.recipe.title.toLowerCase()} ${item.recipe.subtitle.toLowerCase()}`.includes(searchTerm.toLowerCase())))
  }, [searchTerm, allData])

  useEffect(() => {
    setDataToRender(filteredItems)
  }, [filteredItems])

  useEffect(() => {

    let tempCheckedTagsArray = []

    mealTypeObj.forEach((item) => {
      if (item.checked) tempCheckedTagsArray.push(item.name)
    })

    regionTypeObj.forEach((item) => {
      if (item.checked) tempCheckedTagsArray.push(item.name)
    })

    celebrationTypeObj.forEach((item) => {
      if (item.checked) tempCheckedTagsArray.push(item.name)
    })

    miscTagTypeObj.forEach((item) => {
      if (item.checked) tempCheckedTagsArray.push(item.name)
    })

    setCheckedTagsArray(tempCheckedTagsArray)

  }, [mealTypeObj, regionTypeObj, celebrationTypeObj, miscTagTypeObj])

  // Filter recipes
  useEffect(() => {

    let tempAllDataToRender = []

    
    // No search term is present
    if (searchTerm.length < 1) {

      allData && allData.forEach((recipe, i) => {
        let masterTagsArray = [
            ...recipe.recipe.mealTypes, 
            ...recipe.recipe.region, 
            ...recipe.recipe.celebrationTypes,
            ...recipe.recipe.tags
          ]
        let isSubset = (arr1, arr2) => arr2.every(element => arr1.includes(element));
        isSubset(masterTagsArray, checkedTagsArray) && tempAllDataToRender.push(recipe)
      })
  
      setDataToRender(tempAllDataToRender.slice(0,MAX_RECIPE_TILES_TO_SHOW_PER_PAGE))
    } 
    // Filter by both search term and checkboxes
    else {
      
    }


  }, [allData, checkedTagsArray, searchTerm])

  return (
    <div>
      <div className="mainSearchFilterContainer">
        <h3>Filter recipes</h3>
        <div className="filterSelectContainer">
          <MultipleSelectCheckmarks 
            filterListType="Meal Type" 
            filterParamObj={mealTypeObj} 
            setFilterParamObj={setMealTypeObj}
          />
          <MultipleSelectCheckmarks 
            filterListType="Region" 
            filterParamObj={regionTypeObj} 
            setFilterParamObj={setRegionTypeObj}
          />
          <MultipleSelectCheckmarks 
            filterListType="Celebration Type" 
            filterParamObj={celebrationTypeObj} 
            setFilterParamObj={setCelebrationTypeObj}
          />
          <MultipleSelectCheckmarks 
            filterListType="Misc" 
            filterParamObj={miscTagTypeObj} 
            setFilterParamObj={setMiscTagTypeObj}
          />
        </div>
      </div>
      {dataToRender && <RecipeList recipes={dataToRender}/>}
      <p style={{textAlign: "center"}}>{dataToRender.length === 1 ? `${dataToRender.length} result` : `${dataToRender.length} results`}</p>
      <br />
    </div>

    
  )
}
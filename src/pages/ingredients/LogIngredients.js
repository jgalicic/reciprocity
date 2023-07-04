import { useEffect, useState } from 'react'

// Firestore
import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from '../../firebase/firebase-config'


export default function LogIngredients() {

    // React Hooks
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [ingredients, setIngredients] = useState([])

    while (false) console.log(error, isPending, ingredients)

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
            allergens: item.ingredient.allergens,
            also_known_as_plural: item.ingredient.also_known_as_plural,
            also_known_as_singular: item.ingredient.also_known_as_singular,
            availability: item.ingredient.availability,
            calories_per_100_grams: item.ingredient.calories_per_100_grams,
            category: item.ingredient.category,
            category_sub: item.ingredient.category_sub,
            contains_sub_ingredients: item.ingredient.contains_sub_ingredients,
            createdAt: item.ingredient.createdAt,
            cultivar_or_variety: item.ingredient.cultivar_or_variety,
            cultivar_or_variety_goes_before_name: item.ingredient.cultivar_or_variety_goes_before_name,
            dietCategory: item.ingredient.dietCategory,
            freezeability: item.ingredient.freezeability,
            grams_carbs_per_100g: item.ingredient.grams_carbs_per_100g,
            grams_fat_per_100g: item.ingredient.grams_fat_per_100g,
            grams_fiber_per_100g: item.ingredient.grams_fiber_per_100g,
            grams_protien_per_100g: item.ingredient.grams_protien_per_100g,
            grams_sugar_per_100g: item.ingredient.grams_sugar_per_100g,
            hasCultivarOrSpecificType: item.ingredient.hasCultivarOrSpecificType,
            ingredientId: item.ingredient.ingredientId,
            ingredientList: item.ingredient.ingredientList,
            list_sub_ingredients: item.ingredient.list_sub_ingredients,
            mg_sodium_per_100g: item.ingredient.mg_sodium_per_100g,
            name: item.ingredient.name,
            name_plural: item.ingredient.name_plural,
            needs_refrigeration: item.ingredient.needs_refrigeration,
            prep_method_goes_before_name: item.ingredient.prep_method_goes_before_name,
            prepared_as: item.ingredient.prepared_as,
            recipeId: item.ingredient.recipeId,
            shelf_life_fridge_days: item.ingredient.shelf_life_fridge_days,
            shelflife_pantry_opened_days: item.ingredient.shelflife_pantry_opened_days,
            shelflife_pantry_unopened_days: item.ingredient.shelflife_pantry_unopened_days,
            spiciness: item.ingredient.spiciness,
            texture: item.ingredient.texture,
            updatedAt: item.ingredient.updatedAt
        }))

        // Sort by Name
        function compare( a, b ) {
            if ( a.name > b.name )return 1
            if ( a.name < b.name )return -1
            return 0
        }

        let sortedData = arrayOfIngredients.sort(compare)
        setIngredients(sortedData)
        setIsPending(false)

        console.log("All ingredients: ", sortedData)
        })
    }, [])

    return (
        <p>All ingredients have been logged to the console</p>
    )

}
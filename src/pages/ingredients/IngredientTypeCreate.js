/********************** IMPORTANT NOTICE **************************
All of these objects should have an id, name, and checked property.
/*****************************************************************/


const blankState = {
  allergens: [""],
  availability: 2,
  calories_per_100_grams: "",
  grams_carbs_per_100_grams: "",
  createdAt: "",
  category: [""],
  freezeability: 1,
  name: "",
  needs_refrigeration: 1,
  spiciness: 0,
}

// WARNING: DO NOT EDIT OR DELETE DIET CATEGORIES - ONLY ADD NEW ONES!!!!!

const dietCategory = [
  'Alcohol-free',
  'Gluten-free',
  'Halal',
  'Keto',
  'Kosher',
  'Mediterranean',
  'Natural',
  'Paleo',
  'Pescatarian',
  'Raw food',
  'Sugar-free',
  'Superfood',
  'Vegan',
  'Vegetarian'
]

const dietCategoryObj = []

dietCategory.map((dietCat, i) => {
  return dietCategoryObj.push({
    id : i,
    name : dietCat,
    checked : false
  })  
})

/***************************************************/

// WARNING: DO NOT EDIT OR DELETE FOOD CATEGORIES - ONLY ADD NEW ONES!!!!!

const foodCategory = [
  'Fruits & veggies',
  'Nuts & grains',
  'Fish & seafood',
  'Meat & poultry',
  'Meat alternative',
  'Eggs & dairy',
  'Fats & oils',
  'Beverage',
  'Sweetener',
  'Additive/preservative',
  'Flavoring/extract',
  'Leavening agent',
  'Sauce/condiment',
  'Seasoning',
  'Other'
]

const foodCategoryObj = []

foodCategory.map((foodCat, i) => {
  return foodCategoryObj.push({
    id : i,
    name : foodCat,
    checked : false
  })  
})

/***************************************************/

// An exclamation point(!) in front of a category denotes a header for the group of
// subsequent categories until the next category with an exclamation point. Each
// sub-grouping should be in alphabetical order.


// WARNING: DO NOT EDIT OR DELETE SUB CATEGORIES - ONLY ADD NEW ONES!!!!!

const specificFoodCategory = [
  // Fruit
  'Fruit',
  'Berry',
  'Citrus',
  'Dried fruit',
  'Melon',
  'Palm tree fruit',
  'Pome fruit',
  'Stone fruit',
  'Tropical fruit',
  // Vegetable
  '!Vegetable',
  'Allium',
  'Brassica',
  'Dried vegetable',
  'Flower',
  'Legume',
  'Leafy green',
  'Leafy herb',
  'Marrow',
  'Nightshade',
  'Pickled vegetable',
  'Root vegetable',
  'Sea vegetable',
  'Shoots',
  'Sprouts',
  'Stalk/stem vegetable',
  'Starchy vegetable',
  // Nut
  '!Nut',
  'Peanut',
  'Tree nut',
  // Grain
  '!Grain',
  'Ancient grain',
  'Bread',
  'Cereal',
  'Flour',
  'Pasta',
  'Pastry',
  'Refined grain',
  'Tortilla',
  'Whole grain',
  // Seafood
  '!Seafood',
  'Crustacean',
  'Fish',
  'Mollusk',
  'Roe',
  'Shellfish',
  // Meat
  '!Meat',
  'Cured meat',
  'Meat alternative',
  'Pork',
  'Poultry',
  'Red meat',
  'Sausage',
  // Dairy
  'Dairy',
  'Cheese',
  'Cream',
  'Milk',
  'Yogurt',
  'Egg',
  // Fat
  '!Fat',
  'Oil',
  'Monounsaturated fat',
  'Polyunsaturated fat',
  'Saturated fat',
  'Trans fat',
  'Unsaturated fat', 
  // Beverage
  '!Beverage',
  'Beer',
  'Cider',
  'Juice',
  'Plant milk',
  'Soft drink',
  'Spirit',
  'Wine',
  // Sweetener
  '!Sweetener',
  'Chocolate',
  'Liqueur',
  'No-calorie sweetener',
  'Syrup',
  // Additives
  '!Additive',
  'Acid',
  'Anti-caking agent',
  'Antioxidant',
  'Coloring',
  'Conditioner',
  'Emulsifier',
  'Extract',
  'Flavoring',
  'Leavening',
  'Preservative',
  'Stabilizer',
  'Thickener',
  
  // Condiment
  '!Condiment',
  'Dressing',
  'Hot sauce',
  'Salsa',
  'Sauce',
  'Spread',
  'Vinegar',
  // Seasoning
  '!Seasoning',
  "Broth/stock/bouillon",
  'Herb',
  'Salt',
  'Spice'
]

const specificFoodCategoryObj = []

specificFoodCategory.map((specificFoodCategory, i) => {

  return specificFoodCategoryObj.push({
    id : i,
    name : specificFoodCategory[0] === "!" ? `${specificFoodCategory.substring(1)}` : `${specificFoodCategory}`,
    checked : false,
    categoryHeader:  specificFoodCategory[0] === "!" ? true : false
  })  
})

/***************************************************/

// WARNING: DO NOT EDIT OR DELETE ALLERGENS - ONLY ADD NEW ONES!!!!!
const allergens = [
  'Celery',
  'Dairy',
  'Eggs',
  'Fish',
  'Mollusks',
  'Mushrooms',
  'Mustard',
  'Peanuts',
  'Sesame',
  'Shellfish', 
  'Soy',
  'Sulphites',
  'Tree nuts',
  'Wheat'
]

const allergenObj = []

allergens.map((allergen, i) => {
  return allergenObj.push({
    id : i,
    name : allergen,
    checked : false
  })  
})

// WARNING: DO NOT EDIT OR DELETE TEXTURES - ONLY ADD NEW ONES!!!!!
const texture = [
  'Airy',
  'Brittle',
  'Chewy',
  'Creamy',
  'Crispy',
  'Crumbly',
  'Crunchy',
  'Delicate',
  'Dense',
  'Fibrous',
  'Flaky',
  'Fluffy',
  'Frothy',
  'Frozen',
  'Gelatinous',
  'Gooey',
  'Granular',
  'Greasy',
  'Juicy',
  'Light',
  'Liquid',
  'Lumpy',
  'Melt-in-your-mouth',
  'Powder',
  'Slushy',
  'Smooth',
  'Soft',
  'Spongy',
  'Sticky',
  'Succulent',
  'Tender',
  'Viscous',
]

const textureObj = []

texture.map((texture, i) => {
  return textureObj.push({
    id : i,
    name : texture,
    checked : false
  })  
})


/***************************************************/


const ingredientObj = { blankState, dietCategoryObj, foodCategoryObj, specificFoodCategoryObj, allergenObj, textureObj }

export default ingredientObj;
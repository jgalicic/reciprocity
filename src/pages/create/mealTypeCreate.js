

/********************** IMPORTANT NOTICE **************************
All of these objects should have an id, name, and checked property.
/*****************************************************************/


const mealTypeArr = [
  'Appetizer', 
  'Afternoon Tea', 
  'Breakfast', 
  'Brunch',
  'Dessert', 
  'Dinner', 
  'Ingredient',
  'Lunch', 
  'Main Course', 
  'Salad', 
  'Side Dish', 
  'Snack', 
  'Soup', 
  'Supper'
]

const mealTypeObj = []

mealTypeArr.map((mealType, i) => {
  return mealTypeObj.push({
    id : i,
    name : mealType,
    checked : false
  })  
})

/***************************************************/

const celebrationArr = [
  'Anniversary',
  'Birthday',
  'Chinese New Year',
  'Christmas',
  'Cinco de Mayo',
  'Easter',
  'Fathers Day',
  'Halloween',
  'Hanukkah',
  'Independence Day',
  'Mothers Day',
  'Ramadan',
  'St. Patricks Day',
  'Superbowl',
  'Thanksgiving',
  'Valentines Day',
  'Wedding'
]


const celebrationObj = []

celebrationArr.map((celebrationType, i) => {
  return celebrationObj.push({
    id : i,
    name : celebrationType,
    checked : false
  })  
})

/***************************************************/
const miscTagArr = [
  'BBQ',
  'Blue Apron',
  'Bread',
  'Casserole',
  'Cocktail',
  'Comfort Food',
  'Condiment',
  'Dip',
  'Finger Food',
  'Green Chef',
  'Grill',
  'Hello Fresh',
  'Home Chef',
  'One pan',
  'Overnight',
  'Roast',
  'Sandwich',
  'Sauce',
  'Seafood',
  'Special Occasion',
  'Spice Rub',
  'Spread',
  'Stew',
  'Weeknight',
]

const miscTagObj = []

miscTagArr.map((miscTagType, i) => {
  return miscTagObj.push({
    id : i,
    name : miscTagType,
    checked : false
  })  
})


/***************************************************/


const regionArr = [
  'African',
  'American',
  'Australian',
  'Brazilian',
  'British',
  'Cambodian',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Cuban',
  'Ethiopian',
  'Filipino',
  'French',
  'German',
  'Greek',
  'Hawaiian & Polynesian',
  'Indian',
  'Indonesian',
  'Irish',
  'Italian',
  'Japanese',
  'Korean',
  'Lebanese',
  'Malaysian',
  'Mediterranean',
  'Mongolian',
  'Moroccan',
  'New American',
  'North African',
  'Norwegian',
  'Persian',
  'Russian',
  'Scottish',
  'Sichuan',
  'Spanish',
  'South American',
  'South African',
  'Southern US',
  'Taiwanese',
  'Tex-Mex',
  'Turkish',
  'Thai',
  'Vietnamese'
]

const regionObj = []

regionArr.map((regionType, i) => {
  return regionObj.push({
    id : i,
    name : regionType,
    checked : false
  })  
})


/***************************************************/


const statObj = { mealTypeObj, celebrationObj, miscTagObj, regionObj }

export default statObj;
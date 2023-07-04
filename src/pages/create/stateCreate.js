
// Set all initial state values to blank
const blankState = {
  allergens: [""],
  attributedTo: "",
  celebrationTypes: [""],
  createdAt: "",
  description: "",
  dietCategory: [""],
  difficulty: 0,
  freezeability: 1,
  ingredients: [],
  leftoverability: 2,
  mealTypes: [""],
  prepTimeActiveHours: "",
  prepTimeActiveMinutes: "",
  prepTimeTotalHours: "",
  prepTimeTotalMinutes: "",
  rating: 2,
  recipeImgUrl: "",
  region: [""],
  servings: 2,
  steps: [],
  submittedBy: "",
  subtitle: "",
  tags: [],
  title: "",
  updatedAt: "",
  uuid: ""
}

// Set all initial state values to an example recipe
const tempState = {
  description: 'To add exciting contrast of flavor to this comforting pasta, you’ll cook savory pork with plump, sweet currants and briny capers in a bright sauce flavored with our warming spice blend, quatre épices (or four spices), which features white pepper, nutmeg, ginger, and cloves.',
  createdAt: '',
  id: '',
  ingredients: [{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Ground Pork',
    qty: '10',
    unit: 'oz',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Lumaca Rigata Pasta',
    qty: '6',
    unit: 'oz',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Sweet Peppers',
    qty: '4',
    unit: 'oz',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Garlic',
    qty: '2',
    unit: 'cloves',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Dried Currants',
    qty: '2',
    unit: 'Tbsps',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Tomato Paste',
    qty: '6',
    unit: 'oz',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Mascarpone cheese',
    qty: '2',
    unit: 'Tbsps',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Grated Parmesan Cheese',
    qty: '1/4',
    unit: 'cup',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'White Pepper',
    qty: '1/2',
    unit: 'tsp',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Nutmeg',
    qty: '1/8',
    unit: 'tsp',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Ginger',
    qty: '1/4',
    unit: 'tsp',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Cloves',
    qty: '1/8',
    unit: 'tsp',
  },{
    id: '',
    imgUrlLg: '',
    imgUrlSm: '',
    name: 'Crushed Red Pepper Flakes',
    qty: '1/4',
    unit: 'tsp',
  }],
  prepTime: {
    activeHours: 0, 
    activeMinutes: 30, 
    totalHours: 0, 
    totalMinutes: 30,
  },
  recipeImgURL : 'https://media.blueapron.com/recipes/31920/square_newsletter_images/1651262483-44-0043-9253/0509_2P8_Groumd-PorkRagu-Pasta_063_SQ_Web.jpg?quality=80&width=850',
  stats: {
    celebrationTypes: [''],
    dietCategory:[''],
    difficulty: 0,
    freezeability: 1,
    leftoverability: 2,
    mealTypes: [''],
    rating: 2,
    region:[],
    servings: 2,
    tags: ['']
  },
  steps: [{
    imgUrlLg: 'https://media.blueapron.com/recipes/31920/recipe_steps/70812/1651262588-44-0039-0447/0509_2P8_Groumd-PorkRagu-Pasta_025_Web.jpg?width=512',
    imgUrlSm: '',
    mainStep: 'Prepare the ingredients',
    subSteps: ['Fill a medium pot 3/4 of the way up with salted water; cover and heat to boiling on high. Peel and roughly chop 2 cloves of garlic. Wash and dry the peppers. Cut off and discard the stems; remove the cores. Halve lengthwise, then thinly slice crosswise.']
  },
  {
    imgUrlLg: 'https://media.blueapron.com/recipes/31920/recipe_steps/70813/1649182894-44-0061-6695/0114_2P8_Ground-Pork-Ragu_006_water_Web.jpg?width=512',
    imgUrlSm: '',
    mainStep: 'Cook the pasta',
    subSteps: ['Add the pasta to the pot of boiling water. Cook, stirring occasionally, 5 to 7 minutes, or until al dente (still slightly firm to the bite). Turn off the heat. Reserving 1/2 cup of the pasta cooking water, drain thoroughly and return to the pot. ']
  },
  {
    imgUrlLg: 'https://media.blueapron.com/recipes/31920/recipe_steps/70814/1651262650-51-0045-5415/0509_2P8_Groumd-PorkRagu-Pasta_030_Web.jpg?width=512',
    imgUrlSm: '',
    mainStep: 'Brown the pork & peppers',
    subSteps: ['Meanwhile, in a large pan (nonstick, if you have one), heat a drizzle of olive oil on medium-high until hot. Add the pork and sliced peppers in an even layer; season with salt and pepper. Cook, without stirring, 2 to 3 minutes, or until lightly browned. ']
  },
  {
    imgUrlLg: 'https://media.blueapron.com/recipes/31920/recipe_steps/70815/1651262775-44-0045-7959/0509_2P8_Groumd-PorkRagu-Pasta_047_Web.jpg?width=512',
    imgUrlSm: '',
    mainStep: 'Make the sauce',
    subSteps: ['To the pan, add the chopped garlic, capers, and quatre épices; season with salt and pepper. Cook, stirring frequently and breaking the meat apart with a spoon, 3 to 5 minutes, or until lightly browned. Add the tomato paste (if you received 6 oz, use 2 tablespoons of the tomato paste) and as much of the red pepper flakes as you’d like, depending on how spicy you’d like the dish to be; season with salt and pepper. Cook, stirring constantly, 1 to 2 minutes, or until thoroughly combined. Add the currants and 1/2 cup of water (carefully, as the liquid may splatter); season with salt and pepper. Cook, stirring occasionally, 2 to 3 minutes, or until the sauce is slightly thickened and the pork is cooked through. Turn off the heat.']
  },
  {
    imgUrlLg: 'https://media.blueapron.com/recipes/31920/recipe_steps/70816/1651262811-51-0047-0312/0509_2P8_Groumd-PorkRagu-Pasta_052_Web.jpg?width=512',
    imgUrlSm: '',
    mainStep: 'Finish & serve your dish',
    subSteps: ['To the pot of cooked pasta, add the cooked pork and sauce and half the reserved pasta cooking water. Cook on medium-high, stirring constantly, 1 to 2 minutes, or until combined and the pasta is coated (if necessary, gradually add the remaining cooking water to ensure the pasta is thoroughly coated). Turn off the heat. Stir in the mascarpone until combined. Taste, then season with salt and pepper if desired. Serve the finished pasta garnished with the parmesan. Enjoy!']
  }],
  subtitle: 'with Currants & Sweet Peppers',
  title: 'Ground Pork Ragù & Lumaca Rigata Pasta',
  updatedAt: 'To the pot of cooked pasta, add the cooked pork and sauce and half the reserved pasta cooking water. Cook on medium-high, stirring constantly, 1 to 2 minutes, or until combined and the pasta is coated (if necessary, gradually add the remaining cooking water to ensure the pasta is thoroughly coated). Turn off the heat. Stir in the mascarpone until combined. Taste, then season with salt and pepper if desired. Serve the finished pasta garnished with the parmesan. Enjoy!'
}

// Prevent unused variable warnings
while(false) {
  console.log(blankState)
  console.log(tempState)
}

/****** Choose one: ********/

// export default tempState;
export default blankState;
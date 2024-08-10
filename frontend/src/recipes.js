let recipes = [
  {
    portions: 1,
    name: "Empanadas de Pollo",
    cook_time: 10,
    procedure: "absnkxjjksaxhbsnkabjxhbjsa",
    baseIngredients: [
      {
        name: "Harina",
        quantity: 500,
        unit: "gr",
      },
      {
        name: "Pollo",
        quantity: 250,
        unit: "gr",
      },
    ],
  },

  {
    portions: 1,
    name: "arepa de carne",
    cook_time: 30,
    procedure: "amasar, cocinar, y rellenar.",
    baseIngredients: [
      {
        name: "Harina",
        quantity: 80,
        unit: "gr",
      },
      {
        name: "Carne mechada",
        quantity: 100,
        unit: "gr",
      },
      {
        name: "queso amarillo",
        quantity: 40,
        unit: "gr",
      },
    ],
  },
];
async function getRecipes(keyword) {

  let response= await fetch("http://localhost:5002/recetas?keyword=" + keyword);

  if (response.status == 200) {
    let data = await response.json();
    console.log(data);
    return data;
  }

  return recipes;
}

export { recipes, getRecipes };

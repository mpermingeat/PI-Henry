const { Router } = require("express");
const {
  createRecipe,
  getListByName,
  getDetailsById,
} = require("../controllers/recipesControllers");

const recipesRoute = Router();

recipesRoute.post("/", async (req, res) => {
  const { name, summaryDish, healthScore, steps, dietsTypes } = req.body;
  try {
    const newRecipe = await createRecipe(
      name,
      summaryDish,
      healthScore,
      steps,
      dietsTypes
    );
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

recipesRoute.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const listsRecipes = await getListByName(name);
    res.status(200).json(listsRecipes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

recipesRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipeDetails = await getDetailsById(id);
    res.status(200).json(recipeDetails);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = recipesRoute;

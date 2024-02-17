import { connectToDatabase } from "@lib/database";
import Recipe from "@models/recipe";
export const GET = async (req, { params }) => {
  console.log(params.id);
  try {
    await connectToDatabase();
    if (params.id === "" || params.id === "undefined" || params.id === null) {
      const recipes = await Recipe.find({ type: "Non Vegtarian" });
      console.log("in recipes", recipes);
      return new Response(JSON.stringify(recipes), {
        status: 200,
      });
    }
    const recipes = await Recipe.find({
      $and: [
        { type: "Non Vegtarian" },
        { recipeName: { $regex: params.id, $options: "i" } },
      ],
    });
    console.log("recipes", recipes);
    if (recipes.length === 0) {
      return new Response(JSON.stringify(null), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(recipes), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};

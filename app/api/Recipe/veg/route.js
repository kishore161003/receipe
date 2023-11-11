import { connectToDatabase } from "@lib/database";
import Recipe from "@models/recipe";

export const GET = async (req) => {
  try {
    await connectToDatabase();
    const recipes = await Recipe.find({ type: "Vegtarian" });
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }
};

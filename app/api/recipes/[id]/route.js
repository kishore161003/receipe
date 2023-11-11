import { connectToDatabase } from "@lib/database";
import Recipe from "@models/recipe";

export const GET = async (req, { params }) => {
  const { db } = await connectToDatabase();
  try {
    const recipes = await Recipe.find({ _id: params.id });
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

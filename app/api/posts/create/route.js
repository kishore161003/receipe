import { connectToDatabase } from "@lib/database";
import Recipe from "@models/recipe";

export const POST = async (req) => {
  const { db } = await connectToDatabase();
  console.log(1);
  const [{ name, ingredients, type, steps, time, userId }, images] =
    await req.json();
  console.log(userId, images, "check");
  try {
    const recipe = await Recipe.create({
      recipeName: name,
      ingredients: ingredients,
      type: type,
      steps: steps,
      timeRequired: time,
      userId: userId,
      images: images,
    });
    console.log(3);
    await recipe.save();
    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};

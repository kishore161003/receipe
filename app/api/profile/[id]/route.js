import { connectToDatabase } from "@lib/database";
import Recipe from "@models/recipe";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Recipe.find({ userId: params.id });
    console.log(prompt);
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }
};

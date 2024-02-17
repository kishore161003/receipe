import { connectToDatabase } from "@lib/database";
import Recipe from "@models/recipe";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    console.log(params.id);
    await connectToDatabase();
    const user = await User.find({ email: params.id });
    console.log(user);
    const prompt = await Recipe.find({ userId: user[0]._id });
    console.log(prompt);
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }
};

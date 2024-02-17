import { connectToDatabase } from "@lib/database";
import Recipe from "@models/recipe";
import { user } from "@nextui-org/theme";

export const DELETE = async (req, { params }) => {
  await connectToDatabase();
  console.log(params.id, "delete it");
  try {
    const food = await Recipe.find(params.id);
    const user = await User.findById(food.userId);
    user.bookmarks = user.bookmarks.filter((bookmark) => bookmark !== food._id);
    const recipe = await Recipe.findByIdAndDelete(params.id);
    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

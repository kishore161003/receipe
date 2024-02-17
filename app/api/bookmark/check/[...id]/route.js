import { connectToDatabase } from "@lib/database";
import User from "@models/user";
import Recipe from "@models/recipe";

export const GET = async (req, { params }) => {
  const { db } = await connectToDatabase();
  const { id } = params;
  const [user, post] = id;
  // check if post is bookmarked
  try {
    const bookmark = await User.findById({ _id: user });

    if (
      bookmark.bookmarks.find((bookmark) => bookmark._id.toString() === post)
    ) {
      return new Response(JSON.stringify({ bookmarked: true }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ bookmarked: false }), {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};

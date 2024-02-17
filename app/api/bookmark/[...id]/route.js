import { connectToDatabase } from "@lib/database";
import User from "@models/user";
import Recipe from "@models/recipe";

export const GET = async (req, { params }) => {
  const { db } = await connectToDatabase();
  const { id } = params;
  console.log(id, "id")
  // get all bookmarks
  if (id.length === 1) {
    try {
      const bookmark = await User.findById({ _id: id[0] });
      const res = [];
      for (let i = 0; i < bookmark.bookmarks.length; i++) {
        const recipe = await Recipe.findById({ _id: bookmark.bookmarks[i] });
        if (res.find((r) => r._id === recipe._id)) continue;
        res.push(recipe);
      }
      console.log(res);

      return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(error, { status: 500 });
    }
  }

  const [user, post] = id;
  // toggle bookmark
  try {
    const bookmark = await User.findById({ _id: user });

    if (
      bookmark.bookmarks.find((bookmark) => bookmark._id.toString() === post)
    ) {
      const index = bookmark.bookmarks.indexOf(post);
      bookmark.bookmarks.splice(index);
      console.log("found");
      bookmark.save();
    } else {
      console.log("not found");
      bookmark.bookmarks.push(post);
      bookmark.save();
    }
    return new Response(JSON.stringify(bookmark), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};

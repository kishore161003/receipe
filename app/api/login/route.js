import { connectToDatabase } from "@lib/database";
import User from "@models/user";

export const POST = async (req) => {
  const { email, password } = await req.json();
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        return new Response(JSON.stringify(user), { status: 200 });
      } else {
        return new Response("Incorrect password", { status: 400 });
      }
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

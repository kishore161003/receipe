import { connectToDatabase } from "@lib/database";
import User from "@models/user";

export const POST = async (req) => {
  const { email, username, password } = await req.json();
  try {
    await connectToDatabase();
    const newUser = await User.create({
      email,
      username,
      password,
    });
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};

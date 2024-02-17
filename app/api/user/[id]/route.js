import { connectToDatabase } from "@lib/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const userdata = await User.find({ email: params.id });
    console.log(userdata);
    return new Response(JSON.stringify(userdata), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(userdata), { status: 404 });
  }
};

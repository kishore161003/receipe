import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  desc: {
    type: String,
    default: "I am a Beginer in Cooking",
    required: [true, "Description is required!"],
  },
  password: {
    type: String,
    required: [true, "password is required!"],
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;

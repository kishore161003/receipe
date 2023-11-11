import mongoose from "mongoose";

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Cook&Das",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
    return connection;
  } catch (error) {
    console.log(error);
  }
};

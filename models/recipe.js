import { Schema, model, models } from "mongoose";

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    default: "/default.jpg",
    // Assuming the images are stored as URLs
  },

  ingredients: {
    type: String, // Assuming ingredients are a single string
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  steps: {
    type: String, // Assuming steps are a single string
    required: true,
  },
  timeRequired: {
    type: String, // You can use a different type based on your requirements (e.g., Number for minutes)
    required: true,
  },
});

const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;

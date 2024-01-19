import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Recipe name is required"],
  },
  ingredients: [{ type: String, required: true }],
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  userOwner: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const recipeModel = mongoose.model("recipes", recipeSchema);

export default recipeModel;
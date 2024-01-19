import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "This username is already taken"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    savedRecipes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "recipes"
    }]

});


const userModel = mongoose.model("users", userSchema);

export default userModel; 


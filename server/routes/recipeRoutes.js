import express from "express";
import recipeModel from "../models/recipeSchema.js";
import userModel from "../models/userSchema.js";
import { verifyToken } from "./userRoutes.js";

const router = express.Router();

//  All Recipes || GET 
router.get("/", async (req, res) => {
    try {
        const recipes = await recipeModel.find({});

        return res.status(200).json({
            success : true,
            data : recipes,
        })

    } catch (err) {
        console.log(err.message);
    }
});

// Create new Recipe || POST
router.post("/", verifyToken ,  async (req, res) => {
    try {

        const recipe = await recipeModel(req.body);

        const createRecipe = await recipe.save();

        return res.status(201).json({
            success: true,
            data: createRecipe,
            message: "Recipe Created"
        })
        
    } catch (err) {
        console.log(err.message);
    }
});

// update recipe || PUT
router.put("/",verifyToken, async (req, res) => {
    try {
        
        const recipe = await recipeModel.findById(req.body.recipeID);

        const user = await userModel.findById(req.body.userID);

        user.savedRecipes.push(recipe);

        await user.save();

        return res.status(200).json({
            message: "Recipe Updated successfully",
            success: true,
            savedRecipes : user.savedRecipes
        })

    } catch (err) {
        console.log(err.message);
    }
});

// Saved Recipes || GET
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        
        const user = await userModel.findById(req.params.userID);

        return res.status(200).json({
            messages: "Recipe saved Successfully",
            savedRecipes: user?.savedRecipes,
            success: true
        });


    } catch (err) {
        console.log(err.message);
    }
}
);


router.get("/savedRecipes/:userID", async (req, res) => {
    try {

        const user = await userModel.findById(req.params.userID);

        const savedRecipes = await recipeModel.find({
            _id: { $in: user.savedRecipes }
        });

        return res.status(200).json({
            success: true,
            message: "Recipe saved",
            savedRecipes : savedRecipes
        })
        
    } catch (err) {
        console.log(err.message);
    }
})




export default router;


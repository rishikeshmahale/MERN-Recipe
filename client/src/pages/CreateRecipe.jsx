import React, { useState } from "react";
import axios from "axios";
import useGetUserID from "../Hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

let backendUrl = "http://localhost:8000";

const CreateRecipe = () => {

  const userID = useGetUserID();

  const navigate = useNavigate();

  const [cookies , ] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setRecipe({
      ...recipe,
      [name]: value,
    });
    console.log({
      ...recipe,
      [name]: value,
    });
  };

  const addIngredients = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
    console.log({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
    console.log({ ...recipe, ingredients: ingredients });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/recipes`, recipe, {
        headers: {
          "Content-Type": "application/json",
          Authorization : cookies.access_token,
        }
      });
      console.log(response);
      if (response) {
        alert("Recipe Created");
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter recipe name"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="ingredients">Enter Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => {
          return (
            <input
              type="text"
              key={index}
              name="ingredients"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          );
        })}
        <button type="button" onClick={addIngredients}>
          Add Ingredients
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          id="instructions"
          onChange={(e) => handleChange(e)}
        ></textarea>

        <label htmlFor="imageUrl">Upload Image</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="cookingTime">Cooking Time (in Minutes)</label>
        <input
          type="minutes"
          id="cookingTime"
          name="cookingTime"
          onChange={(e) => handleChange(e)}
        />

        <button type="submit">Create a Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;

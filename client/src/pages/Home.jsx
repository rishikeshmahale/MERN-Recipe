import React, { useEffect, useState } from "react";
import axios from "axios";
import useGetUserID from "../Hooks/useGetUserID";
import { useCookies } from "react-cookie";

let backendUrl = "http://localhost:8000";

const Home = () => {
  const [Recipes, setRecipes] = useState([]);

  const [savedRecipes, setSavedRecipes] = useState([]);

  const [cookies , ] = useCookies(["access_token"]);

  const userID = useGetUserID();

  console.log("Cookies : ", cookies);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${backendUrl}/recipes`);
        console.log(response);
        console.log(response.data);
        setRecipes(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/recipes/savedRecipes/ids/${userID}`
        );
        console.log("Saved Recipe", response);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRecipe();

    if (cookies) {
      fetchSavedRecipe();
    }

  }, [userID , cookies]);

  const savedRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`${backendUrl}/recipes`, {
        recipeID,
        userID,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization : cookies.access_token
        }
      });
      console.log(response);
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      console.log(err.message);
    }
  };

  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {Recipes.map((recipe, index) => {
          const {
            _id,
            name,
            instructions,
            ingredients,
            imageUrl,
            cookingTime,
          } = recipe;
          return (
            <li key={_id}>
              <div>
                <h2>{name}</h2>

                <button
                  onClick={() => savedRecipe(_id)}
                  disabled={isRecipeSaved(_id)}
                >
                  {
                    isRecipeSaved(_id) ? "Saved" : "Save"
                  }
                </button>
              </div>
              <div>
                Ingredients :
                {ingredients.map((ingredient, index) => {
                  return (
                    <p key={index}>
                      {index + 1} : {ingredient}
                    </p>
                  );
                })}
              </div>
              <div className="instructions">
                <p>Instructions : {instructions}</p>
              </div>
              <img src={imageUrl} alt={name} />
              <p>Cooking Time : {cookingTime} minutes</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;

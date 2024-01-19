import React, { useEffect, useState } from 'react'
import useGetUserID from '../Hooks/useGetUserID';
import axios from 'axios';

let backendUrl = "http://localhost:8000";

const SavedRecipies = () => {

  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    
    const savedRecipes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/recipes/savedRecipes/${userID}`);

        console.log(response);

        setSavedRecipes(response.data.savedRecipes)

      } catch (err) {
        console.log(err.message);
      }
    }
    
    savedRecipes();

    
  }, [userID])
  

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {
          savedRecipes.map((savedRecipe) => {
            const {
            _id,
            name,
            instructions,
            imageUrl,
          } = savedRecipe;
            return (
              <li key={_id}>
                <div>
                  <h2>{name}</h2>
                </div>
                <div className="instructions">
                  <p>{instructions}</p>
                </div>
                <img src={imageUrl} alt={name} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default SavedRecipies

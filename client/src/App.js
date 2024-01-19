import React from 'react';
import { Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipies from './pages/SavedRecipies';


// Components
import Navbar from './Components/Navbar';

import "./App.css"

const App = () => {
  return (
    <>
      
      <Navbar />


      <Routes>

        <Route path={"/"} element={<Home/>} />
        <Route path={"/auth"} element={<Auth/>} />
        <Route path={"/create-recipe"} element={<CreateRecipe/>} />
        <Route path={"/saved-recipes"} element={<SavedRecipies/>} />

      </Routes>
    </>
  )
}

export default App

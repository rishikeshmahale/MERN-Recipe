import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const Logout = async () => {
    setCookies("access_token", "");

    window.localStorage.removeItem("access_token");

    navigate("/auth");

    toast("Logged out");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/create-recipe"}>Create Recipe</Link>

      {!cookies.access_token ? (
        <Link to={"/auth"}>Login/Register</Link>
      ) : (
        <>
          <Link to={"/saved-recipes"}>Saved Recipe</Link>
          <button onClick={Logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import Form from "../Components/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let backendUrl = "http://localhost:8000";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, {
        username,
        password,
      });

      console.log("Login : ", response);

      if (response.data.success) {
        toast(`Welcome ${response.data.data.username}`);
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);

        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Form
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />
     
    </>
  );
};

export default Login;

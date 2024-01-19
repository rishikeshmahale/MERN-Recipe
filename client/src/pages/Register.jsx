import React, { useState } from "react";
import Form from "../Components/Form.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

let backendUrl = "http://localhost:8000";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        username,
        password,
      });

      console.log(response);

      if (response.data.success) {
        // alert(`${response.data.message}`)
        toast(`${response.data.message}`);
        

       

        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error(err.message);
      
    }
  };

  return (
    <>
      <Form
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
      />
      
    </>
  );
};

export default Register;

import React from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({
  username,
  password,
  setUsername,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">{label}</button>
      </form>
    </div>
  );
};

export default Form;

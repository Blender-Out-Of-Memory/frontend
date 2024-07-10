import React, { useState, ChangeEvent } from "react";
import InputField from "../common/InputField";
import CheckboxStayLoggedIn from "./CheckboxStayLoggedIn.tsx";
import googleLogo from "../../assets/googlelogo.png";
import {Link} from "react-router-dom";
import DarkmodeButton from "../common/DarkmodeButton.tsx";
import { useAuth } from "../../contexts/AuthProvider.tsx";

const LogInForm = () => {
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let { username, password } = formData;

    if (username && password ) {
      await login(formData);
    } else {
      alert("Please provide a valid input");
    }
  }

  return (
    <>
      <div className="bg-background-secondary w-128 min-w-64 h-auto flex flex-col justify-center items-center px-8 py-8 rounded-lg shadow">
        <div className="p-6 space-y-4 w-full">
          <div className={"flex flex-row justify-between"}>
            <h1 className="text-3xl font-bold text-text-normal">Log In</h1>
            <DarkmodeButton/>
          </div>
          <form className="w-full space-y-4">
            <InputField
                labelTitle="Name"
                placeholder="your name here..."
                name="username"
                id="username"
                type="username"
                onChange={ handleChange}
                customStyling={""}
            ></InputField>
            <InputField
                labelTitle="Password"
                placeholder="••••••••"
                name="password"
                id="password"
                type="password"
                onChange={ handleChange }
                customStyling={""}
            ></InputField>
            <div className="flex flex-row justify-between">
              <CheckboxStayLoggedIn/>
              <div>
                <a href="http://test.com" className="text-sm text-primary">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
                type="submit"
                className="bg-primary text-white focus:ring-4 w-full focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4"
                onClick={ handleSubmit }
            >
              Log In
            </button>
            <button
                className="flex align-center justify-center bg-gray-200 w-full text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <img src={googleLogo} className="w-6 h-6 mr-2"></img>
              Log In With Google
            </button>
          </form>
          <div className="text-center pt-6 text-text-normal">
            <p>
              Don't have an account? <Link to="/register" className="text-primary">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInForm;

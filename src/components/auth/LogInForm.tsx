import React, { useState, ChangeEvent } from "react";
import InputField from "../common/InputField";
import CheckboxStayLoggedIn from "./CheckboxStayLoggedIn.tsx";
import googleLogo from "../../assets/googlelogo.png";
import {DarkmodeButton} from "../common/DarkmodeButton.tsx";
import {Link} from "react-router-dom";

const LogInForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      // Registration API Call
    } else {
      alert("Please provide a valid input");
    }
  };

  return (
    <>
      <div className="bg-background-secondary w-128 min-w-64 h-auto flex flex-col justify-center items-center px-8 py-8 rounded-lg shadow">
        <div className="p-6 space-y-4 w-full">
          <DarkmodeButton/>
          <h1 className="text-3xl font-bold text-text-normal">Log In</h1>
          <form className="w-full space-y-4">
            <InputField
                labelTitle="Name"
                placeholder="your name here..."
                name="name"
                id="name"
                type="name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
                customStyling={""}
            ></InputField>
            <InputField
                labelTitle="Password"
                placeholder="••••••••"
                name="password"
                id="password"
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
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

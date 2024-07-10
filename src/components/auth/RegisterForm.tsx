import React, { useState, ChangeEvent } from "react";
import InputField from "../common/InputField";
import CheckboxStayLoggedIn from "./CheckboxStayLoggedIn.tsx";
import googleLogo from "../../assets/googlelogo.png"
import {Link, Navigate, useNavigate} from "react-router-dom";
import DarkmodeButton from "../common/DarkmodeButton.tsx";
import { useAuth } from "../../contexts/AuthProvider.tsx";

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "test",
    last_name: "test",
    password: "",
    password2: "",
    email: "",
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
    let { username, first_name, last_name, email, password, password2 } = formData;
    password2 = password

    if (first_name && username && last_name && email && password && password2) {
      await register(formData);
    } else {
      alert("Please provide a valid input");
    }
  };


  return (
    <>
      <div className="bg-background-secondary w-128 min-w-64 h-auto flex flex-col justify-center items-center px-8 py-8 rounded-lg shadow">
        <div className="p-6 space-y-4 w-full">
          <div className={"flex flex-row justify-between"}>
            <h1 className="text-3xl font-bold text-text-normal">Register</h1>
            <DarkmodeButton/>
          </div>
          <form className="w-full space-y-4">
            <InputField
              labelTitle="Name"
              placeholder="your name here..."
              name="username"
              id="username"
              type="username"
              onChange={handleChange}
              customStyling={""}
            ></InputField>
            <InputField
              labelTitle="E-Mail"
              placeholder="name@example.com"
              name="email"
              id="email"
              type="email"
              onChange={handleChange}
              customStyling={""}
            ></InputField>
            <InputField
              labelTitle="Password"
              placeholder="••••••••"
              name="password"
              id="password"
              type="password"
              onChange={handleChange}
              customStyling={""}
            ></InputField>
            <InputField
              labelTitle="Repeat Password"
              placeholder="••••••••"
              name="password2"
              id="password2"
              type="password"
              onChange={handleChange}
              customStyling={""}
            ></InputField>
            <div className="flex flex-row justify-between">
              <CheckboxStayLoggedIn />
              <div>
                <a href="http://test.com" className="text-sm text-primary">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <button
                type="submit"
                className="bg-primary text-text-white focus:ring-4 w-2/5 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4"
                onClick={ handleSubmit }
              >
                Register
              </button>
              <button className="flex align-center justify-center bg-gray-200 w-3/5 text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <img src={googleLogo} className="w-6 h-6 mr-2"></img>Register
                With Google
              </button>
            </div>
          </form>
          <div className="text-center pt-6 text-text-normal">
            <p>
              Already have an account? <Link to="/login" className="text-primary">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;

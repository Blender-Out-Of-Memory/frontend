import InputField from "../common/InputField";
import RadioStayLoggedIn from "../common/RadioStayLoggedIn";
import googleLogo from "../../assets/googlelogo.svg";

const RegisterForm = () => {
  return (
    <>
      <div className="bg-white w-128 min-w-64 h-auto flex flex-col justify-center items-center px-8 py-8 rounded-lg shadow">
        <div className="p-6 space-y-4 w-full">
          <h1 className="text-3xl font-bold">Register</h1>
          <form className="w-full space-y-4">
            <InputField
              labelTitle="Name"
              placeholder="your name here..."
              name="name"
              id="name"
              type="name"
            ></InputField>
            <InputField
              labelTitle="E-Mail"
              placeholder="name@example.com"
              name="email"
              id="email"
              type="email"
            ></InputField>
            <InputField
              labelTitle="Password"
              placeholder="••••••••"
              name="password"
              id="password"
              type="password"
            ></InputField>
            <div className="flex flex-row justify-between">
              <RadioStayLoggedIn />
              <div>
                <a
                  href="http://test.com"
                  className="text-sm text-primary"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <button
                type="submit"
                className="bg-primary text-white focus:ring-4 w-2/5 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4"
              >
                Register
              </button>
              <button className="flex align-center justify-center bg-gray-200 w-3/5 text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <img src={googleLogo} className="w-6 h-6 mr-2"></img>Register
                With Google
              </button>
            </div>
          </form>
          <div className="text-center pt-6">
            <p>Already have an account? <a className="text-primary">Login</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;

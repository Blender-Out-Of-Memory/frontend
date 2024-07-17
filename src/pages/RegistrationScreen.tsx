import RegisterForm from "../components/auth/RegisterForm";

const RegistrationScreen = () => {

    if(localStorage.getItem("data-theme") != null){
        document.documentElement.setAttribute("data-theme", localStorage.getItem("data-theme") as string);
    }

  return (
    <div className="bg-background-primary flex items-center justify-center min-h-screen bg-gray">
      <RegisterForm />
    </div>
  );
};

export default RegistrationScreen;

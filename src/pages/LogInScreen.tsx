import LogInForm from "../components/auth/LogInForm";

const LogInScreen = () => {

    if(localStorage.getItem("data-theme") != null){
        document.documentElement.setAttribute("data-theme", localStorage.getItem("data-theme") as string);
    }

  return (
    <div className="bg-background-primary flex items-center justify-center min-h-screen">
      <LogInForm />
    </div>
  );
};

export default LogInScreen;

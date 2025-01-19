import "./App.css";
import LoginForm from "./Components/User/Login/LoginForm.jsx";
import SignUpForm from "./Components/User/SignUp/SignUpForm.jsx";

function App() {
  return (
    <>
      <div className="flex justify-center h-screen items-center ">
        {/* <SignUpForm /> */}
        <LoginForm/>
      </div>
    </>
  );
}

export default App;

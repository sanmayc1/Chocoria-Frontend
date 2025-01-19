import "./App.css";
import LoginForm from "./Components/User/Login/LoginForm.jsx";
import SignUpForm from "./Components/User/SignUp/SignUpForm.jsx";
import Navbar from "./Components/User/Navbar/Navbar.jsx";
import {Route,Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <>

     
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
        
        {/* <LoginForm/> */}
        
     
    </>
  );
}

export default App;

import React, { useState } from "react";
import CommonBtn from "../../User/button/CommonBtn";
import { useNavigate } from "react-router-dom";
import SingleInputField from "../../HelperComponents/InputFiled/SingleInputField";

const AdminLogin = () => {

  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    const {name , value} = e.target
    setFormData((prev)=>({...prev,[name]:value}))

  }

  
  
  return (
    <div className="bg-white w-full max-w-md flex-col pt-6 rounded-3xl shadow-lg m-3">
      {/* Welcome Heading */}
      <div className="w-full flex justify-center">
        <img src="/adminSidelogo.png" className="w-60" alt="" />
      </div>

      {/* fields */}
      <div className="pt-12 space-y-4">
      <SingleInputField name={"email"} placeholder={"Email"}  />
      <SingleInputField name={"password"} handleChange={handleChange} placeholder={"Password"} value={formData.password} />
      </div>
      

      {/* Google SignIn */}
      <div className="w-full flex justify-center py-6 px-4 select-none">
        <CommonBtn
          btnName={"Log In"}
        />
      </div>

    
     
    </div>
  );
};

export default AdminLogin;

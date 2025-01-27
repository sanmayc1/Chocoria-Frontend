import React, { useState } from "react";
import CommonBtn from "../../User/button/CommonBtn.jsx";
import { useNavigate } from "react-router-dom";
import SingleInputField from "../../HelperComponents/InputFiled/SingleInputField.jsx";
import { admin_login } from "../../../Services/api/api.js";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../../Store/Slice/authSlice.jsx";
const AdminLogin = () => {

  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  const [err,setErr] = useState('')
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    const {name , value} = e.target
    setFormData((prev)=>({...prev,[name]:value}))

  }
  
  const handeSubmit = async(e)=>{  
    e.preventDefault()
   
    
    if (!formData.email.trim() || !formData.password.trim()) {
      setErr('Please fill all the fields');
      return;
    }
    setErr('')
    // send data to backend
   const response= await admin_login(formData)
    if(response.status === 200){
      dispatch(SET_AUTH(response.data))
      navigate('/admin/dashboard')
      
    // navigate('/admin/dashboard')
  }

  if(response.status === 401){
    setErr(response.response.data.message)
  }
  if(response.status === 500){
    setErr('Something went wrong')
  }
  
}
  
  return (
    <div className="bg-white w-full max-w-md flex-col pt-6 rounded-3xl shadow-lg m-3">
      {/* Welcome Heading */}
      <div className="w-full flex justify-center mt-4">
        <img src="/adminSidelogo.png" className="w-60" alt="" />
      </div>

      {/* fields */}
      <div className="pt-12 space-y-4">
      <SingleInputField name={"email"} placeholder={"Email"} handleChange={handleChange}  />
      <SingleInputField name={"password"} handleChange={handleChange} placeholder={"Password"} value={formData.password} filedType={"password"} />
      </div>
      {err && <p className="text-red-500 text-xs pl-16 ml-2 pt-1">{err}</p>}

      {/* Google SignIn */}
      <div className="w-full flex justify-center py-6 px-4 select-none">
        <CommonBtn
          btnName={"Log In"}
          clickEvent={handeSubmit}
        />
      </div>

    
     
    </div>
  );
};

export default AdminLogin;

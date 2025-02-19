import { useEffect, useState } from "react";
import CommonBtn from "../button/CommonBtn.jsx";
import SingleInputField from "../../HelperComponents/InputFiled/SingleInputField.jsx";
import { auth_login } from "../../../Services/api/api.js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../../Store/Slice/authSlice.jsx";


const LoginFields = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const navigate  = useNavigate()
  // handle change of input filed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit

  const handeSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email.trim() || !formData.password.trim()){
      setErr("Please Enter Email and Password")
      return
    }
    setErr("")
    const response = await auth_login(formData);
    if (response.status !== 200) {
      if (response.status === 401) {
       setErr(response.response.data.message)
       return
      }
     
      if(response.status ===403 && response.response.data.message==="Account not verified.Redirect to verification page"){
        toast.error(response.response.data.message, {
          position: "top-center",
          autoClose: 2000,
          style:{width: "100%"},
        });
        setTimeout(()=>{
            navigate(`/otp/${response.response.data.id}`)
        },3500)
        return
      }
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        style:{width: "100%"},
      });
      return
    }
 
    if(response.status === 200){
    setErr('')
    dispatch(SET_AUTH(response.data))
    navigate('/')
    }
  };

  return (
    <>
    
      <form className="w-full px-4">
        <div className="space-y-4 w-full">
          {/* Email */}
          <div className="flex justify-center">
          <SingleInputField
            placeholder={"Email Address"}
            value={formData.email}
            handleChange={handleChange}
            name={"email"}
          />
          </div>
         
          {/* Password */}
          <div className="flex justify-center">
          <SingleInputField
            placeholder={"Password"}
            value={formData.password}
            handleChange={handleChange}
            name={"password"}
            filedType={"password"}
          />
          </div>
        </div>
        {err && <p className="pl-14 pt-1 w-fit text-red-500 text-sm">{err}</p>}
        {/* forget password */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-xs">
            <p className="text-end text-xs font-semibold pt-3 hover:text-gray-600 cursor-pointer select-none"
              onClick={() => {
                navigate("/forget-password");
              }}
            >
              Forget Password?
            </p>
          </div>
        </div>
        {/* login button */}
        <div className="w-full flex justify-center py-6 select-none">
          <CommonBtn btnName={"LOG IN"} clickEvent={handeSubmit} />
        </div>
      </form>
      
    </>
  );
};
export default LoginFields;

import LoginForm from "../Common/CommonForm.jsx"
import SignUpFields from "./SignUpFields.jsx"


const SignUpForm = ()=>{
    return (
        <LoginForm heading={"Sign UP"} pageName={"SIGN UP"} fields={<SignUpFields/>}/>
    )
}

export default SignUpForm
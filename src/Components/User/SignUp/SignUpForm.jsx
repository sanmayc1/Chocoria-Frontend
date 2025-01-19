import CommonForm from "../Common/CommonForm.jsx";
import SignUpFields from "./SignUpFields.jsx";

const SignUpForm = () => {
  return (
    
  <CommonForm
      heading={"Sign UP"}
      pageName={"SIGN UP"}
      fields={<SignUpFields />}
    />
    
  
  );
};

export default SignUpForm;

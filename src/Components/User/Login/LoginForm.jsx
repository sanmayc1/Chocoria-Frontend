import CommonForm from "../Common/CommonForm.jsx";
import LoginFields from "./LoginFields.jsx";

const LoginForm = () => {
  return (
    <>
      <CommonForm
        heading={"Welcome Back!"}
        pageName={"LOG IN"}
        fields={<LoginFields />}
      />
    </>
  );
};
export default LoginForm;

import { GoogleLogin } from "@react-oauth/google";
import { setCookie } from "../utils/setToCookie";

const AuthBtn = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const token = credentialResponse.credential;
        localStorage.setItem("token", token as string);
        setCookie("token", token as string, 30);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
    />
  );
};

export default AuthBtn;

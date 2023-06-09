import React from "react";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {

  const history = useNavigate()

  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem('app_token', 'OK')
    sessionStorage.setItem('app_token', 'OK')
    history('/')
  };

  const onFailure = (error) => {
    console.error(error);
  };

  return (
    <GoogleLogin
      clientId="418515988040-0s4fqsbdum0vrvc24m3rotfg5gp7m1c4.apps.googleusercontent.com"
      buttonText="Войти через Google"
      onSuccess={responseGoogle}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginButton;

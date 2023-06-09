import { GoogleLogout } from "@leecheuk/react-google-login";
import { useNavigate } from "react-router-dom";

const GoogleLogoutButton = () => {

  const history = useNavigate()

  const onSuccess = () => {
    console.log("Log out success");
    localStorage.clear()
    sessionStorage.clear()
    history('/login')
  };

  return (
    <div id="signOut">
      <GoogleLogout
        clientId="418515988040-0s4fqsbdum0vrvc24m3rotfg5gp7m1c4.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default GoogleLogoutButton;

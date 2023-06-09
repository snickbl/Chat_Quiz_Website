// import { useEffect } from 'react';
import './App.css';
import { URLs } from './URLs';
// import { gapi } from 'gapi-script';
// import GoogleLoginButton from './GoogleLoginButton';
// import GoogleLogoutButton from './GoogleLogoutButton';

function App() {

  

  // let accessToken = gapi.auth?.getToken().access_token

  return (
    <div className="App">
      <URLs/>
      {/* <GoogleLoginButton/>
      <GoogleLogoutButton/> */}
    </div>
  );
}

export default App;

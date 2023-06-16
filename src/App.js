import "./App.css";
import NavBar from "./components/NavBar";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { URLs } from "./URLs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  
  const [user] = useAuthState(auth);
  const history = useNavigate()

  useEffect(()=>{
    // (user !== null) ? history('/') : console.log('net');
    user && history('/')
    
  },[user])

  return (
    <div className="App">
      <NavBar />
      {/* {!user ? <Welcome /> : <ChatBox />} */}
      <URLs/>
    </div>
  );
}
export default App;
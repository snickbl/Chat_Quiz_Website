import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const NavBar = () => {

  const [user] = useAuthState(auth);
  const firestore = getFirestore();
  const userID = getAuth()?.currentUser?.uid;

  // console.log(user);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = async () => {
    try {
      const userRef = doc(firestore, 'users', userID);
      await setDoc(userRef, {
        userReadiness: false,
      });
  
      console.log('Выход');
    } catch (error) {
      console.error('Ошибка при обновлении пользовательских данных:', error);
    }
    auth.signOut();
  };

  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
    </nav>
  );
};
export default NavBar;
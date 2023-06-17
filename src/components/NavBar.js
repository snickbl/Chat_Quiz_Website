import React, { useEffect } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";

const NavBar = () => {

  const [user] = useAuthState(auth);
  const firestore = getFirestore();
  const userID = getAuth()?.currentUser?.uid;

  // console.log(user);

  useEffect(()=>{

    const handleAuth = async () => {
      try {
        const userRef = doc(firestore, 'users', userID);
        await setDoc(userRef, {
          userReadiness: false,
        });
        console.log('Пользовательские данные успешно обновлены');
      } catch (error) {
        console.error('Ошибка при обновлении пользовательских данных:', error);
      }
    }

    if(user){
      handleAuth()
    }

    const handleWindowClose = async () => {
      try {
        const userRef = doc(firestore, "users", userID);
        await deleteDoc(userRef);
        console.log("Документ пользователя успешно удален");
      } catch (error) {
        console.error("Ошибка при удалении документа пользователя:", error);
      }
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };

  },[user])

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = async () => {
    try {
      const userRef = doc(firestore, 'users', userID);
      await await deleteDoc(userRef);
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
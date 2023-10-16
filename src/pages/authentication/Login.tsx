import { useState,ChangeEvent } from "react";
import {auth} from "../../config/firebase";
import "../../styles/login.css"
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    getAdditionalUserInfo, signInWithEmailAndPassword
  } from "firebase/auth";
  import { useNavigate } from "react-router";
  import { useLocation } from "react-router";
import createUserDoc from "../../utils/firebase-functions/createUserDoc";
function Login() {
    const navigate = useNavigate()
    const authentication = getAuth();
    const provider = new GoogleAuthProvider();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function SignInWithGoogle() {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const newUserCheck = getAdditionalUserInfo(result);
            console.log({user})
            if (newUserCheck?.isNewUser) {
              createUserDoc(user.uid, user.displayName);
                //create docs
            }
            
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      }
    
      function SignInWithFacebook() {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const newUserCheck = getAdditionalUserInfo(result);
            if (newUserCheck?.isNewUser) {
                // create docs
                createUserDoc(user.uid, user.displayName);
            }
            
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      }
     
    
      function handleLogIn(e: ChangeEvent<HTMLFormElement>) {
    
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            if (
              errorCode === "auth/wrong-password" ||
              errorCode === "auth/user-not-found" ||
              errorCode === "auth/invalid-email"
            ) {
                console.log('something')
            } else {
              console.log('another toast')
            }
          });
      }

  return (
    <>
      <div className="container">
        <div className="sign-up-form">
          <div className="form-image">
            {/* 
            <img src="./assets/form-bg.png" alt="" />
           */}
            </div>
          <form className="form-content" onSubmit={()=>handleLogIn}>
            <div className="form-heading">
              {/* 
              <img src="./assets/logo.png" alt="" />
               */}
              <h1>Create Account</h1>
              <p>
                Please fill out all the required fields to create your account!
              </p>
            </div>
            <div className="input-wrap">
              <div className="input">
                <input type="text" id="username" placeholder=" "  onChange={(e)=>setEmail(e.target.value)}/>
                <div className="label">
                  <label className="login-label" htmlFor="username">Username</label>
                </div>
              </div>
              <div className="input">
                <input type="password" id="password" placeholder=" " onChange={(e)=>setPassword(e.target.value)}/>
                <div className="label">
                  <label className="login-label" htmlFor="password">Password</label>
                </div>
              </div>

              <div className="google-btn" onClick={SignInWithGoogle}>
                <div className="google-icon-wrapper">
                  {/* 
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  /> */}
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </div>


              <button onClick={handleLogIn}>Create Account</button>
            
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

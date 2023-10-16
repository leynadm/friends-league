import { useState, ChangeEvent } from "react";
import { auth } from "../../config/firebase";
import "../../styles/login.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import createUserDoc from "../../utils/firebase-functions/createUserDoc";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log('preparing to create user doc')
      await createUserDoc(user.uid, `${firstname} ${lastname}`);

      
      await sendEmailVerification(user);
      /* 
      await sendEmailVerification(user);
      */
    } catch (error) {
      console.log("error");

      if (isFirebaseError(error)) {
        const errorCode = error.code;
        const errorMessage = error.message;
      } else {
        console.log("An unknown error occurred:", error);
      }
    }
  };

  function isFirebaseError(
    error: unknown
  ): error is { code: string; message: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "message" in error &&
      error.code === "string" &&
      error.message === "string"
    );
  }

  return (
    <>
      <div className="container">
        <div className="sign-up-form">
          <div className="form-image">
            <img src="./assets/form-bg.png" alt="" />
          </div>
          <form onSubmit={()=>handleSignUp} className="form-content">
            <div className="form-heading">
              <img src="./assets/logo.png" alt="" />
              <h1>Create Account</h1>
              <p>
                Please fill out all the required fields to create your account!
              </p>
            </div>

            <div className="input-wrap">
              <div className="input">
                <input
                  type="text"
                  id="firstName"
                  placeholder=" "
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
                <div className="label">
                  <label htmlFor="firstName">First Name</label>
                </div>
              </div>

              <div className="input">
                <input
                  type="text"
                  id="lastName"
                  placeholder=" "
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
                <div className="label">
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>

              <div className="input">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="label">
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="input">
                <input
                  type="password"
                  id="password"
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="label">
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="input">
                <input type="text" id="discordId" placeholder=" " required />
                <div className="label">
                  <label htmlFor="discordId">Discord ID</label>
                </div>
              </div>
              <button onClick={handleSignUp}>Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;

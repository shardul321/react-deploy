import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../firebase/firebase";
import { signInWithGoogle,signInWithFacebook,signInWithGithub,emailData } from "../service/serviceAuth";

const LoginPage = () => {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  
  const clearErrors = () => {
    setPasswordError("");
    setEmailError("");
  };

  const handleLogin =async (e) => {
    e.preventDefault();
    clearErrors();
   const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disable":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
      console.log(`res`, res);
      if(res)return history.push("/home");
  };

  const handleSignup =async (e) => {
    e.preventDefault();

    clearErrors();
    const resSignup = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
      console.log(`resSignup`, resSignup)
      if(resSignup)return history.push("/home");

  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const authListenner = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListenner();
    setUser(emailData);
  }, []);
console.log(`user`, user)
  
  useEffect(() => {
    user ? history.push("/home") : history.push("/")
  }, [user]);

  return (
    <div className="loginpage">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  <b>
                    <i>{!hasAccount ? "Sign In" : "Sign up"}</i>
                  </b>
                </h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <label for="inputEmail">Email address :-</label>
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p style={{ color:"red"}}>{emailError}</p>
                  </div>

                  <div className="form-label-group">
                    <label for="inputPassword">Password :-</label>
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p style={{ color:"red"}}>{passwordError}</p>
                  </div>

                  <div className="mt-4">
                    {!hasAccount ? (
                      <>
                        <button
                          className="btn btn-lg btn-primary btn-block text-uppercase"
                          type="submit"
                          onClick={handleLogin}
                        >
                          Sign in
                        </button>
                        <p className="mt-2">
                          Don't have an account ?{" "}
                          <span onClick={() => setHasAccount(!hasAccount)}>
                            <b>
                              <u>Sign up</u>
                            </b>
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-lg btn-primary btn-block text-uppercase"
                          type="submit"
                          onClick={handleSignup}
                        >
                          Sign up
                        </button>
                        <p className="mt-2">
                          Have an account ?{" "}
                          <span onClick={() => setHasAccount(!hasAccount)}>
                            <b>
                              <u>Sign in</u>
                            </b>
                          </span>
                        </p>
                      </>
                    )}
                  </div>

                  <hr className="my-4" />
                  <button
                    className="btn btn-lg btn-google btn-rounded btn-block text-uppercase"
                    type="submit"
                    onClick={signInWithGoogle}
                  >
                    <i className="fa fa-google mr-2"></i>{!hasAccount ? "Sign in with Google" : "Sign Up with Google"} 
                  </button>
                  <button
                    className="btn btn-lg btn-facebook btn-rounded btn-block text-uppercase"
                    type="submit"
                    onClick={signInWithFacebook}
                  >
                    <i className="fa fa-facebook-f mr-2"></i>{!hasAccount ? "Sign in with Facebook" : "Sign Up with Facebook"}
                    
                  </button>
                  <button
                    className="btn btn-lg btn-github btn-rounded btn-block text-uppercase"
                    type="submit"
                    onClick={signInWithGithub}
                  >
                    <i className="fa fa-github mr-2"></i> {!hasAccount ? "Sign in with Github" : "Sign Up with Github"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
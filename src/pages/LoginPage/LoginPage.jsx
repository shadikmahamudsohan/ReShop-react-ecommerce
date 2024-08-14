import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, error2] =
    useSendPasswordResetEmail(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      fetch(`${process.env.REACT_APP_serverApi}user?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "Success") {
            toast("Account created successfully!");
            localStorage.setItem("token", JSON.stringify(data?.accessToken));
            navigate(localStorage.getItem("route"));
          }
        });
    }
  }, [user]);
  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  const handleResetPassword = () => {
    if (!email) {
      toast("please enter your email");
    } else {
      sendPasswordResetEmail(email)
        .then(() => {
          toast("check your email for password reset instructions");
        })
        .catch((error) => {
          toast(error.message);
        });
    }
  };
  return (
    <section className="login-section">
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <br />
          <Link to="/register">Create a new account</Link>
          <br />
          <p onClick={handleResetPassword} className="forget-password">
            Forgot password?
          </p>
        </form>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error?.message}</h2>}
      </div>
    </section>
  );
};

export default LoginPage;

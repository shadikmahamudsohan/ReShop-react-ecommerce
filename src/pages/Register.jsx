import React, { useEffect, useState } from "react";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendEmailVerification } from "react-firebase-hooks/auth";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fromError, setFromError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification, sending, error2] =
    useSendEmailVerification(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setFromError(error?.message);
    }
  }, [error]);
  useEffect(() => {
    if (user) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email }),
      };

      fetch(`${process.env.REACT_APP_serverApi}user`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "Success") {
            toast("Account created successfully!");
            localStorage.setItem(
              "token",
              JSON.stringify(data.data?.accessToken)
            );
            navigate("/");
            sendEmailVerification()
              .then(() => {
                toast("verification email sent");
              })
              .catch((error) => {
                toast(error.message);
              });
          }
        });
    }
  }, [user]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { username, password };
    console.log("Form Data:", formData);
    // Handle login logic here, e.g., sending data to an API

    if (confirmPassword === password) {
      createUserWithEmailAndPassword(email, password);
    } else {
      setFromError("Wrong Confirm Password!");
    }
  };

  return (
    <section className="login-section">
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
        <h2>{fromError}</h2>
        {loading && <h2>Loading...</h2>}
      </div>
    </section>
  );
};

export default RegisterPage;

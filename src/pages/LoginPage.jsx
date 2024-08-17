import React, { useEffect, useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
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
    <section className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto mt-10">
      <form onSubmit={handleSubmit} className="">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center mb-5">
          Login
        </h2>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={email}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Link
          to="/register"
          className="text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600 mb-5 cursor-pointer"
        >
          Create a new account
        </Link>
        <p
          onClick={handleResetPassword}
          className="text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600 mb-5 cursor-pointer"
        >
          Forgot password?
        </p>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
      {loading && <p className="text-gray-500 text-center mt-4">Loading...</p>}
      {error && (
        <p className="text-red-500 text-center mt-4">{error?.message}</p>
      )}
    </section>
  );
};

export default LoginPage;

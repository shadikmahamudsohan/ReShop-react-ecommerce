import React, { useContext, useEffect } from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [sendEmailVerification, sending, error2] =
    useSendEmailVerification(auth);
  const { firebaseUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (firebaseUser?.emailVerified) {
      navigate(localStorage.getItem("route"));
    }
  }, [firebaseUser?.emailVerified]);
  if (sending) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="">
        <h1 className="">Please Verify Your Email</h1>
        <p className="">
          Please check your mail. If you have verified please reload the page.
          If you don't got an email press the button to send a email to{" "}
          {firebaseUser?.email}
        </p>
        <button
          className=""
          onClick={() => {
            sendEmailVerification().then(() =>
              toast("Email Sent to " + firebaseUser?.email)
            );
          }}
        >
          Send Email
        </button>
        {error2 && <div className="">{error2.message}</div>}
      </div>
    </div>
  );
};

export default Verify;

import React, { useContext, useEffect } from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import "./Verify.css"; // Import the CSS file
import { UserContext } from "../../context/UserContext";
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
    <div className="verify-container">
      <div className="verify-content">
        <h1 className="verify-title">Please Verify Your Email</h1>
        <p className="verify-message">
          Please check your mail. If you have verified please reload the page.
          If you don't got an email press the button to send a email to{" "}
          {firebaseUser?.email}
        </p>
        <button
          className="verify-button"
          onClick={() => {
            sendEmailVerification().then(() =>
              toast("Email Sent to " + firebaseUser?.email)
            );
          }}
        >
          Send Email
        </button>
        {error2 && <div className="error-message">{error2.message}</div>}
      </div>
    </div>
  );
};

export default Verify;

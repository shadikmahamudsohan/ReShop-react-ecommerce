import React, { useContext, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import auth from "../../firebase.init";

const RequireAuth = ({ children }) => {
  let location = useLocation();
  useEffect(() => {
    window.localStorage.setItem("route", location.pathname);
  }, [location.pathname]);

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return;
  }
  if (error) {
    return;
  }
  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (!user?.emailVerified) {
    return <Navigate to="/verify" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;

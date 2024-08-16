import React, { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!loading && !error && user && token !== "undefined") {
      fetch(`${process.env.REACT_APP_serverApi}user/myInfo`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`, // notice the Bearer before your token
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.status === "Success") {
            setUserData(data.data);
          } else {
            setUserData(null);
          }
        })
        .catch((err) => {
          console.error(err);
          setUserData(null);
        });
    } else {
      setUserData(null);
    }
  }, [error, loading, user, token]);

  return (
    <UserContext.Provider value={{ user: userData, firebaseUser: user }}>
      {children}
    </UserContext.Provider>
  );
};

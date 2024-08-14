import { useContext, useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";

const usePreviousUrl = () => {
  const location = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return previousLocation.current.pathname;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, firebaseUser } = useContext(UserContext);
  const [signOut, loading, error] = useSignOut(auth);
  const previousURL = usePreviousUrl();

  console.log(previousURL);
  const navigate = useNavigate();
  useEffect(() => {
    if (!firebaseUser?.emailVerified && firebaseUser) {
      navigate("/verify");
    } else {
      navigate(`${previousURL}`);
    }
  }, [firebaseUser]); // complete this i am tired now :(
  const links = [
    { id: 1, route: "/", name: "Home" },
    { id: 2, route: "/shop", name: "shop" },
    { id: 3, route: "/cart", name: "Cart" },
  ];
  return (
    <header>
      <div className="desktop-view-navbar">
        <Link to="/">
          <h1 className="navbar-title">ReShop</h1>
        </Link>
        <div className="header-link-container">
          {/* all the normal links */}
          {links.map(({ id, name, route }) => (
            <Link key={id} to={route} className="header-link">
              {" "}
              {name}
            </Link>
          ))}
          {/* authentication links */}
          {!user ? (
            <Link to={`/login`} className="header-link">
              {" "}
              Login
            </Link>
          ) : (
            <>
              <button
                onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    toast("You are sign out");
                  }
                }}
              >
                Sign out
              </button>
              {user?.role !== "admin" ? (
                ""
              ) : (
                <Link to={`/dashboard`} className="header-link">
                  {" "}
                  Dashboard
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mobile-view-navbar">
        <h1 className="navbar-title">ReShop</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="nav-menu-button">
          open
        </button>
      </div>
      <div
        style={!isOpen ? { display: "none" } : { display: "flex" }}
        className="mobile-link-container"
      >
        {/* all the normal links */}
        {links.map(({ id, name, route }) => (
          <Link key={id} to={route} className="header-link">
            {" "}
            {name}
          </Link>
        ))}
        {/* authentication links */}
        {!user ? (
          <Link to={`/login`} className="header-link">
            {" "}
            Login
          </Link>
        ) : (
          <Link to={`/register`} className="header-link">
            {" "}
            Register
          </Link>
        )}
        {/* authorized links */}
        {user?.role !== "admin" ? (
          ""
        ) : (
          <Link to={`/dashboard`} className="header-link">
            {" "}
            Dashboard
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

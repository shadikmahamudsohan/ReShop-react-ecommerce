import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [signOut] = useSignOut(auth);

  const links = [
    { id: 1, route: "/", name: "Home" },
    { id: 2, route: "/shop", name: "Shop" },
    { id: 3, route: "/cart", name: "Cart" },
  ];

  return (
    <header>
      <div className="hidden md:flex justify-between items-center bg-slate-200 py-5">
        <Link to="/">
          <h1 className="">ReShop</h1>
        </Link>
        <div className="">
          {links.map(({ id, name, route }) => (
            <Link key={id} to={route} className="hover:bg-slate-300 px-3">
              {name}
            </Link>
          ))}
          {!user ? (
            <Link to="/login" className="hover:bg-slate-300 px-3">
              Login
            </Link>
          ) : (
            <>
              <button
                className="hover:bg-slate-600 bg-slate-500 px-3 rounded"
                onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    toast("You are signed out");
                  }
                }}
              >
                Sign out
              </button>
              {user.role === "admin" && (
                <Link to="/dashboard" className="hover:bg-slate-300 px-3">
                  Dashboard
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      <div className="md:hidden flex justify-between items-center bg-slate-200 py-5">
        <h1 className="">ReShop</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="">
          Open
        </button>
      </div>
      <div
        style={{ display: isOpen ? "flex" : "none" }}
        className="flex flex-col bg-slate-200 py-5"
      >
        {links.map(({ id, name, route }) => (
          <Link key={id} to={route} className="hover:bg-slate-300 py-3">
            {name}
          </Link>
        ))}
        {!user ? (
          <Link to="/login" className="hover:bg-slate-300 py-3">
            Login
          </Link>
        ) : (
          <>
            <button
              className="hover:bg-slate-600 bg-slate-500 py-3 rounded"
              onClick={async () => {
                const success = await signOut();
                if (success) {
                  toast("You are signed out");
                }
              }}
            >
              Sign out
            </button>
            {user.role === "admin" && (
              <Link to="/dashboard" className="hover:bg-slate-300 py-3">
                Dashboard
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

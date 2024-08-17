import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/globalComponents/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen container mx-auto">{children}</main>
      <ToastContainer />
    </div>
  );
};
export default Layout;

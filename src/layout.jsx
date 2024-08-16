import Navbar from "./components/globalComponents/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <ToastContainer />
    </div>
  );
};
export default Layout;

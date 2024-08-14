import Header from "./components/globalComponents/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <ToastContainer />
    </div>
  );
};
export default Layout;

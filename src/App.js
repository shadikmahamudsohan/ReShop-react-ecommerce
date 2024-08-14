import "./App.css";

import Layout from "./layout";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Register";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
import ShopPage from "./pages/ShopPage/ShopPage";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import { ContactUs } from "./pages/ContactUs";
import Verify from "./pages/Verify/Verify";
import RequireAuth from "./components/Required/RequireAuth";
import AllUser from "./pages/Dashboard/AllUser/AllUser";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/shop" element={<ShopPage />} />
            <Route
              exact
              path="/product/:id"
              element={
                <RequireAuth>
                  <ProductPage />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/payment/:id"
              element={
                <RequireAuth>
                  <PaymentPage />
                </RequireAuth>
              }
            />
            <Route exact path="/contact-us" element={<ContactUs />} />
            <Route path="/verify" element={<Verify />} />
            <Route
              exact
              path="/create-product"
              element={<CreateProductPage />}
            />
            <Route exact path="/all-users" element={<AllUser />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </UserProvider>
    </div>
  );
}

export default App;

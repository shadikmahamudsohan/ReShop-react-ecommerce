import Layout from "./layout";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
import ShopPage from "./pages/ShopPage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";
import { ContactUs } from "./pages/ContactUs";
import Verify from "./pages/Verify";
import RequireAuth from "./components/RequireAuth";
import AllUser from "./pages/AllUser";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 dark:text-white animate-fade-in">
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

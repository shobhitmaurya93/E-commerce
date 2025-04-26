import React from "react";
import Navbar from "./component/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./component/Footer";
import { useAppContext } from "./content/AppContext";
import Login from "./component/Login";
import Products from "./pages/Products";
import CategoryProducts from "./component/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./component/Cart";
import AddAddress from "./component/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./component/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Payment from "./component/Payment";

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const {showUserLogin, isSeller } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />
      <div className={ "px-6 md:px-16 lg:px-24 xl:px-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:category" element={<CategoryProducts />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/addAddress" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/payment" element={<Payment/>} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route
              path="product-list"
              element={isSeller ? <ProductList /> : null}
            />
            <Route
              path="orders"
              element={isSeller ? <Orders /> : null}
            />
          </Route>
        </Routes>
        {!isSellerPath && <Footer />}
      </div>
    </div>
  );
};

export default App;

import "./App.css";
import Homepage from "./Pages/homepage/Homepage";
import Login from "./Pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/register/Register";
import Detail from "./Pages/detail/Detail";
import Cart from "./Pages/cart/Cart";
import Pay from "./Pages/pay/Pay";
import Bill from "./Pages/Bill/Bill";
import ShopBag from "./Pages/shop/ShopBag";
import ShopBalo from "./Pages/shop/ShopBalo";
import CheckoutPage from "./Pages/pay/CheckoutPage";
import AdminPage from "./Admin/AdminPage";
import ProductList from "./Admin/ProductList/ProductList";
import Users from "./Admin/users/Users";
import ProductDetail from "./Admin/ProductList/ProductDetail";
import AddProduct from "./Admin/ProductList/AddProduct";
import { useEffect, useRef, useState } from "react";
const AdminRoute = ({ element, isLoggedIn }) => {
    if (isLoggedIn != 1) {
        return <Navigate to="/login" />;
    }
    return element;
};
function App() {
    const isLoggedInRef = useRef(null);

    const token = JSON.parse(localStorage.getItem("tokenAdmin"));
    isLoggedInRef.current = token;

    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop/tui" element={<ShopBag />} />
                <Route path="/shop/balo" element={<ShopBalo />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Pay />}>
                    <Route path="step-1" element={<CheckoutPage />} />
                    <Route path="step-2" element={<Bill />} />
                </Route>
                <Route
                    path="/admin"
                    element={
                        <AdminRoute
                            element={<AdminPage />}
                            isLoggedIn={isLoggedInRef.current}
                        />
                    }
                >
                    <Route path="user" element={<Users />} />
                    <Route path="products">
                        <Route index element={<ProductList />} />
                        <Route path="edit/:id" element={<ProductDetail />} />
                        <Route path="addproduct" element={<AddProduct />} />
                    </Route>
                    {/* <Route path="orders" element={<OrderList />} /> */}
                </Route>
            </Routes>
        </div>
    );
}

export default App;

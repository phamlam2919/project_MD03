import React from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { formatCurrency } from "../../helpers";

function Cart() {
    let cart = useSelector((state) => state.cart);
    let navigate = useNavigate();
    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length > 0) {
            navigate("/checkout/step-1");
        } else {
            Swal.fire(
                "Không Thành Công",
                "Chưa có sản phẩm nào trong giỏ hàng",
                "warning"
            );
        }
    };
    return (
        <div>
            <Header />
            <div>
                <div>
                    <div className="container-cart">
                        <h1>Giỏ hàng</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">Trang chủ</li>
                                <li
                                    className="breadcrumb-item "
                                    aria-current="page"
                                >
                                    Giỏ hàng
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="cart-container">
                        <h1>Giỏ hàng của bạn tại MLB Việt Nam</h1>
                        {cart.length > 0 ? (
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th className="product-info">
                                            Thông tin sản phẩm
                                        </th>
                                        <th
                                            style={{ textAlign: "center" }}
                                            className="price"
                                        >
                                            Đơn giá
                                        </th>
                                        <th
                                            style={{ textAlign: "center" }}
                                            className="quantity"
                                        >
                                            Số lượng
                                        </th>
                                        <th
                                            style={{ textAlign: "center" }}
                                            className="total"
                                        >
                                            Thành tiền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((e, i) => (
                                        <CartItem key={i} detail={e} />
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}
                            >
                                Chưa có sản phẩm nào trong giỏ hàng
                            </p>
                        )}
                        <div className="cart-subtotal">
                            <div className="cart-subtotal1">
                                <p>
                                    <strong>Tổng tiền:</strong>
                                </p>
                                <p>
                                    <strong style={{ color: "red" }}>
                                        {formatCurrency(
                                            cart.reduce((pre, cur) => {
                                                return (pre +=
                                                    cur.price *
                                                    (1 - cur.sale / 100) *
                                                    cur.clickNumber);
                                            }, 0)
                                        )}
                                    </strong>
                                </p>
                            </div>
                            <Link onClick={handleCheckout}>
                                <button>Thanh toán</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;

import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
function Header() {
    let cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const token = JSON.parse(localStorage.getItem("token")) || {};
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/users/${token}`)
            .then((res) => {
                setUser(res.data);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
                setLoggedIn(false);
            });
    }, []);

    return (
        <div className="header-container">
            <div className="header-img">
                <Link to="/">
                    <img
                        src="https://bizweb.dktcdn.net/100/446/974/themes/849897/assets/logo.png?1693214259155"
                        alt=""
                    />
                </Link>
            </div>
            <div className="header-nav">
                <ul>
                    <li>GIÀY-DÉP</li>
                    <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/shop/tui"
                    >
                        <li>TÚI-BALO</li>
                    </Link>
                    <li>MŨ-NÓN</li>
                    <li>ÁO-QUẦN</li>
                    <li>LOGO</li>
                    <li>TIN MLB</li>
                </ul>
            </div>
            <div className="header-page">
                <svg
                    style={{ marginTop: "5px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                >
                    <path
                        d="M7.66667 1C3.98477 1 1 3.98477 1 7.66667C1 11.3486 3.98477 14.3333 7.66667 14.3333C11.3486 14.3333 14.3333 11.3486 14.3333 7.66667C14.3333 5.63913 13.4282 3.823 12 2.60028"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    ></path>
                    <path
                        d="M17 17.0001L15.2222 15.2223L14.3333 14.3334L12.5555 12.5557"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    ></path>
                    <path
                        d="M11.6667 13.4448C12.9672 13.2884 13.3707 12.9054 13.4444 11.667"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    ></path>
                </svg>

                <div className="dropdown">
                    <button
                        style={{ background: "none", border: "none" }}
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                        >
                            <path
                                d="M11 4C11 5.65685 9.65685 7 8 7C6.34315 7 5 5.65685 5 4C5 2.34315 6.34315 1 8 1C8.36019 1 8.70555 1.06348 9.02551 1.17985"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            ></path>
                            <path
                                d="M1 17V13.5589C1 12.4819 1.61649 11.4972 2.62518 11.1197C3.98586 10.6105 6.28001 10 8 10C9.75626 10 11.7051 10.6365 13.2416 11.1518C14.3165 11.5123 15 12.5364 15 13.6702V17"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    </button>
                    {token &&
                        (token?.name ? (
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/login">
                                        {token?.name}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            return navigate("/login");
                                        }}
                                        to="/login"
                                    >
                                        Đăng Xuất
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/login">
                                        Đăng nhập
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/register"
                                    >
                                        Đăng ký
                                    </Link>
                                </li>
                            </ul>
                        ))}
                </div>

                <Link to="/cart">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="17"
                        viewBox="0 0 19 17"
                        fill="none"
                    >
                        <circle
                            cx="9"
                            cy="15.7368"
                            r="1.26316"
                            fill="white"
                        ></circle>
                        <circle
                            cx="14.0526"
                            cy="15.7368"
                            r="1.26316"
                            fill="white"
                        ></circle>
                        <path
                            d="M2.68421 6.05273L1.8421 6.05273"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        ></path>
                        <path
                            d="M3.52631 11.1055L2.6842 11.1055"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        ></path>
                        <path
                            d="M3.52632 8.5791L1 8.5791"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        ></path>
                        <path
                            d="M5.01003 3.94737L6.72226 11.6163C6.87534 12.3019 7.48373 12.7895 8.18622 12.7895H14.6659C15.3684 12.7895 15.9768 12.3019 16.1299 11.6163L17.4342 5.77422C17.6435 4.83706 16.9305 3.94737 15.9703 3.94737H14.6341H12.7895M5.01003 3.94737L4.50902 2.10616C4.33133 1.45315 3.73839 1 3.06164 1H1M5.01003 3.94737H8.21804H9.42105"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        ></path>
                    </svg>
                    <span>
                        {cart.reduce((pre, cur) => (pre += cur.clickNumber), 0)}
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default Header;

import React, { useState } from "react";
import "./login.css";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function Login() {
    const navigate = useNavigate();

    const [newUsers, setNewUser] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleCreat = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleCreateUser = (e) => {
        e.preventDefault();

        const errors = {};

        if (!newUsers.email) {
            errors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(newUsers.email)) {
            errors.email = "Email không hợp lệ";
        }

        if (!newUsers.password) {
            errors.password = "Mật khẩu không được để trống";
        } else if (newUsers.password.length < 6) {
            errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios
                .post(`http://localhost:3000/api/v1/auth/signin`, newUsers)
                .then((res) => {
                    if (res.data.result.status === 200) {
                        if (res.data.result.info.role === 1) {
                            navigate("/admin");
                            localStorage.setItem(
                                "tokenAdmin",
                                JSON.stringify(res.data.result.info)
                            );
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Đăng nhập thành công",
                                showConfirmButton: false,
                                timer: 2000,
                            }).then(() => {
                                navigate("/");
                            });
                            localStorage.setItem(
                                "token",
                                JSON.stringify(res.data.result.info)
                            );
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Đăng nhập thất bại...",
                            text: "Tài khoản hoặc mật khẩu không chính xác",
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <div>
            <Header />
            <div className="container-login">
                <h1>Đăng nhập tài khoản</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Trang chủ</li>
                        <li className="breadcrumb-item " aria-current="page">
                            Đăng nhập tài khoản
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="container-login1">
                <div className="login-form">
                    <div className="login-register">
                        <Link className="login-register1">
                            <p style={{ marginBottom: "0%" }}>Đăng nhập</p>
                        </Link>
                        <Link className="login-register1" to="/register">
                            <p style={{ marginBottom: "0%" }}>Đăng ký</p>
                        </Link>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                EMAIL*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Nhập Địa chỉ Email"
                                name="email"
                                onChange={handleCreat}
                            />
                            {formErrors.email && (
                                <span
                                    className="error-message"
                                    style={{ color: "red" }}
                                >
                                    {formErrors.email}
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                MẬT KHẨU*
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Nhập Mật khẩu"
                                name="password"
                                onChange={handleCreat}
                            />
                            {formErrors.password && (
                                <span
                                    className="error-message"
                                    style={{ color: "red" }}
                                >
                                    {formErrors.password}
                                </span>
                            )}
                        </div>
                        <p style={{ color: "#420500", fontSize: "14px" }}>
                            Quên mật khẩu?
                        </p>

                        <button
                            onClick={handleCreateUser}
                            type="submit"
                            className="btn btn-primary"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;

import React, { useState } from "react";
import "./register.css";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
    const navigate = useNavigate();
    const [newUsers, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        // role: 0,
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
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

        if (!newUsers.name) {
            errors.name = "Họ và tên không được để trống";
        }

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
            // Thực hiện gửi dữ liệu
            console.log(newUsers);
            axios
                .post(`http://localhost:3000/api/v1/auth/signup`, newUsers)
                .then((res) => {
                    console.log(res);
                    if (res.data.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Đăng ký tài khoản thành công",
                            showConfirmButton: true,
                        }).then(() => {
                            navigate("/login");
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Đăng kí thất bại",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Vui lòng nhập đầy đủ thông tin",
                    });
                });
        }
    };
    return (
        <div>
            <Header />
            <div className="container-register">
                <h1>Đăng ký tài khoản</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Trang chủ</li>
                        <li className="breadcrumb-item " aria-current="page">
                            Đăng ký tài khoản
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="container-register1">
                <div className="register-form">
                    <div className="login-register">
                        <Link className="login-register1" to="/login">
                            <p style={{ marginBottom: "0%" }}>Đăng nhập</p>
                        </Link>
                        <Link className="login-register1">
                            <p style={{ marginBottom: "0%" }}>Đăng ký</p>
                        </Link>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                HỌ VÀ TÊN*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Nhập Họ và tên"
                                name="name"
                                onChange={handleCreat}
                            />
                            {formErrors.name && (
                                <span
                                    className="error-message"
                                    style={{ color: "red" }}
                                >
                                    {formErrors.name}
                                </span>
                            )}
                        </div>
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
                                onChange={handleCreat}
                                name="password"
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

                        <button
                            onClick={handleCreateUser}
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Tạo tài khoản
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
function CheckoutPage() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [address, setAddress] = useState("");
    let cart = useSelector((state) => state.cart);
    let [provinces, setProvinces] = useState([]); // Tỉnh/Thành Phố
    let [activeProvince, setActiveProvince] = useState("");

    let [districts, setDistricts] = useState([]); // Quận/Huyện
    let [activeDistrict, setActiveDistrict] = useState("");

    let [wards, setWards] = useState([]); // Phường/Xã
    let [activeWard, setActiveWard] = useState("");

    let VIETNAM_BASE_API = "https://provinces.open-api.vn/api/?depth=3";
    let BASE_API = "http://localhost:3000/api/v1";
    const fetchProvinces = async () => {
        try {
            let res = await fetch(VIETNAM_BASE_API);
            let data = await res.json();
            setProvinces(() => [...data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    useEffect(() => {
        let clickProvince = provinces.find((e) => e.name == activeProvince);
        if (clickProvince) {
            setDistricts(() => [...clickProvince.districts]);
            setActiveWard("");
        }
    }, [activeProvince]);

    useEffect(() => {
        let clickDistrict = districts.find((e) => e.name == activeDistrict);
        if (clickDistrict) {
            setWards(() => [...clickDistrict.wards]);
        }
    }, [activeDistrict]);

    const handleActiveProvince = (e) => {
        if (!e.target.value) {
            resetAllProvinces();
        } else {
            setActiveProvince(e.target.value);
        }
    };

    const handleActiveDistrict = (e) => {
        if (!e.target.value) {
            resetAllProvinces();
        } else {
            setActiveDistrict(e.target.value);
        }
    };

    const handleActiveWard = (e) => {
        if (!e.target.value) {
            resetAllProvinces();
        } else {
            setActiveWard(e.target.value);
        }
    };

    function resetAllProvinces() {
        setActiveProvince("");
        setActiveDistrict("");
        setDistricts([]);
        setActiveWard("");
        setWards([]);
    }

    const handleCheckout = async (e) => {
        e.preventDefault();
        // Validate
        const isValidEmail = validator.isEmail(email);
        const isValidPhone = validator.isMobilePhone(phone, "vi-VN");

        if (!isValidEmail || !isValidPhone) {
            Swal.fire("Lỗi", "Email hoặc số điện thoại không hợp lệ", "error");
            return;
        }
        try {
            let order = {
                name,
                email,
                phone,
                address,
                province: activeProvince,
                district: activeDistrict,
                ward: activeWard,
                cart,
            };
            let res = await fetch(BASE_API + "/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
            let data = await res.json();
            Swal.fire("Thành Công", data.message, "success").then(() => {
                // localStorage.setItem("order",  )
                dispatch({ type: "CLEAR_CART" });
                navigate(`/checkout/step-2?id=${data.orderId}`);
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="col-7 pay-side">
            <Link to="/">
                <img
                    src="https://bizweb.dktcdn.net/100/446/974/themes/849897/assets/checkout_logo.png?1693214259155"
                    alt=""
                />
            </Link>
            <h5 className="sub-title">
                <b>Thông tin mua hàng</b>
            </h5>
            <form>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Email (tùy chọn)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                {/* <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div> */}

                <div className="address-container mb-3">
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleActiveProvince}
                        value={activeProvince}
                    >
                        <option selected value="">
                            Tỉnh/Thành
                        </option>
                        {provinces.length > 0 &&
                            provinces.map((e, i) => (
                                <option value={e.name}>{e.name}</option>
                            ))}
                    </select>

                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleActiveDistrict}
                        value={activeDistrict}
                    >
                        <option selected value="">
                            Quận/Huyện
                        </option>
                        {districts.length > 0 &&
                            districts.map((e, i) => (
                                <option value={e.name}>{e.name}</option>
                            ))}
                    </select>

                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleActiveWard}
                        value={activeWard}
                    >
                        <option selected value="">
                            Phường/Xã
                        </option>
                        {wards.length > 0 &&
                            wards.map((e, i) => (
                                <option value={e.name}>{e.name}</option>
                            ))}
                    </select>
                </div>
            </form>
            <div className="pay-Order3">
                <Link style={{ textDecoration: "none" }} to="/cart">
                    <p
                        style={{
                            color: "#0098b2",
                        }}
                    >
                        Quay về giỏ hàng
                    </p>
                </Link>
                <Link onClick={handleCheckout}>
                    <button>ĐẶT HÀNG</button>
                </Link>
            </div>
            <hr />
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "3%",
                    fontSize: "14px",
                    color: "#0098b2",
                }}
            >
                <p>Chính sách hoàn trả</p>
                <p>Chính sách bảo mật</p>
                <p>Điều khoản sử dụng</p>
            </div>
            <div style={{ marginTop: "3%", marginBottom: "5%" }}>
                <p>
                    <u style={{ color: "#2980b9" }}>MLB Việt Nam</u> hân hạnh
                    được phục vụ. Mời quý khách tham gia MLB-Crew để nhận các ưu
                    đãi độc quyền:
                    <span style={{ color: "#0098b2", marginLeft: "10px" }}>
                        zalo.me/g/eowlsx497
                    </span>
                </p>
            </div>
            <div style={{ textAlign: "end", fontSize: "15px" }}>
                <p>
                    GOLDEN MANSION Building. CEO : LE THANH BINH <br />
                    Business Registration : 150-41-60423/ E-Commerce Permit :
                    2021-29489 <br />
                    Personal Infor Manager : LE THANH NGHIEM
                </p>
            </div>
        </div>
    );
}

export default CheckoutPage;

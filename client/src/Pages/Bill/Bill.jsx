import React from "react";
import "./bill.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
function Bill() {
    let context = useOutletContext();
    console.log(context);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleContinue = (e) => {
        e.preventDefault();
        dispatch({ type: "CLEAR_CART" });
        localStorage.removeItem("cart");
        navigate("/");
    };
    return (
        <div
            className="col-7"
            style={{
                backgroundImage:
                    "url(https://bizweb.dktcdn.net/100/446/974/themes/849897/assets/checkout_body_background_image.jpg?1693214259155)",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "3%",
                    marginTop: "3%",
                }}
            >
                <Link to="/">
                    <img
                        src="https://bizweb.dktcdn.net/100/446/974/themes/849897/assets/checkout_logo.png?1695192501456"
                        alt=""
                    />
                </Link>
            </div>
            {/* <div style={{ padding: "0 13%" }} className=""> */}
            <div className="">
                <div className="thankyou-message-container">
                    <i
                        style={{ fontSize: "70px", color: "green" }}
                        className="fa-regular fa-circle-check"
                    ></i>
                    <div>
                        <h5>Cảm ơn bạn đã đặt hàng</h5>
                        <p>
                            Một email xác nhận đã được gửi tới {context.email}.
                            <br />
                            Xin vui lòng kiểm tra email của bạn
                        </p>
                        <p>
                            Cảm ơn Quý Khách đã ủng hộ MLB Việt Nam Để kiểm tra
                            tình trạng đơn hàng hãy truy cập:
                            https://mlb-vietnam.vn/kiem-tra-don-hang
                        </p>
                    </div>
                </div>
                <div className="section">
                    <div>
                        <h5>Thông tin mua hàng</h5>
                        <p>{context.orderName}</p>
                        <p>{context.email}</p>
                        <p>{context.phone}</p>

                        <h5z>Phương thức thanh toán</h5z>
                        <p>Thanh toán khi giao hàng (COD)</p>
                    </div>
                    <div>
                        <h5>Địa chỉ nhận hàng</h5>
                        <p>{context.orderName}</p>
                        {/* <p>triều khúc</p> */}
                        <p>
                            {context.ward}, {context.district},{" "}
                            {context.province}
                        </p>
                        <p>{context.phone}</p>
                        <h5>Phương thức vận chuyển</h5>
                        <p>Giao hàng tận nơi - COD tiêu chuẩn 1-2 ngày</p>
                    </div>
                </div>
                <div style={{ textAlign: "end" }}>
                    <Link onClick={handleContinue} to="/">
                        <button className="section-unprintable">
                            Tiếp tục mua hàng
                        </button>
                    </Link>
                </div>
            </div>

            <hr />
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "3%",
                    fontSize: "16px",
                    color: "#0098b2",
                }}
            >
                <p>Chính sách hoàn trả</p>
                <p>Chính sách bảo mật</p>
                <p>Điều khoản sử dụng</p>
            </div>
            <div
                style={{
                    marginTop: "1%",
                    marginBottom: "3%",
                    textAlign: "end ",
                }}
            >
                <p>
                    <u style={{ color: "#2980b9" }}>MLB Việt Nam</u> hân hạnh
                    được phục vụ. Mời quý khách tham gia MLB-Crew để nhận các ưu
                    đãi độc quyền:
                    <span style={{ color: "#0098b2", marginLeft: "10px" }}>
                        zalo.me/g/eowlsx497
                    </span>
                </p>
            </div>
            <div style={{ textAlign: "end", fontSize: "16px" }}>
                <p>
                    GOLDEN MANSION Building. CEO : LE THANH BINH <br />
                    Business Registration : 150-41-60423/ E-Commerce Permit :
                    2021-29489 <br />
                    Personal Infor Manager : LE THANH NGHIEM
                </p>
            </div>
            {/* </div> */}
        </div>
    );
}

export default Bill;

import React, { useEffect, useState } from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import "./detail.css";
import { Rate } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../../helpers";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Detail() {
    let [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    let { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    let dispatch = useDispatch();

    const fetchProduct = async () => {
        try {
            let response = await axios.get(
                `http://localhost:3000/api/v1/products/${id}`
            );
            let data = response.data;
            console.log(data);
            setProduct({ ...data });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleAddToCart = () => {
        let buyProduct = {
            ...product,
            clickNumber: quantity,
        };
        console.log(buyProduct);
        // Gửi 1 thông báo đến store là tao muốn add sản phẩm
        // này vào cart

        // Thông báo này phải đính kèm với dữ liệu cần phải chỉnh sửa
        // trong store

        dispatch({ type: "ADD_TO_CART", payload: buyProduct });
        setQuantity(() => 1);
        Swal.fire(
            "Thành Công",
            "Sản phẩm đã được thêm vào giỏ hàng!",
            "success"
        );
    };

    // Hàm tăng số lượng
    // const incrementQuantity = () => {
    //     setQuantity(quantity + 1);
    // };

    // // Hàm giảm số lượng
    // const decrementQuantity = () => {
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //     }
    // };

    useEffect(() => {
        fetchProduct();
    }, []);
    return (
        <div>
            <Header />
            <div>
                <div className="container-detail">
                    <h1>{product.name}</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Trang chủ</li>

                            <li
                                className="breadcrumb-item "
                                aria-current="page"
                            >
                                {product.name}
                            </li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <div
                        style={{ padding: "0 15%", marginTop: "3%" }}
                        className="row"
                    >
                        <div className="col-7 detail">
                            <div className="detail-image">
                                {product.sources &&
                                    product.sources.map((source, index) => (
                                        <img
                                            key={index}
                                            src={source.url}
                                            alt={`Product ${index + 1}`}
                                            onMouseEnter={() =>
                                                setSelectedImage(source.url)
                                            }
                                        />
                                    ))}
                            </div>
                            <img
                                className="detail1"
                                src={
                                    selectedImage ||
                                    (product.sources &&
                                        product.sources[0] &&
                                        product.sources[0].url)
                                }
                                alt=""
                            />
                        </div>
                        <div className="col-5 detail-pro">
                            <h1>{product.name}</h1>
                            <div style={{ marginBottom: "10px" }}>
                                <span>
                                    <Rate disabled defaultValue={5} />
                                </span>
                                <span> Đánh giá sản phẩm này</span>
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <span>
                                    Thương hiệu: <b>MLB Korea</b>
                                </span>
                                <span style={{ marginLeft: "20px" }}>
                                    Mã: <b>3ACRS033N-43IVS</b>
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5%",
                                }}
                            >
                                <h2>
                                    {product.sale &&
                                        formatCurrency(
                                            product.price -
                                                (product.price * product.sale) /
                                                    100
                                        )}
                                </h2>
                                <h4
                                    style={{
                                        textDecoration: "line-through",
                                        color: "#949494",
                                    }}
                                >
                                    {product?.price &&
                                        formatCurrency(product?.price)}
                                </h4>
                            </div>
                            <div className="quantity-container">
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-button"
                                        value="-"
                                        onClick={() => {
                                            if (quantity > 1)
                                                setQuantity(quantity - 1);
                                        }}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="quantity-input"
                                        value={quantity}
                                        min="1"
                                        readOnly
                                    />
                                    <button
                                        className="quantity-button"
                                        value="+"
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="detail-add"
                                >
                                    Thêm vào giỏ
                                </button>
                                <button className="detail-buy">Mua ngay</button>
                            </div>

                            <div className="size-guide-box">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="19"
                                    viewBox="0 0 18 19"
                                    fill="none"
                                >
                                    <path
                                        d="M17 6V15.14C17 16.7969 15.6569 18.14 14 18.14H4C2.34315 18.14 1 16.7969 1 15.14V13.855V11.7125M12.2305 1H4C2.34315 1 1 2.34314 1 4V5.285V7.4275"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    ></path>
                                    <path
                                        d="M12.5595 1.09666L16.9033 5.44046C17.1098 5.64694 16.9636 6 16.6716 6H12.3278C12.1467 6 12 5.85325 12 5.67223V1.32843C12 1.03642 12.3531 0.890174 12.5595 1.09666Z"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                    ></path>
                                    <line
                                        x1="6.75"
                                        y1="13.25"
                                        x2="11.25"
                                        y2="13.25"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    ></line>
                                    <line
                                        x1="5.75"
                                        y1="10.25"
                                        x2="12.25"
                                        y2="10.25"
                                        stroke="#292D32"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    ></line>
                                </svg>
                                <span>Xem hướng dẫn chọn size</span>
                            </div>
                            <div className="table-container">
                                <table
                                    style={{ border: "2px solid black" }}
                                    className="custom-table"
                                >
                                    <tbody>
                                        <tr>
                                            <td className="label">Xuất Xứ:</td>
                                            <td>MLB-Korea.</td>
                                        </tr>
                                        <tr>
                                            <td className="label">SKU:</td>
                                            <td>3ACRS033N-43IVS.</td>
                                        </tr>
                                        <tr>
                                            <td className="label">
                                                Kích Thước:
                                            </td>
                                            <td>Free Size.</td>
                                        </tr>
                                        <tr>
                                            <td className="label">
                                                Chất Liệu:
                                            </td>
                                            <td>100% Polyester.</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Made In:</td>
                                            <td>China.</td>
                                        </tr>
                                        <tr>
                                            <td className="label">Ra Mắt:</td>
                                            <td>2023.01.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="block-title">
                            <h1>Cùng Bộ Sưu Tập MLB</h1>
                            <b>
                                Những Sản Phẩm Cùng Bộ Sưu Tập Tại MLB Việt Nam
                                Có Thể Bạn Sẽ Thích
                            </b>
                            <div className="block-title1">
                                <div
                                    className="card"
                                    style={{
                                        width: "17rem",
                                        textAlign: "center",
                                        borderRadius: "0",
                                        borderColor: "#dbdbdb",
                                    }}
                                >
                                    <img
                                        src="https://bizweb.dktcdn.net/100/446/974/products/tui-mlb-monotive-cross-bag-new-york-yankees-black-7acrmt13n-50bks-1.jpg?v=1692236452670"
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <p className="card-text1">MLB KOREA</p>
                                        <p className="card-text2">
                                            Túi MLB Korea [KIDS] Monotive
                                        </p>
                                        <p className="card-price">2.990.000₫</p>
                                    </div>
                                </div>

                                <div
                                    className="card"
                                    style={{
                                        width: "17rem",
                                        textAlign: "center",
                                        borderRadius: "0",
                                        borderColor: "#dbdbdb",
                                    }}
                                >
                                    <img
                                        src="https://bizweb.dktcdn.net/100/446/974/products/tui-mlb-monotive-cross-bag-boston-red-sox-brown-c7acrmt13n-43brd-1.jpg?v=1692235329550"
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <p className="card-text1">MLB KOREA</p>
                                        <p className="card-text2">
                                            Túi MLB Korea [KIDS] Monotive
                                        </p>
                                        <p className="card-price">2.990.000₫</p>
                                    </div>
                                </div>

                                <div
                                    className="card"
                                    style={{
                                        width: "17rem",
                                        textAlign: "center",
                                        borderRadius: "0",
                                        borderColor: "#dbdbdb",
                                    }}
                                >
                                    <img
                                        src="https://bizweb.dktcdn.net/100/446/974/products/tui-mlb-monogram-jacquard-hobo-bag-boson-red-sox-brown-3abql023n-43brs-1.jpg?v=1691831532897"
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <p className="card-text1">MLB KOREA</p>
                                        <p className="card-text2">
                                            Túi MLB Korea Monogram
                                        </p>
                                        <p className="card-price">3.890.000₫</p>
                                    </div>
                                </div>

                                <div
                                    className="card"
                                    style={{
                                        width: "17rem",
                                        textAlign: "center",
                                        borderRadius: "0",
                                        borderColor: "#dbdbdb",
                                    }}
                                >
                                    <img
                                        src="https://bizweb.dktcdn.net/100/446/974/products/tui-mlb-monogram-jacquard-hobo-bag-la-dodgers-d-navy-3abql023n-07nyd-1.jpg?v=1691830288650"
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <p className="card-text1">MLB KOREA</p>
                                        <p className="card-text2">
                                            Túi MLB Korea Monogram
                                        </p>
                                        <p className="card-price">3.890.000₫</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Detail;

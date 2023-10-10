import React, { useEffect, useState } from "react";
import "./shop.css";
import { formatCurrency } from "../../helpers";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { Link } from "react-router-dom";

function ShopBalo() {
    let [productsBalo, setProductsBalo] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const fetchProducts = async () => {
        let responseBalo = await fetch(
            `http://localhost:3000/api/v1/products?category=balo-mlb`
        );

        let dataBalo = await responseBalo.json();
        setProductsBalo((prev) => [...prev, ...dataBalo.data]);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        sortProducts();
    }, [sortBy]);

    const sortProducts = () => {
        let sortedProducts = [...productsBalo];

        switch (sortBy) {
            case "name-asc":
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "price-asc":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setProductsBalo(sortedProducts);
    };
    return (
        <div>
            <Header />
            <div className="container-shop">
                <h1>MLB Vietnam | Balo MLB Chính Hãng Mới Nhất</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Trang chủ</li>
                        <li className="breadcrumb-item " aria-current="page">
                            Balo MLB
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="row">
                <div style={{ padding: "2% 2%" }} className="col-3">
                    <div className="form-check1">
                        <h4>Sắp xếp</h4>
                        <>
                            <div className="form-check">
                                <input
                                    // className="form-check-input"
                                    // type="checkbox"
                                    // defaultValue=""
                                    // id="flexCheckDefault"
                                    // defaultChecked

                                    type="radio"
                                    name="sort"
                                    id="default"
                                    value="default"
                                    checked={sortBy === "default"}
                                    onChange={() => setSortBy("default")}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Mặc định
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="sort"
                                    id="name-asc"
                                    value="name-asc"
                                    checked={sortBy === "name-asc"}
                                    onChange={() => setSortBy("name-asc")}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckChecked"
                                >
                                    Tên A-Z
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="sort"
                                    id="name-desc"
                                    value="name-desc"
                                    checked={sortBy === "name-desc"}
                                    onChange={() => setSortBy("name-desc")}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Tên Z-A
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="sort"
                                    id="price-asc"
                                    value="price-asc"
                                    checked={sortBy === "price-asc"}
                                    onChange={() => setSortBy("price-asc")}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckChecked"
                                >
                                    Giá thấp đến cao
                                </label>
                            </div>
                            <div
                                style={{ marginBottom: "10%" }}
                                className="form-check"
                            >
                                <input
                                    type="radio"
                                    name="sort"
                                    id="price-desc"
                                    value="price-desc"
                                    checked={sortBy === "price-desc"}
                                    onChange={() => setSortBy("price-desc")}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckChecked"
                                >
                                    Giá cao xuống thấp
                                </label>
                            </div>
                        </>
                        <h4>Loại SP</h4>
                        <div className="form-check">
                            <input type="radio" name="sort" id="price-desc" />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                Balo MLB
                            </label>
                        </div>
                        <div
                            style={{ marginBottom: "10%" }}
                            className="form-check"
                        >
                            <input type="radio" name="sort" id="price-desc" />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                Túi MLB
                            </label>
                        </div>
                        <h4>Màu sắc</h4>
                        <div className="bang-mau1">
                            <p
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    color: "#FFFFFF",
                                    border: "1px solid #ebebeb",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{ backgroundColor: "#000000" }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#C0C0C0",
                                    color: "#C0C0C0",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#CC9966",
                                    color: "#CC9966",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#3399FF",
                                    color: "#3399FF",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#99FF66",
                                    color: "#99FF66",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#FF66CC",
                                    color: "#FF66CC",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#FF9999",
                                    color: "#FF9999",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#990000",
                                    color: "#990000",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#FFCC33",
                                    color: "#FFCC33",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                            <p
                                style={{
                                    backgroundColor: "#FFFF33",
                                    color: "#FFFF33",
                                }}
                                className="bang-mau"
                            >
                                1
                            </p>
                        </div>
                        <h4 style={{ marginTop: "9%" }}>Logo</h4>
                        <div className="form-check">
                            <input type="radio" name="sort" id="price-desc" />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                New York Yankees (NY)
                            </label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="sort" id="price-desc" />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                Boston Red Sox (B)
                            </label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="sort" id="price-desc" />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                Los Angeles Dodgers (LA)
                            </label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="sort" id="price-desc" />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                Philadelphia Phillies (P)
                            </label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="sort" id="price-desc" />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                            >
                                San Francisco Giants (SF)
                            </label>
                        </div>
                    </div>
                </div>
                <div style={{ padding: "2% 0" }} className="col-9">
                    <div className="form-check2">
                        {productsBalo.map((e, i) => (
                            <Link
                                style={{ textDecoration: "none" }}
                                to={`/detail/${e.product_id}`}
                            >
                                <div
                                    className="card"
                                    style={{
                                        width: "23.8rem",
                                        textAlign: "center",
                                        borderRadius: "0",
                                        borderColor: "#dbdbdb",
                                    }}
                                    key={i}
                                >
                                    <img
                                        src={
                                            e.media_source?.length > 0 &&
                                            e.media_source
                                        }
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    {e.sale && (
                                        <p className="giam-gia">- {e.sale}%</p>
                                    )}
                                    <div
                                        style={{ height: "110px" }}
                                        className="card-body"
                                    >
                                        <p className="card-text1">MLB KOREA</p>
                                        <p className="card-text2">{e.name}</p>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "5%",
                                            }}
                                        >
                                            <span className="card-price">
                                                {formatCurrency(
                                                    e.sale
                                                        ? e.price -
                                                              e.price *
                                                                  (e.sale / 100)
                                                        : e.price
                                                )}
                                            </span>
                                            <span className="card-price1">
                                                {formatCurrency(e.price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShopBalo;

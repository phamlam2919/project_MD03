import React, { useEffect, useState } from "react";
import "./shoes.css";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../helpers";
function NewShoes() {
    let [productsShoes, setProductsShoes] = useState([]);
    const fetchProducts = async () => {
        let responseShoes = await fetch(
            `http://localhost:3000/api/v1/products?category=shoes-mlb`
        );

        let dataShoes = await responseShoes.json();
        setProductsShoes((prev) => [...prev, ...dataShoes.data]);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div>
            <div className="homepage-SHOES">
                <h2>NEW SHOES</h2>
                <p>
                    Những phiên bản <u>Giày MLB</u> mới nhất tại Việt Nam
                </p>
            </div>
            <div className="homepage-NEWSHOES">
                {productsShoes.slice(0, 8).map((e, i) => (
                    <Link
                        style={{ textDecoration: "none" }}
                        to={`/detail/${e.product_id}`}
                    >
                        <div
                            className="card"
                            style={{
                                width: "23rem",
                                textAlign: "center",
                                borderRadius: "0",
                                borderColor: "#dbdbdb",
                            }}
                            key={i}
                        >
                            <img
                                src={
                                    e.media_source?.length > 0 && e.media_source
                                }
                                className="card-img-top"
                                alt="..."
                            />
                            {e.sale && <p className="giam-gia">- {e.sale}%</p>}
                            <div
                                style={{ height: "109px" }}
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
                                                      e.price * (e.sale / 100)
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
            <div className="shoesAll">
                <button>Xem tất cả</button>
            </div>
        </div>
    );
}

export default NewShoes;

import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../helpers";
import "./bag.css";
import { Link } from "react-router-dom";
function NewBag() {
    let [productsBag, setProductsBag] = useState([]);
    const fetchProducts = async () => {
        let responseBag = await fetch(
            `http://localhost:3000/api/v1/products?category=tui-mlb`
        );

        let dataBag = await responseBag.json();
        setProductsBag((prev) => [...prev, ...dataBag.data]);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="BAG">
            <div className="homepage-BAG">
                <h2>{productsBag.length > 0 && productsBag[0].description}</h2>
                <p>
                    Những Bộ Sưu Tập <u>Túi MLB</u> Hot Nhất
                </p>
            </div>
            <div className="homepage-NEWBAG">
                {productsBag.slice(0, 8).map((e, i) => (
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
                            <div  className="card-body">
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
            <div className="BAGAll">
                <Link to="/shop/tui">
                    <button>Xem tất cả</button>
                </Link>
            </div>
        </div>
    );
}

export default NewBag;

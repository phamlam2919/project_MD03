import React, { useEffect, useState } from "react";
import "./balo.css";
import { formatCurrency } from "../../helpers";
import { Link } from "react-router-dom";
function NewBalo() {
    let [productsBalo, setProductsBalo] = useState([]);

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
    return (
        <div>
            <div className="homepage-SHOES">
                <h2>
                    {productsBalo.length > 0 && productsBalo[0].description}
                </h2>
                <p>
                    Balo Mới nhất tại <u>MLB Việt Nam</u>
                </p>
            </div>
            <div className="homepage-NEWSHOES">
                {productsBalo.slice(0, 8).map((e, i) => (
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
                            <div style={{height:"110px"}} className="card-body">
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
                <Link to="/shop/balo">
                    <button>Xem tất cả</button>
                </Link>
            </div>
        </div>
    );
}

export default NewBalo;

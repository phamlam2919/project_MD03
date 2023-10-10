import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../helpers";
// import Swal from "sweetalert2";
import "./pay.css";
const Pay = () => {
    const [order, setOrder] = useState({});
    const [searchParams] = useSearchParams();

    const cart = useSelector((state) => state.cart);
    let queryString = searchParams.get("id");
    let BASE_API = "http://localhost:3000/api/v1";
    const dispatch = useDispatch();

    const fetchOrder = async () => {
        try {
            let res = await fetch(BASE_API + `/orders/${queryString}`);
            let data = await res.json();
            let fetchOrder = {
                orderId: data.row[0].order_id,
                orderName: data.row[0].order_name,
                phone: data.row[0].phone,
                email: data.row[0].email,
                ward: data.row[0].ward,
                district: data.row[0].district,
                province: data.row[0].province,
                products: [],
            };
            console.log("data ==========>", data);
            data.row.forEach((element) => {
                fetchOrder.products.push({
                    productId: element.product_id,
                    name: element.name,
                    clickNumber: element.number,
                    stock: element.stock,
                    price: element.price,
                    sale: element.sale,
                });
                setOrder({ ...fetchOrder });
                dispatch({
                    type: "ORDER_TO_CART",
                    payload: fetchOrder.products,
                });
            });
        } catch (error) {
            console.log(error);
        }
    };
    console.log("cart", cart);
    useEffect(() => {
        if (queryString) {
            fetchOrder();
        }
    }, [queryString]);
    return (
        <div
            style={{
                backgroundImage:
                    "url(https://bizweb.dktcdn.net/100/446/974/themes/849897/assets/checkout_body_background_image.jpg?1693214259155)",
            }}
        >
            <div className="row pay-container">
                <Outlet context={order} />
                <div className="col-5 pay-side2">
                    <h2>Đơn hàng</h2>
                    {cart.length > 0 &&
                        cart.map((e, i) => (
                            <div key={i} className="pay-Order">
                                <img
                                    src={e.sources && e.sources[0].url}
                                    alt=""
                                />
                                <span>{e.clickNumber}</span>
                                <p>{e.name}</p>
                                <p>
                                    {formatCurrency(
                                        e.price - (e.price * e.sale) / 100
                                    )}
                                </p>
                            </div>
                        ))}

                    {/* <div className="pay-Order2">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Nhập mã giảm giá"
                        />
                        <button>Áp dụng</button>
                    </div> */}

                    <div style={{ marginTop: "5%" }}>
                        <div className="pay-Order3">
                            <p>Tạm tính</p>
                            <p>
                                {cart.length > 0 &&
                                    formatCurrency(
                                        cart.reduce((pre, cur) => {
                                            return (pre +=
                                                cur.price *
                                                (1 - cur.sale / 100) *
                                                cur.clickNumber);
                                        }, 0)
                                    )}
                            </p>
                        </div>
                        <div className="pay-Order3">
                            <p>Phí vận chuyển</p>
                            <p>Miễn phí</p>
                        </div>
                        <div className="pay-Order3">
                            <p>Tổng cộng</p>
                            <h4 style={{ color: "#0098b2" }}>
                                {cart &&
                                    formatCurrency(
                                        cart.reduce((pre, cur) => {
                                            return (pre +=
                                                cur.price *
                                                (1 - cur.sale / 100) *
                                                cur.clickNumber);
                                        }, 0)
                                    )}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pay;

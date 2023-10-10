import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../helpers";
import "./cart.css";
function CartItem({ detail }) {
    console.log(detail);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        setQuantity(() => detail.clickNumber);
    }, []);

    const handleIncrease = (id) => {
        setQuantity(quantity + 1);
        dispatch({ type: "INCREASE_CART_PRODUCT", payload: id });
    };

    const handleDown = (id) => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch({
                type: "DESCREASE_CART_PRODUCT",
                payload: id,
            });
        }
    };

    const deleteCart = (id) => {
        const cartItems = JSON.parse(localStorage.getItem("cart"));

        const itemIndex = cartItems.findIndex((item) => item.product_id === id);

        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }

        dispatch({
            type: "DELETE_CART",
            payload: cartItems,
        });
    };
    return (
        <>
            <tr>
                <td className="product-details">
                    <div>
                        <img src={detail.sources[0].url} alt="" />
                    </div>
                    <div>
                        <span className="product-name">{detail.name}</span>
                        <br />
                        <span
                            onClick={() => deleteCart(detail.product_id)}
                            className="delete-button"
                        >
                            Xóa
                        </span>
                    </div>
                </td>
                <td style={{ textAlign: "center" }} className="product-price">
                    {formatCurrency(
                        detail.price - (detail.price * detail.sale) / 100
                    )}
                </td>
                <td
                    style={{ textAlign: "center" }}
                    className="product-quantity"
                >
                    <div className="quantity-controls">
                        <button
                            className="quantity-button"
                            value="-"
                            onClick={() => handleDown(detail.product_id)}
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
                            onClick={() => handleIncrease(detail.product_id)}
                        >
                            +
                        </button>
                    </div>
                </td>
                <td style={{ textAlign: "center" }} className="product-total">
                    {formatCurrency(
                        detail.price * (1 - detail.sale / 100) * quantity
                    )}
                </td>
            </tr>
        </>
    );
}

export default CartItem;

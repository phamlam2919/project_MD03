import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatCurrency } from "../../helpers";
import Swal from "sweetalert2";
// import Modal from "../../shared/admin/Modal";
function ProductDetail() {
    const [product, setProduct] = useState({});
    const [productId, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [sale, setSale] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [categories, setCategories] = useState("");

    const [count, setCount] = useState(0);
    let BASE_API = "http://localhost:3000/api/v1";
    const fetchProduct = async () => {
        try {
            let res = await fetch(BASE_API + `/products/${id}`);
            let data = await res.json();
            console.log(data);
            setProduct({ ...data });
            setId(data.product_id);
            setName(data.name);
            setPrice(data.price);
            setSale(data.sale);
            setStock(data.number);
            setCategory(data.category_id);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        try {
            let res = await fetch(BASE_API + `/categories`);
            let data = await res.json();
            setCategories(() => [...data]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let update = {
                id: productId,
                name,
                price,
                sale,
                stock,
                category_id: category,
            };
            let res = await fetch(BASE_API + `/products/` + productId, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(update),
            });
            let data = await res.json();
            Swal.fire(data.status, data.message, "success").then(() => {
                setCount(0);
                setIsEdit(false);
            });
            console.log(data);
        } catch (error) {}
    };
    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (count > 0) {
            setIsEdit(true);
        }
    }, [name, price, sale, stock, category]);
    return (
        <div>
            <div className="col py-3">
                <h3> Edit Product</h3>

                <div className="container mb-3">
                    {/* <div className="row">
                        <h5>Overview</h5>
                    </div> */}
                </div>
                <div style={{ width: "50%" }}>
                    <form
                        style={{ width: "150%" }}
                        className="row"
                        onSubmit={handleSubmit}
                    >
                        <div className="col-7">
                            <div className="mb-3">
                                <label className="form-label">
                                    Product ID:
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    value={productId}
                                    onChange={(e) => {
                                        setId(e.target.value);
                                        setCount((prev) => (prev = prev + 1));
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setCount((prev) => (prev = prev + 1));
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        setCount((prev) => (prev = prev + 1));
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Stock:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => {
                                        setStock(e.target.value);
                                        setCount((prev) => (prev = prev + 1));
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sale:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={sale}
                                    onChange={(e) => {
                                        setSale(e.target.value);
                                        setCount((prev) => (prev = prev + 1));
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category:</label>
                                <select
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setCount((prev) => (prev = prev + 1));
                                    }}
                                    className="form-select"
                                    aria-label="Default select example"
                                >
                                    <option value="">Filter By Category</option>
                                    {categories.length > 0 &&
                                        categories.map((e, i) => (
                                            <option
                                                selected={
                                                    category === e.category_id
                                                }
                                                key={i}
                                                value={e.category_id}
                                            >
                                                {e.description}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-5">
                            <h1>img</h1>
                        </div>
                        {/* <div>
                            <label className="form-label">Image :</label>
                            {product.sources ? (
                                <div
                                    className="admin-image-container"
                                    style={{
                                        backgroundImage: `url(${product.sources[0].url})`,
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    +{product.sources.length - 1}
                                </div>
                            ) : (
                                <div className="admin-image-container">
                                    No Image
                                </div>
                            )}
                        </div> */}
                        {!isEdit ? (
                            <button
                                style={{ width: "15%" }}
                                disabled
                                type="submit"
                                className="btn btn-primary me-3"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                style={{ width: "15%" }}
                                type="submit"
                                className="btn btn-primary me-3"
                            >
                                Save
                            </button>
                        )}

                        <button
                            style={{ width: "105px", height: "44px" }}
                            className="btn btn-danger"
                        >
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                                to="/admin/products"
                            >
                                Cancel
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
            {/* <Modal
                productId={id}
                sources={product.sources ? product.sources : []}
            /> */}
        </div>
    );
}

export default ProductDetail;

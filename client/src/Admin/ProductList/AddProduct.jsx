import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function AddProduct() {
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState({
        name: "",
        number: "",
        price: "",
        sale: "",
        category_id: "",
    });
    const [imageData, setImageData] = useState({
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
    });

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/categories"
            );
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const listProduct = () => {
        axios
            .get(`http://localhost:3000/api/v1/products`)
            .then((res) => {
                setProduct(res.data.product);
            })
            .catch((err) => console.log(err));
    };

    const handleCreate = (e) => {
        const { name, value } = e.target;

        if (name === "category_id") {
            setProductData((input) => ({
                ...input,
                [name]: value,
            }));
        } else {
            setProductData((input) => ({
                ...input,
                [name]: value,
            }));
        }
    };

    const handleImageInputChange = (e) => {
        const { name, value } = e.target;
        setImageData({
            ...imageData,
            [name]: value,
        });
    };
    const handleAddProduct = () => {
        axios
            .post("http://localhost:3000/api/v1/products", productData)
            .then(() => {
                axios
                    .get("http://localhost:3000/api/v1/products")
                    .then((response) => {
                        let maxProductId = 0;
                        response.data.forEach((product) => {
                            if (product.product_id > maxProductId) {
                                maxProductId = product.product_id;
                            }
                        });

                        localStorage.setItem("productId", maxProductId);

                        setProductData({
                            name: "",
                            intro: "",
                            number: "",
                            price: "",
                            sale: "",
                            category_id: "",
                        });
                    })
                    .catch((error) => {
                        console.error("Error getting latest product:", error);
                    });
            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });
    };

    const handleSaveChanges = () => {
        const productId = localStorage.getItem("productId");

        const imageSources = [];
        for (let i = 1; i <= 5; i++) {
            const sourceKey = `img${i}`;
            const sourceValue = imageData[sourceKey];

            if (sourceValue) {
                const imageObject = {
                    product_id: productId,
                    source: sourceValue,
                };

                axios
                    .post("http://localhost:3000/api/v1/media", imageObject)
                    .then((response) => {
                        console.log(`Image ${i} uploaded successfully`);
                    })
                    .catch((error) => {
                        console.error(`Error uploading image ${i}:`, error);
                    });

                imageSources.push(imageObject);
            }
        }
        Swal.fire("Thành Công", "Sản phẩm đã được thêm mới", "success").then(
            () => {
                navigate("/admin/products");
            }
        );
        setImageData({ img1: "", img2: "", img3: "", img4: "", img5: "" });
        // navigate("/admin/products");
    };

    useEffect(() => {
        listProduct();
        fetchCategories();
    }, []);

    return (
        <div>
            <h3>Add Product</h3>
            <div>
                <div
                    style={{ display: "flex", gap: "3%", marginTop: "3%" }}
                    className="them"
                >
                    <div style={{ width: "30%" }} className="">
                        <span>Name: </span>
                        <br />
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={handleCreate}
                        />
                        <br />
                        <span>Number:</span>
                        <br />
                        <input
                            type="text"
                            name="number"
                            className="form-control"
                            onChange={handleCreate}
                        />
                        <br />
                        <span>Price:</span>
                        <br />
                        <input
                            type="text"
                            name="price"
                            className="form-control"
                            onChange={handleCreate}
                        />
                        <br />
                        <span>Sale: </span> <br />
                        <input
                            type="text"
                            name="sale"
                            className="form-control"
                            onChange={handleCreate}
                        />
                        <br />
                        <div className="mb-3">
                            <label className="form-label">Category:</label>
                            <select
                                name="category_id"
                                onChange={handleCreate}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option value="">Filter By Category</option>
                                {categories.length > 0 &&
                                    categories.map((e, i) => (
                                        <option key={i} value={e.category_id}>
                                            {e.description}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <br />
                </div>
                <button
                    style={{ marginRight: "20px", width: "8%" }}
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={handleAddProduct}
                >
                    Add Photo
                </button>
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
                {/* modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Image
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-mdb-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div style={{ width: "100%" }} className="">
                                    <span>Image1 :</span> <br />
                                    <input
                                        type="text"
                                        name="img1"
                                        className="form-control"
                                        onChange={handleImageInputChange}
                                    />
                                    <br />
                                    <span>Image2:</span> <br />
                                    <input
                                        type="text"
                                        name="img2"
                                        className="form-control"
                                        onChange={handleImageInputChange}
                                    />
                                    <br />
                                    <span>Image3:</span> <br />
                                    <input
                                        type="text"
                                        name="img3"
                                        className="form-control"
                                        onChange={handleImageInputChange}
                                    />
                                    <br />
                                    <span>Image4:</span> <br />
                                    <input
                                        type="text"
                                        name="img4"
                                        className="form-control"
                                        onChange={handleImageInputChange}
                                    />
                                    <br />
                                    <span>Image5:</span> <br />
                                    <input
                                        type="text"
                                        name="img5"
                                        className="form-control"
                                        onChange={handleImageInputChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    style={{ width: "30%", height: "42px" }}
                                    onClick={handleSaveChanges}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;

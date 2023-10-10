import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../helpers";
// import Pagination from "../../shared/admin/Pagination";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../shared/admin/Pagination";

function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");

    const BASE_API = "http://localhost:3000/api/v1";

    const fetchProducts = async () => {
        try {
            let res = await fetch(
                BASE_API + "/products?page_index=1&page_number=5"
            );
            let data = await res.json();
            setProducts(() => [...data.data]);
            setTotal(data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        try {
            let res = await fetch(BASE_API + "/categories");
            let data = await res.json();
            setCategories(() => [...data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleChangePage = async (pageIndex) => {
        try {
            let res = await fetch(
                BASE_API +
                    `/products?${
                        categoryFilter ? `category=${categoryFilter}&` : ""
                    }page_index=${pageIndex}&page_number=5`
            );
            let data = await res.json();
            setProducts(() => [...data.data]);
            setCurrentPage(pageIndex);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilterByCategory = (e) => {
        setCategoryFilter(e.target.value);
    };

    const fecthProductByCategory = async (filter) => {
        try {
            if (filter) {
                let res = await fetch(
                    BASE_API +
                        `/products?category=${filter}&page_index=1&page_number=5`
                );
                let data = await res.json();
                setProducts(() => [...data.data]);
                setTotal(data.length);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setCurrentPage(1);
        if (categoryFilter) {
            fecthProductByCategory(categoryFilter);
        } else {
            fetchProducts();
        }
    }, [categoryFilter]);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/api/v1/products/${id}`)
            .then((res) => {
                setProducts((prevUsers) =>
                    prevUsers.filter((product) => product.product_id !== id)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEdit = (id) => {
        navigate("/admin/products/edit/" + id);
        // console.log(id);
    };

    return (
        <div>
            <div className="col py-3">
                <h3>Product List</h3>
                <div className="container mb-3">
                    <div className="row">
                        <h5>Action</h5>
                    </div>
                    <div className="row">
                        <div
                            style={{
                                display: "flex",

                                width: "50%",
                            }}
                            className="col-3"
                        >
                            <select
                                style={{ height: "45px", width: "50%" }}
                                onChange={handleFilterByCategory}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option value="">Filter By Category</option>
                                {categories.length > 0 &&
                                    categories.map((e, i) => (
                                        <option key={i} value={e.name}>
                                            {e.description}
                                        </option>
                                    ))}
                            </select>

                            <button
                                style={{
                                    width: "160px",
                                    height: "45px",
                                    marginLeft: "5%",
                                    backgroundColor: "red",
                                    border: "none",
                                }}
                            >
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                    to="/admin/products/addproduct"
                                >
                                    Add Product
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{ overflowX: "auto", textAlign: "center" }}>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Sale</th>
                                <th scope="col">Category</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {products.length > 0 &&
                                products.map((e, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{e.product_id}</td>
                                        <td>{e.name}</td>
                                        <td>{formatCurrency(e.price)}</td>
                                        <td>{e.number}</td>
                                        <td>{e.sale}%</td>
                                        <td>{e.description}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleEdit(e.product_id)
                                                }
                                                type="button"
                                                className="btn btn-success"
                                            >
                                                <i className="fa-solid fa-wrench"></i>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(e.product_id)
                                                }
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                                type="button"
                                                className="btn btn-danger"
                                            >
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    total={total}
                    pageNumber={5}
                    handleChangePage={handleChangePage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

export default ProductList;

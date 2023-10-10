import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div
            style={{ backgroundColor: "#e9e9e9" }}
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
        >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a
                    href="/"
                    className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    <span
                        style={{ color: "black" }}
                        className="fs-5 d-none d-sm-inline"
                    >
                        Menu
                    </span>
                </a>
                <ul
                    className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu"
                >
                    <li>
                        <Link
                            to="/admin/user"
                            className="nav-link px-0 align-middle"
                        >
                            <i className="fs-4 bi-people" />
                            <span className="ms-1 d-none d-sm-inline">
                                Users
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/products"
                            className="nav-link px-0 align-middle"
                        >
                            <i className="fs-4 bi-grid" />
                            <span className="ms-1 d-none d-sm-inline">
                                Products
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link to="" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table" />
                            <span className="ms-1 d-none d-sm-inline">
                                Orders
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to=""
                            // data-bs-toggle="collapse"
                            className="nav-link px-0 align-middle"
                        >
                            <i className="fs-4 bi-speedometer2" />
                            <span className="ms-1 d-none d-sm-inline">
                                Dashboard
                            </span>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown pb-4">
                    <a
                        href="#"
                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {/* <img
                            src="https://github.com/mdo.png"
                            alt="hugenerd"
                            width={30}
                            height={30}
                            className="rounded-circle"
                        /> */}
                        <i
                            style={{ color: "black", fontSize: "20px" }}
                            className="fa-solid fa-user"
                        ></i>
                        <span
                            style={{ color: "black" }}
                            className="d-none d-sm-inline mx-1"
                        >
                            Admin
                        </span>
                    </a>
                    <ul
                        className="dropdown-menu dropdown-menu-dark text-small shadow"
                        aria-labelledby="dropdownUser1"
                    >
                        <li>
                            <a className="dropdown-item" href="#">
                                New project...
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Profile
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;

import React from "react";

function Pagination({ total, pageNumber, handleChangePage, currentPage }) {
    const toArray = (number) => {
        let arr = [];
        for (let i = 0; i < number; i++) {
            arr.push("");
        }
        return arr;
    };
    return (
        <div>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <a
                            className="page-link"
                            tabIndex={-1}
                            aria-disabled="true"
                        >
                            Previous
                        </a>
                    </li>
                    {toArray(Math.ceil(total / pageNumber)).map((e, i) => (
                        <li
                            className={`page-item ${
                                currentPage === i + 1 && "active"
                            }`}
                            key={i}
                        >
                            <button
                                className="page-link"
                                onClick={() => handleChangePage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li className="page-item">
                        <a className="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;

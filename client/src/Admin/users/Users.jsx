import React, { useEffect, useState } from "react";
import axios from "axios";
function Users() {
    const [users, setUsers] = useState([]);
    const listUsers = () => {
        axios
            .get(`http://localhost:3000/api/v1/users`)
            .then((res) => {
                // console.log(res.data);
                setUsers(res.data.users);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        console.log(id);
        axios
            .delete(`http://localhost:3000/api/v1/users/${id}`)
            .then((res) => {
                console.log(res.data);
                setUsers(res.data.user);
                listUsers();
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        listUsers();
    }, []);
    return (
        <div style={{ width: "83%" }}>
            <h1>USERS</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.user_id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                >
                                    Block
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user.users_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;

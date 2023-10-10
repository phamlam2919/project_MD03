import React from "react";
import Sidebar from "../shared/admin/Sidebar";
import { Outlet } from "react-router-dom";
function AdminPage() {
    return (
        <div className="AdminPage">
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminPage;

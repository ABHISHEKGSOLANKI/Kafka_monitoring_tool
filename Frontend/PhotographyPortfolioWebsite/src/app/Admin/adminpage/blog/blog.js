import React from "react";

import './blog.css';
import AdminHeader from "../header/adminheader";
import Navbar from "../../navigationbar/navigationbar";
import AdminFooter from "../footer/adminfooter";

export default function Blog(){
    return(
        <>
            <AdminHeader />
            <Navbar />
            <div className="blog container-fluid">
                <h1>BLOG</h1>
            </div>
            
            <AdminFooter />
        </>
    );
};
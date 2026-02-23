import React from 'react';
import Adminheader from './app/Admin/adminpage/header/adminheader';
import Adminfooter from './app/Admin/adminpage/header/adminfooter';
import Navbar from '../../navigationbar/navigationbar';
import './adminportal.css'

export default function AdminPortal(){
    return(
        <div className="adminportal">
           <Adminheader />
           <Navbar />
           <Adminfooter />
        </div>
    );
};
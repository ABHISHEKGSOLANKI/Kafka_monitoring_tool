import React from 'react';
import AdminHeader from '../header/adminheader';
import Navbar from '../../navigationbar/navigationbar';
import AdminFooter from '../footer/adminfooter';
import PortfolioContent from './portfoliocontent'
import './portfolio.css';

export default function Portfolio(){
    return(
        <>
            <AdminHeader />
            <Navbar />
            <PortfolioContent />
            <AdminFooter />
        </>
    );
};
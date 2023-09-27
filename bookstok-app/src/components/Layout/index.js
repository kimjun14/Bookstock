import React from 'react';
import { Outlet } from 'react-router';
import Header from './header';
import Footer from './footer';


const Layout = function () {
    return (
        <>
            <div className='container-fluid'>
                <div className='container'>
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout;
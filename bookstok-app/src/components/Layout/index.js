import React from 'react';
import { Outlet } from 'react-router';
import Header from './header';
import Footer from './footer';


const Layout = function(){
    return(
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;
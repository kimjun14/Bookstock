import { Outlet } from 'react-router';
import Header from './header';
import Footer from './footer';


const Layout = function(){
    return(
        <div className='container'>
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default Layout;
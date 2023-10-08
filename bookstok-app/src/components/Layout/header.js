import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo2Cut from "../../img/logo2Cut.jpg";
import { useNavigate } from "react-router";
import './header.css'
import Home from "./header/Home";
import SignIn from "./header/signIn";
import MyPage from "./header/MyPage";
import SignUp from "./header/SignUp";
import { useAuth } from '../../AuthContext'
import SignOut from "./header/SignOut";
import { Button, Navbar, Nav, Form, Tab } from 'react-bootstrap';
import CategoryModal from '.././Category/CategoryModal';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    return isDesktop ? children : null
}

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 576 })
    return isMobile ? children : null
}

const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 577, maxWidth: 1023 })
    return isTablet ? children : null
}

const Header = function () {
    const { isLoggedIn } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();



    const handleSearchChange = (e) => {
        console.log(e.target.value);
        setSearchTerm(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`searchResult?query=${searchTerm}`);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isBookSignUpPage = location.pathname === "/booksignup";

    return (
        <>
            <Desktop>
                <div className="container-fluid mb-5">
                    <Navbar className="row justify-content-between" bg="white" expand="lg" style={{ marginRight: '1rem' }}>
                        <Navbar.Brand className="col-md-3 mt-3" as={Link} to="/">
                            <img src={logo2Cut} alt="logo" />       {/* 로고 이미지 */}
                        </Navbar.Brand>
                        <Nav className="col-md-5 justify-content-end align-items-center mt-4">
                            <Form onSubmit={handleSearchSubmit} className="header-search">
                                <div className="input-group">
                                    <span className="input-group-text" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="dimgray" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </span>
                                    <input className="form-control" type="search" style={{ border: 'none', boxShadow: 'none' }} value={searchTerm} onChange={handleSearchChange} />
                                </div>
                            </Form>

                            <Nav>
                                <Home />

                                {isLoggedIn ? (
                                    <>
                                        <SignOut />
                                        <MyPage />
                                    </>
                                ) : (
                                    <>
                                        <SignIn />
                                        <SignUp />
                                    </>
                                )}
                            </Nav>
                        </Nav>
                    </Navbar>

                    {!isBookSignUpPage && (
                        <div className="row justify-content-end" style={{ border: "0px solid red", marginRight: '1rem' }}>
                            <div className="col-sm-9"></div>
                            <Link to="/booksignup" type="button" className="col-sm btn header-bookSignUp me-2">
                                역경매 등록하기
                            </Link>
                            <Button className="col-sm btn header-category" onClick={handleShowModal}>
                                전체 카테고리
                            </Button>
                            <CategoryModal show={showModal} onHide={handleCloseModal} />
                        </div>
                    )}
                </div>
            </Desktop>

            <Tablet>
                <div className="container-fluid mb-5">
                    <Navbar className="row mx-auto" bg="white" expand="lg">
                        <Navbar.Brand className="col mx-auto" as={Link} to="/">
                            <img src={logo2Cut} alt="logo" className="d-flex justify-content-center mx-auto" />       {/* 로고 이미지 */}
                        </Navbar.Brand>
                    </Navbar>

                    <Nav className="row justify-content-center mt-4">
                        <Form onSubmit={handleSearchSubmit} className="header-search">
                            <div className="input-group">
                                <span className="input-group-text" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="dimgray" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </span>
                                <input className="form-control" type="search" placeholder="" style={{ border: 'none', boxShadow: 'none' }} value={searchTerm} onChange={handleSearchChange} />
                            </div>
                        </Form>
                    </Nav>

                    <Nav className="row justify-content-around mt-2">
                        <Home />

                        {isLoggedIn ? (
                            <>
                                <SignOut />
                                <MyPage />
                            </>
                        ) : (
                            <>
                                <SignIn />
                                <SignUp />
                            </>
                        )}
                    </Nav>


                    {!isBookSignUpPage && (
                        <div className="row justify-content-center mt-2">
                            <Link to="/booksignup" type="button" className="btn header-bookSignUp">
                                역경매 등록하기
                            </Link>

                            <Button className="btn header-category mt-1" onClick={handleShowModal}>
                                전체 카테고리
                            </Button>
                            <CategoryModal show={showModal} onHide={handleCloseModal} />
                        </div>
                    )}
                </div>

            </Tablet>

            <Mobile>
                <div className="container-fluid mb-5">
                    <Navbar className="row mx-auto" bg="white" expand="lg">
                        <Navbar.Brand className="col mx-auto" as={Link} to="/">
                            <img src={logo2Cut} alt="logo" className="d-flex justify-content-center mx-auto" />       {/* 로고 이미지 */}
                        </Navbar.Brand>
                    </Navbar>

                    <Nav className="row justify-content-center mt-4">
                        <Form onSubmit={handleSearchSubmit} className="header-search">
                            <div className="input-group">
                                <span className="input-group-text" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="dimgray" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </span>
                                <input className="form-control" type="search" placeholder="" style={{ border: 'none', boxShadow: 'none' }} value={searchTerm} onChange={handleSearchChange} />
                            </div>
                        </Form>
                    </Nav>

                    <Nav className="row justify-content-around mt-2">
                        <Home />

                        {isLoggedIn ? (
                            <>
                                <SignOut />
                                <MyPage />
                            </>
                        ) : (
                            <>
                                <SignIn />
                                <SignUp />
                            </>
                        )}
                    </Nav>


                    {!isBookSignUpPage && (
                        <div className="row justify-content-center mt-2">
                            <Link to="/booksignup" type="button" className="btn header-bookSignUp">
                                역경매 등록하기
                            </Link>

                            <Button className="btn header-category mt-1" onClick={handleShowModal}>
                                전체 카테고리
                            </Button>
                            <CategoryModal show={showModal} onHide={handleCloseModal} />
                        </div>
                    )}
                </div>
            </Mobile>
        </>
    )
}

export default Header;

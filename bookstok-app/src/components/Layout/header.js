import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo2Cut from "../../img/logo2Cut.jpg";
import { useNavigate } from "react-router";
import './header.css'
import Home from "./header/Home";
import SignIn from "./header/signIn";
import MyPage from "./header/MyPage";
import SignUp from "./header/SignUp";
import { useAuth } from '../../AuthContext'
import SignOut from "./header/SignOut";
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import CategoryModal from '.././Category/CategoryModal';

const Header = function () {
    const { isLoggedIn, login, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleSearchChange = (e) => {
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

    return (
        <>
            <div className="container-fluid mb-5">
                <Navbar className="row justify-content-between" bg="white" expand="lg" style={{ marginRight: '1rem' }}>
                    <Navbar.Brand className="col-sm-3 mt-3" as={Link} to="/">
                        <img src={logo2Cut} alt="logo" />
                    </Navbar.Brand>
                    <Nav className="col-sm-5 justify-content-end align-items-center mt-4">
                        <Form onSubmit={handleSearchSubmit} className="">
                            <div className="input-group">
                                <span className="input-group-text" style={{ backgroundColor: 'transparent' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="dimgray" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </span>
                                <input className="form-control" type="search" placeholder="" style={{ borderLeft: 'none' }} value={searchTerm} onChange={handleSearchChange} />
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

                <div className="row justify-content-end" style={{ border: "0px solid red", marginRight: '1rem' }}>
                    <div className="col-sm-9"></div>
                    <Link to="/booksignup" type="button" className="col-sm btn header-bookSignUp">
                        역경매 등록하기
                    </Link>
                    <Button className="col-sm btn header-category" onClick={handleShowModal}>
                        전체 카테고리
                    </Button>
                    <CategoryModal show={showModal} onHide={handleCloseModal} />
                </div>
            </div>
        </>
    )
}

export default Header;
import React, { useState } from "react";
import { Link } from "react-router-dom"; // react-router-dom에서 Link 가져오기
import logo2Cut from "../../img/logo2Cut.jpg";
import { useNavigate } from "react-router";
import './header.css'
import Home from "./header/Home";
import SignIn from "./header/signIn";
import MyPage from "./header/MyPage";
import SignUp from "./header/SignUp";
import {useAuth} from '../../AuthContext'

const Header = function () {
    const { isLoggedIn, login, logout } = useAuth(); // 로그인 상태와 로그인/로그아웃 함수 가져오기
    
    // 1. 상태 생성
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // 2. 검색창 핸들러
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    // 3. 폼 제출 핸들러
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`searchResult?query=${searchTerm}`);
    };

    return (
        <>
            <nav className="navbar bg-white">
                {/* 첫 번째 줄 */}
                <div className="container mb-3 d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand" >
                        <img src={logo2Cut} alt="logo" width="180"/>
                    </Link>
                    <form className="d-flex" role="search" style={{ backgroundColor: '', height: '40px' }} onSubmit={handleSearchSubmit}>
                        {/* <!-- searchbar start--> */}
                        <div className="input-group">
                            <span className="input-group-text" style={{ backgroundColor: '#FFF', height: '40px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </span>
                            <input className="form-control me-2" type="search" placeholder="" style={{ borderLeft: 'none' }} value={searchTerm} onChange={handleSearchChange} />
                        </div>
                        {/* <!-- searchbar end--> */}
                        <div className="container mb-3">
                            <ul className="nav justify-content-end">
                            <Home />
                                {isLoggedIn ? (
                                    <>
                                        <MyPage />
                                    </>
                                ) : (
                                    <>
                                        <SignIn />
                                        <SignUp />
                                    </>
                                )}
                            </ul>
                        </div>
                    </form>
                </div>

                {/* 두 번째 줄 */}

                <div className="container mb-3 d-flex">
                    <Link to="/booksignup" type="button" className="btn btn-outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                    </svg>  도서 등록하기</Link>
                    <ul className="nav">
                    </ul>
                    <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="bg-white">
                        <div className="bg-white p-1">
                            <h5 className="text-body-emphasis h6">Collapsed content</h5>
                            <span className="text-body-tertiary">Toggleable via the navbar brand.</span>
                        </div>
                    </div>
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" style={{ color: 'black' }}>
                        <span className="navbar-toggler-icon"></span>
                        <span style={{ fontSize: '14px', marginLeft: '7px', marginRight: '14px' }}>전체 카테고리</span>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Header;

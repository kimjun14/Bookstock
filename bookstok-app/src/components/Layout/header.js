import React, { useState } from "react";
import { Link } from "react-router-dom"; // react-router-dom에서 Link 가져오기
import logo2Cut from "../../img/logo2Cut.jpg";
import { useNavigate } from "react-router";
import './header.css'

const Header = function () {
    // 로그인 상태 저장 state
    // eslint-disable-next-line 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                                        </svg>
                                        <span style={{ fontSize: '12px', marginTop: '6px' }}>HOME</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signin" className="nav-link text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
                                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                                        </svg>
                                        <span style={{ fontSize: '12px', marginTop: '6px' }}>LOGIN</span>
                                    </Link>
                                </li>
                                {
                                    isLoggedIn ? (
                                        <li className="nav-item">
                                            <Link to="/mypage" className="nav-link text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3Z" />
                                                </svg>
                                                <span style={{ fontSize: '12px', marginTop: '6px' }}>MYPAGE</span>
                                            </Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <Link to="/signup" className="nav-link text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                </svg>
                                                <span style={{ fontSize: '12px', marginTop: '6px' }}>SIGN UP</span>
                                            </Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </form>
                </div>

                {/* 두 번째 줄 */}

                <div className="container mb-3 d-flex">
                    <Link to="/booksignup" type="button" className="btn btn-outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
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

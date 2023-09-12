<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom"; // react-router-dom에서 Link 가져오기
=======
import React, { useState } from "react";
>>>>>>> 4409481b558662b3f00c9d3d9d5b8c4c6f6e3d87
import logo2Cut from "../../img/logo2Cut.jpg";
import { useNavigate } from "react-router";

const Header = function () {
    // 1. 상태 생성
    const [searchTerm, setSearchTerm]=useState("");
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
                    <Link to="/" className="navbar-brand"> 
                        <img src={logo2Cut} alt="logo" width="180" />
<<<<<<< HEAD
                    </Link>
                    <form className="d-flex" role="search" style={{ backgroundColor: '', height: '40px' }}>
=======
                    </a>
                    {/* <!-- searchbar --> */}
                    <form className="d-flex ms-auto" role="search" onSubmit={handleSearchSubmit}>
>>>>>>> 4409481b558662b3f00c9d3d9d5b8c4c6f6e3d87
                        <div className="input-group">
                            <span className="input-group-text" style={{ backgroundColor: '#FFF', height: '40px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </span>
                            <input className="form-control me-2" type="search" placeholder="" style={{ borderLeft: 'none' }} value={searchTerm} onChange={handleSearchChange} />
                        </div>
                        <div className="container mb-3">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                                        </svg>
                                        <span style={{ fontSize: '12px', marginTop: '6px' }}>HOME</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signin" className="nav-link text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                                            <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5.0.0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5.0.0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                        </svg>
                                        <span style={{ fontSize: '12px', marginTop: '6px' }}>LOGIN</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/mypage" className="nav-link text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* 마이 페이지 */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        </svg>
                                        <span style={{ fontSize: '12px', marginTop: '6px' }}>MYPAGE</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>

                {/* 두 번째 줄 */}
                
                <div className="container mb-3 d-flex">
                    <Link to="/" type="button" className="btn btn-outline-secondary" >도서 등록하기</Link> 
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

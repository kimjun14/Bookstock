import React from "react";
import logo2 from "../../img/logo2.jpg";


const Header = function () {
    return (
        <>
<<<<<<< HEAD
        <nav className="navbar bg-white">
            {/* <!-- logo --> */}
            <div className="container mb-3">
            <a className="navbar-brand" href="/">
                <img src={logo2} alt="logo" width="150" height="130" />
            </a>
            {/* <!-- searchbar --> */}
            <form className="d-flex ms-auto" role="search">
                <input className="form-control me-2" type="search" placeholder="search" />
                <button className="btn btn-outline-primary" type="submit">search</button>
            </form>
            {/* <!-- headerNav --> */}
            <ul className="nav justify-content-end">
                <li className="nav-item">
                <a className="nav-link active text-secondary-emphasis" href="/"> {/* 메인 화면 */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                    </svg>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-secondary-emphasis" href="/signin"> {/* 로그인 */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                    </svg>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-secondary-emphasis" href="/register"> {/* 회원 가입 */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                    </svg>
                </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-secondary-emphasis" href="/"> {/* 마이 페이지 */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg>
=======
            <nav className="navbar bg-white">
                {/* <!-- logo --> */}
                <div className="container mb-3">
                    <a className="navbar-brand" href="/">
                        <img src={logo2} alt="logo" width="150" height="130" />
>>>>>>> 17ff25bcec2b7ad5d4d77ec83b2e30c3b4f2570b
                    </a>
                    {/* <!-- searchbar --> */}
                    <form className="d-flex ms-auto" role="search">
                        <div className="input-group">
                            <span className="input-group-text" style={{ backgroundColor: '#FFF' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </span>
                            <input className="form-control me-2" type="search" placeholder="" style={{ borderLeft: 'none' }} />
                        </div>
                    </form>

                    {/* <!-- headerNav --> */}
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link active text-secondary-emphasis" href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3px' }}> {/* 메인 화면 */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                                </svg>
                                <span style={{ fontSize: '14px', marginTop: '7px' }}>HOME</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-secondary-emphasis" href="/signin" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                </svg>
                                <span style={{ fontSize: '14px', marginTop: '7px' }}>LOGIN</span>
                            </a>
                        </li>

                        {/* <li className="nav-item">
                            <a className="nav-link text-secondary-emphasis" href="/register"> {/* 회원 가입 */}
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                </svg>
                                <br />마이페이지
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link text-secondary-emphasis" href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3px' }}> {/* 마이 페이지 */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                                <span style={{ fontSize: '14px', marginTop: '7px' }}>MYPAGE</span>

                            </a>
                        </li>
                        <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="bg-white">
                            <div className="bg-white p-1">
                                <h5 className="text-body-emphasis h6">Collapsed content</h5>
                                <span className="text-body-tertiary">Toggleable via the navbar brand.</span>
                            </div>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" >
                            <span className="navbar-toggler-icon" ></span>
                        </button>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Header;

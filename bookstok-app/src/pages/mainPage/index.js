import React from 'react';

function MainPage() {
    return (
        <div>
            <header>
                {/* 메인 상단 로고 */}
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div id="logo">
                            <a href="/">
                                <img
                                    className="logoImg"
                                    src="./bookStockLogo 복사본.jpg"
                                    alt="로고"
                                    style={{
                                        width: '200px',
                                        marginLeft: '30%',
                                    }}
                                />
                            </a>
                        </div>
                        <form
                            className="d-flex"
                            role="search"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="도서를 검색하세요."
                                aria-label="Search"
                                style={{ width: '500px' }}
                            />
                            <button type="submit" style={{ border: 'none', background: 'none', padding: '0' }}>
                                <i className="fa-solid fa-magnifying-glass" style={{ color: '#000000', marginLeft: '10px' }}></i>
                            </button>
                        </form>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ position: 'absolute', top: '50%', left: '90%' }}>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li id="category">
                                    <button style={{ border: 'none', background: 'none', padding: '0', margin: '0 15px' }}>
                                        <i className="fa-solid fa-bars" style={{ color: '#000000' }}></i>
                                    </button>
                                </li>
                                <li id="Home">
                                    <button style={{ border: 'none', background: 'none', padding: '0', margin: '0 15px' }}>
                                        <i className="fa-solid fa-house" style={{ color: '#000000' }}></i>
                                    </button>
                                </li>
                                <li id="Profile">
                                    <button style={{ border: 'none', background: 'none', padding: '0', margin: '0 15px' }}>
                                        <i className="fa-solid fa-user" style={{ color: '#000000' }}></i>
                                    </button>
                                </li>
                                <li id="Login">
                                    <button style={{ border: 'none', background: 'none', padding: '0' }}>
                                        <i className="fa-solid fa-arrow-right-to-bracket" style={{ color: '#000000' }}></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* 본문 상단 슬라이드 배너 */}
            <div id="topSector" style={{ height: '80%' }}>
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    style={{ height: '450px' }}
                >
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-inner" style={{ height: '100%' }}>
                        <div className="carousel-item active">
                            <img
                                src="https://via.placeholder.com/800x400"
                                className="d-block w-100"
                                alt="Slide 1"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://via.placeholder.com/800x400"
                                className="d-block w-100"
                                alt="Slide 2"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://via.placeholder.com/800x400"
                                className="d-block w-100"
                                alt="Slide 3"
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '20px', margin: '20px' }}>
                <h2>인기 경매 도서</h2>
            </div>

            <div
                id="booklist"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                {/* 1번 책 */}
                <div className="booklist1" style={{ marginRight: '100px' }}>
                    <img
                        style={{ width: '200px' }}
                        src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                        alt="."
                    />
                    <p>
                        어린왕자
                        <button style={{ border: 'none', background: 'none', padding: '0' }}>
                            <i className="fa-regular fa-heart" style={{ color: '#000000' }}></i>
                        </button>
                    </p>
                    <span>시작 가격: 5000원</span>
                    <p>현재 가격: 4000원</p>
                    <p>찜: 3</p>
                </div>

                {/* 2번 책 */}
                <div className="booklist2" style={{ marginRight: '100px' }}>
                    <img
                        style={{ width: '200px' }}
                        src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                        alt="."
                    />
                    <p>
                        어린왕자
                        <button style={{ border: 'none', background: 'none', padding: '0' }}>
                            <i className="fa-regular fa-heart" style={{ color: '#000000' }}></i>
                        </button>
                    </p>
                    <span>시작 가격: 5000원</span>
                    <p>현재 가격: 4000원</p>
                    <p>찜: 3</p>
                </div>

                {/* 3번 책 */}
                <div className="booklist3" style={{ marginRight: '100px' }}>
                    <img
                        style={{ width: '200px' }}
                        src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                        alt="."
                    />
                    <p>
                        어린왕자
                        <button style={{ border: 'none', background: 'none', padding: '0' }}>
                            <i className="fa-regular fa-heart" style={{ color: '#000000' }}></i>
                        </button>
                    </p>
                    <span>시작 가격: 5000원</span>
                    <p>현재 가격: 4000원</p>
                    <p>찜: 3</p>
                </div>

                {/* 4번 책 */}
                <div className="booklist4">
                    <img
                        style={{ width: '200px' }}
                        src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                        alt="."
                    />
                    <p>
                        어린왕자
                        <button style={{ border: 'none', background: 'none', padding: '0' }}>
                            <i className="fa-regular fa-heart" style={{ color: '#000000' }}></i>
                        </button>
                    </p>
                    <span>시작 가격: 5000원</span>
                    <p>현재 가격: 4000원</p>
                    <p>찜: 3</p>
                </div>
            </div>

            {/* 푸터 */}
            <footer
                style={{
                    textAlign: 'center',
                    fontSize: 'smaller',
                    backgroundColor: '#f8f9fa',
                }}
            >
                <div id="footerNav">
                    <a href="/">서비스안내</a>
                    <a href="/">이용약관</a>
                    <a href="/">메일무단수집거부</a>
                    <a href="/">개인정보처리방침</a>
                    <a href="/">고객센터</a>
                    <a href="/">관리자쪽지</a>
                </div>
                <div id="companyInfo">
                    <p>북스탁 사업자등록번호:514-81-28277 대표번호:1900-2896</p>
                    <br />
                    <span>COPYRIGHT(C) 2023 북스탁 RIGHTS RESERVED</span>
                </div>
            </footer>
        </div>
    );
}

export default MainPage;

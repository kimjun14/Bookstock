import React from 'react';

function MainPage() {
    return (
        <div>
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
        </div>
    );
}

export default MainPage;

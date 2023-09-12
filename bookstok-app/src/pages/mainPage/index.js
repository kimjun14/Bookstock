import React from 'react';
import banner from '../../img/banner.jpg';
import banner2 from '../../img/banner2.jpg';
import banner3 from '../../img/banner3.jpg';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div>
            {/* 본문 상단 슬라이드 배너 */}
            <div id="topSector" className="container-fluid">
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
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
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src={banner}
                                className="d-block w-100"
                                alt="Slide 1"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src={banner2}
                                className="d-block w-100"
                                alt="Slide 2"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src={banner3}
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

            <div className="container mt-5 mb-3">
                <h2 className="text-center">인기 경매 도서</h2>
                <div className="d-flex flex-wrap justify-content-center">
                    {/* 1번 책 */}
                    <div className="card m-3" style={{ width: '18rem' }}>
                        <Link className='text-decoration-none text-black' to='/trading'>
                            <img
                                className='card-img-top'
                                src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                                alt="book1"
                            />
                            <div className='card-body text-center'>
                                <p className='card-title'>어린왕자</p>
                                <span className='card-text'>시작 가격: 5000원</span>
                                <p className='card-text'>현재 가격: 4000원</p>
                                <p className='card-text'>찜: 3</p>
                            </div>
                        </Link>
                    </div>

                    {/* 2번 책 */}
                    <div className="card m-3" style={{ width: '18rem' }}>
                        <Link className='text-decoration-none text-black' to='trading'>
                            <img
                                className='card-img-top'
                                src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                                alt="book2"
                            />
                            <div className='card-body text-center'>
                                <p className='card-title'>도시와 그 불확실한 벽</p>
                                <span className='card-text'>시작 가격: 5000원</span>
                                <p className='card-text'>현재 가격: 4000원</p>
                                <p className='card-text'>찜: 3</p>
                            </div>
                        </Link>
                    </div>

                    {/* 3번 책 */}
                    <div className="card m-3" style={{ width: '18rem' }}>
                        <Link className='text-decoration-none text-black' to='/trading'>
                            <img
                                className='card-img-top'
                                src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                                alt="book3"
                            />
                            <div className='card-body text-center'>
                                <p className='card-title'>어린왕자</p>
                                <span className='card-text'>시작 가격: 5000원</span>
                                <p className='card-text'>현재 가격: 4000원</p>
                                <p className='card-text'>찜: 3</p>
                            </div>
                        </Link>
                    </div>

                    {/* 4번 책 */}
                    <div className="card m-3" style={{ width: '18rem' }}>
                        <Link className='text-decoration-none text-black' to='/trading'>
                            <img
                                className='card-img-top'
                                src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                                alt="book4"
                            />
                            <div className='card-body text-center'>
                                <p className='card-title'>어린왕자</p>
                                <span className='card-text'>시작 가격: 5000원</span>
                                <p className='card-text'>현재 가격: 4000원</p>
                                <p className='card-text'>찜: 3</p>
                            </div>
                        </Link>
                    </div>

                    {/* 5번 책 */}
                    <div className="card m-3" style={{ width: '18rem' }}>
                        <Link className='text-decoration-none text-black' to='/trading'>
                            <img
                                className='card-img-top'
                                src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                                alt="book4"
                            />
                            <div className='card-body text-center'>
                                <p className='card-title'>어린왕자</p>
                                <span className='card-text'>시작 가격: 5000원</span>
                                <p className='card-text'>현재 가격: 4000원</p>
                                <p className='card-text'>찜: 3</p>
                            </div>
                        </Link>
                    </div>

                    {/* 6번 책 */}
                    <div className="card m-3" style={{ width: '18rem' }}>
                        <Link className='text-decoration-none text-black' to='/trading'>
                            <img
                                className='card-img-top'
                                src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                                alt="book4"
                            />
                            <div className='card-body text-center'>
                                <p className='card-title'>어린왕자</p>
                                <span className='card-text'>시작 가격: 5000원</span>
                                <p className='card-text'>현재 가격: 4000원</p>
                                <p className='card-text'>찜: 3</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

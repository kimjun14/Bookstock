import React from 'react';
import banner from '../../img/banner.jpg'
import banner2 from '../../img/banner2.jpg'
import banner3 from '../../img/banner3.jpg'
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

            <div style={{ marginTop: '5rem', marginLeft: '3rem' , marginBottom: '3rem'}}>
                <h2>인기 경매 도서</h2>
            </div>

            <div
                id="booklist"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                {/* 1번 책 */}
                <div className="card" style={{ width: '18rem' }}>
                    <a className='text-decoration-none text-black' href='/'>
                    <img
                        className='card-img-top'
                        src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                        alt="book1"
                    />
                    <div className='card-text text-center'>
                        <p>어린왕자</p>
                        <span>시작 가격: 5000원</span>
                        <p>현재 가격: 4000원</p>
                        <p>찜: 3</p>
                    </div>
                    </a>
                </div>

                {/* 2번 책 */}
                <div className="card ms-3" style={{ width: '18rem' }}>
                    <a className='text-decoration-none text-black' href='/'>
                    <img
                        className='card-img-top'
                        src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                        alt="book1"
                    />
                    <div className='card-text text-center'>
                        <p>도시와 그 불확실한 벽</p>
                        <span>시작 가격: 5000원</span>
                        <p>현재 가격: 4000원</p>
                        <p>찜: 3</p>
                    </div>
                    </a>
                </div>

                {/* 3번 책 */}
                <div className="card ms-3" style={{ width: '18rem' }}>
                    <a className='text-decoration-none text-black' href='/'>
                    <img
                        className='card-img-top'
                        src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                        alt="book1"
                    />
                    <div className='card-text text-center'>
                        <p>어린왕자</p>
                        <span>시작 가격: 5000원</span>
                        <p>현재 가격: 4000원</p>
                        <p>찜: 3</p>
                    </div>
                    </a>
                </div>

                {/* 4번 책 */}
                <div className="card ms-3" style={{ width: '18rem' }}>
                    <a className='text-decoration-none text-black' href='/'>
                    <img
                        className='card-img-top'
                        src="https://search.pstatic.net/sunny?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fko%2Fthumb%2F0%2F05%2FLittleprince.JPG%2F200px-Littleprince.JPG&type"
                        alt="book1"
                    />
                    <div className='card-text text-center'>
                        <p>어린왕자</p>
                        <span>시작 가격: 5000원</span>
                        <p>현재 가격: 4000원</p>
                        <p>찜: 3</p>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

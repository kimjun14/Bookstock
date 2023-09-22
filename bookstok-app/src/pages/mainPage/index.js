import React from 'react';
import banner from '../../img/banner.jpg';
import banner2 from '../../img/banner2.jpg';
import banner3 from '../../img/banner3.jpg';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import './style.css'
import MainRanking from '../../components/MainRanking/MainRanking';
import NewBooks from '../../components/NewBooks/NewBooks'

function MainPage() {

    return (
        <div>
            {/* 상단 슬라이드 배너 */}
            <div id="topSector" className="container-fluid">
                <Carousel>
                    <Carousel.Item>
                        <img
                            src={banner2}
                            className="d-block w-100"
                            alt="Slide 1"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src={banner}
                            className="d-block w-100"
                            alt="Slide 2"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src={banner3}
                            className="d-block w-100"
                            alt="Slide 3"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* 새로 나온 도서, 인기 도서 */}
            <NewBooks />
            <MainRanking />
        </div>
    );
}

export default MainPage;

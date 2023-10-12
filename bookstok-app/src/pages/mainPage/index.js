import React, { useState, useEffect } from 'react';
import banner from '../../img/banner.jpg';
import banner2 from '../../img/banner2.jpg';
import banner3 from '../../img/banner3.jpg';
import { Carousel } from 'react-bootstrap';
import './style.css'
import MainRanking from './MainRanking/MainRanking';
import NewBooks from './NewBooks/NewBooks';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

function MainPage() {
    const [bookData, setBookData] = useState([]); // bookData 상태 추가

    useEffect(() => {
        // 새로운 도서 데이터 가져오기
        const axiosConnect = axios.create({
            baseURL: process.env.REACT_APP_API_SERVER,
            withCredentials: true
        });

        const newBookFetcher = async () => {
            try {
                const response = await axiosConnect.get('test/mainpagetest');
                setBookData(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        newBookFetcher();
    }, []);

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
            <NewBooks bookData={bookData} />
            <MainRanking />
        </div>
    );
}

export default MainPage;

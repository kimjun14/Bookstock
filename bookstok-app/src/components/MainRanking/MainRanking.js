import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainRanking.css';
import axios from 'axios';

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});


        // id: 1,
        // title: '상수리나무 아래',
        // author: '서말 외 3명',
        // rating: 4.9,
        // views: 41783,
        // coverImage: 'https://picsum.photos/80/115',
        // 이전 하드코딩 데이터 일부 남김


function MainRanking() {
    const [currentPage, setCurrentPage] = useState(1);
    const [bookData , setBookData] = useState([]);

    const rankBookFetcher = async () => {
        try{
            const response=await axiosConnect.get('test/mainpagetest2')
            setBookData(response.data);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        rankBookFetcher();
        console.log(bookData);;
    },[]);

    // 페이지당 아이템 개수와 현재 페이지를 기반으로 해당 페이지의 데이터를 가져오는 함수
    const getPageData = (data, itemsPerPage, page) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // 한 페이지에 표시할 아이템 개수
    const itemsPerPage = 6;

    // 현재 페이지의 데이터를 가져옵니다.
    const currentData = getPageData(bookData, itemsPerPage, currentPage);

    // 현재 페이지의 순위를 계산합니다.
    const currentRanking = (currentPage - 1) * itemsPerPage;

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(bookData.length / itemsPerPage);

    // 다음 버튼 활성화 여부 확인
    const hasNextPage = currentPage < totalPages;

    // 이전 버튼 활성화 여부 확인
    const hasPrevPage = currentPage > 1;

    // 다음 페이지로 이동하는 함수
    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    // 이전 페이지로 이동하는 함수
    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div>
            <h2>실시간 인기 도서</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {currentData.map((book) => (
                    <div className="col" key={book.id}  style={{ position: "relative" }}>
                        <Link to={`/trading?id=${book.auctionId}`} className="card-link"> 
                            <div className="card custom-card"> 
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={book.bookImgSrc} className="card-img" alt={book.bookTitle} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{book.bookTitle}</h5>
                                            <p className="card-text">{book.bookAuthor}</p>
                                            <p className="card-text">평점: 4.9 </p> {/* 추후 구현 예정 */}
                                            <p className="card-text">조회수: {book.viewCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="rank-badge"></div> {/* 순위 표시, 임시로 비활성화 함, 추후 구현함 */}
                    </div>
                ))}
            </div>

            {/* 이전 다음버튼 */}
            <div className="d-flex justify-content-center my-3">
                <button
                    onClick={() => prevPage()}
                    disabled={!hasPrevPage}
                    className="btn btn btn-blue mx-1"
                    style={{ width: "10%" }}
                >
                    이전
                </button>
                <button
                    onClick={() => nextPage()}
                    disabled={!hasNextPage}
                    className="btn btn btn-blue mx-1"
                    style={{ width: "10%" }}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default MainRanking;

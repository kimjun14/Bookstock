import axios from "axios";
import { useEffect, useState } from "react";

const SearchBookResult = ( { query, popupToResult } ) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedBook, setSelectedBook] = useState({
        TITLE:'',
        AUTHOR:'',
        PUBLISHER:'',
        TITLE_URL:'',
        PUBLISH_PREDATE:''
    });

    const handleBookClick = (book) => {
        setSelectedBook({
            TITLE:book.TITLE,
            AUTHOR:book.AUTHOR,
            PUBLISHER:book.PUBLISHER,
            TITLE_URL:book.TITLE_URL,
            PUBLISH_PREDATE:book.PUBLISH_PREDATE
        });
        popupToResult(selectedBook); // 상위 컴포넌트로 선택한 책 정보 전달
    };

    async function fetchData(query) {
        try {
            const response = await axios.post('http://220.127.80.225:12345/api/search', { query });
            setData(response.data);
        } catch (error) {
            console.error("쿼리 전송 실패", error);
            setError(error); // 에러 상태 설정
        }
    }
    useEffect(() => {
        if (query) {
            const timer = setTimeout(() => {
                fetchData(query);
            }, 250);  // 0.25초의 딜레이
            // 컴포넌트 언마운트 시 타이머를 클리어합니다.
            return () => clearTimeout(timer);
        }
    }, [query]);
    
    if (error) {
        return <div>검색 중 오류가 발생했습니다: {error.message}</div>;
    }

    if (!data) {
        return <div>검색어를 입력해주세요</div>;
    }
    return (
        <>
            {/* 검색 내용 표시 row */}
            {data.docs.map((book, index) => (
                <div
                    key={index}
                    className={`row p-2 d-flex align-items-center ${book === selectedBook ? "bg-secondary" : ""}`}
                    onClick={() => handleBookClick(book)}
                >
                    <div className="col-md-3 col-sm-6">
                        <img
                            className="img-fluid"
                            alt={book.TITLE}
                            src={book.TITLE_URL}
                        />
                    </div>
                    <div className="col-md-9 col-sm-6">
                        <div className="d-flex align-items-start">
                            <span className="col-2">제목</span>
                            <span className="col-10">: {book.TITLE}</span>
                        </div>
                        <div className="d-flex align-items-start">
                            <span className="col-2">작가</span>
                            <span className="col-10">: {book.AUTHOR}</span>
                        </div>
                        <div className="d-flex align-items-start">
                            <span className="col-2">출판사</span>
                            <span className="col-10">: {book.PUBLISHER}</span>
                        </div>
                        <div className="d-flex align-items-start">
                            <span className="col-2">출판일</span>
                            <span className="col-10">: {book.PUBLISH_PREDATE}</span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SearchBookResult;
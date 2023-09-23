import { useEffect, useState } from "react";
import BookResearch from './bookInfo';
import axios from "axios";
import { useNavigate } from "react-router";
import './index.css'

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

const BookSignUp = () => {
    const [product, setProduct] = useState({
        auctionTitle: '',
        auctionContext: '',
        auctionPrice: '',
        uId: '',
        bookImgSrc: '',
        bookTitle: '',
        bookAuthor: '',
        bookPub: '',
        auctionEnd: '', // 초기값은 빈 문자열로 설정
    });
    const [selectedDays, setSelectedDays] = useState(1); // 초깃값을 1로 설정
    const navigation = useNavigate();

    const infoCallback = (book) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            bookTitle: book.TITLE,
            bookAuthor: book.AUTHOR,
            bookPub: book.PUBLISHER,
            bookImgSrc: book.TITLE_URL
        }));
    }

    useEffect(() => {
        console.log(product);
    }, [product]);

    const handleChange = (e, name) => {
        const { value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    useEffect(() => {
        // 초기값 설정 코드
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + selectedDays);
        const formattedDate = currentDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        setProduct((prevProduct) => ({
            ...prevProduct,
            // auctionEnd: `${selectedDays}일 (${formattedDate} 마감)`, 혹시 모르니 이전 코드 주석처리함
            auctionEnd:selectedDays
        }));
    }, [selectedDays]);

    const handleSetAuctionEnd = (days) => {
        setSelectedDays(days); // 선택된 날짜 업데이트
    };

    const renderAuctionEnd = () => {
        if (selectedDays !== null) {
            return (
                <div className="selected-auction-end">
                    {selectedDays}일 후 마감
                </div>
            );
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var newAuctionId;

        try {
            const response = await axiosConnect.post('/auctions', product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            newAuctionId = response.data.id;
            console.log(response.data.id);
        } catch (error) {
            console.error('책 등록 전송 실패:', error);
        }

        window.alert("경매 등록이 완료되었습니다.");
        navigation(`/trading?id=${newAuctionId}`);

        setProduct({
            auctionTitle: '',
            auctionContext: '',
            auctionPrice: '',
            uId: '',
            auctionEnd: '', // 초기화
        });
        setSelectedDays(null); // 선택된 날짜 초기화
    };

    return (
        <>
            <div className="book-sign-up-container">
                <form onSubmit={handleSubmit} className="book-sign-up-form">
                    <div className="row justify-content-around">
                        <div className="col-md-6">
                            <h2 className="mb-3 textH2">도서 역경매 등록</h2>
                            <div className="form-groupName">
                                <label htmlFor="name" style={{
                                    marginLeft: '-1rem', marginTop: '2rem'
                                }}>게시글 제목</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="auctionTitle"
                                    name="auctionTitle"
                                    onChange={(e) => handleChange(e, "auctionTitle")}
                                    placeholder="게시글 제목을 입력하세요"
                                />
                            </div>
                            <div className="form-groupDes">
                                <label htmlFor="description" style={{
                                    marginLeft: '-1rem', marginTop: '1rem'
                                }}>상세정보</label>
                                <textarea
                                    className="form-control"
                                    id="auctionContext"
                                    style={{ marginLeft: '-1rem' }}
                                    name="auctionContext"
                                    onChange={(e) => handleChange(e, "auctionContext")}
                                    placeholder="상세정보를 입력하세요"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" style={{
                                    marginLeft: '-1rem', marginTop: '1rem'
                                }}>경매시작가</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="auctionPrice"
                                    name="auctionPrice"
                                    onChange={(e) => handleChange(e, "auctionPrice")}
                                    placeholder="원하는 경매시작 가격을 입력하세요"
                                />
                            </div>
                            <div className="form-group exDateBtn-group">
                                <label htmlFor="category" style={{
                                    marginTop: '1rem'
                                }}>마감기한</label>
                                <div>{renderAuctionEnd()}</div> {/* 선택된 마감일 표시 */}
                                <div className="btn-group exDateBtn">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleSetAuctionEnd(1)}
                                    >
                                        1일
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleSetAuctionEnd(3)}
                                    >
                                        3일
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleSetAuctionEnd(7)}
                                    >
                                        7일
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleSetAuctionEnd(30)}
                                    >
                                        30일
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleSetAuctionEnd(60)}
                                    >
                                        60일
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-5" />
                    <BookResearch aucToInfo={infoCallback} className="book-research" />

                    <div className="d-grid gap-2 col-11 mx-auto mt-5">
                        <button type="submit" className="btn btn-sign-up btn-lg mt-5">
                            역경매 등록
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default BookSignUp;

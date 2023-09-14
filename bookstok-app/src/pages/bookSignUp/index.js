import { useState } from "react";
import BookResearch from './bookInfo';



const BookSignUp = () => {
    // 1. 상태 생성
    const [product, setProduct] = useState({
        auctionTitle: '',
        auctionContext: '',
        auctionPrice: '',
        auctionEnd: '',
    });
    // 2. 역경매 등록창 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };
    // 3. 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // 도서 검색 데이터를 서버로 던지기
        console.log('Product Data:', product);
        // 제출 후에 폼 지우기
        setProduct({
            auctionTitle: '',
            auctionContext: '',
            auctionPrice: '',
            auctionEnd: '',
        });
    };


    return (
        <>
            <div className="container-fluid mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-around">
                        <div className="col-md-auto">
                            <img src="http://placeholder.com/450x420" alt="bookimg" />
                        </div>
                        <div className="col-md-6">
                            <h2 className="mb-3">도서 역경매 등록</h2>
                            <div className="form-group">
                                <label htmlFor="name">게시글 제목:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="auctionTitle"
                                    name="auctionTitle"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">상품정보:</label>
                                <textarea
                                    className="form-control"
                                    id="auctionContext"
                                    name="auctionContext"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">경매시작가:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="auctionPrice"
                                    name="auctionPrice"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">마감일:</label>
                                <input
                                    className="form-control"
                                    id="auctionEnd"
                                    name="auctionEnd"
                                    onChange={handleChange}
                                >
                                </input>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-5" />
                    <BookResearch />

                    <div className="d-grid gap-2 col-11 mx-auto mt-5">
                        <button type="submit" className="btn btn-primary btn-lg mt-5">
                            역경매 등록
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BookSignUp;
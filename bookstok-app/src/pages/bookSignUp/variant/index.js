import { useEffect, useState } from "react";
import BookResearch from './bookInfo';
import axios from "axios";
import { useNavigate } from "react-router";

const BookSignUp = () => {
    // 1. 상태 생성
    const [product, setProduct] = useState({
        auctionTitle: '',
        auctionContext: '',
        auctionPrice: '',
        uId:'58',   // 나중에 세션 아이디 받으면 API 서버 쿼리문과 같이 교체할 예정
        bookImgSrc:'',
        bookTitle:'',
        bookAuthor:'',
        bookPub:''

        // bookPubDate 입력타입때문에 나중에 고쳐서 구현함
    });
    const navigation = useNavigate();

    const infoCallback = (book) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            bookTitle: book.TITLE,
            bookAuthor: book.AUTHOR,
            bookPub: book.PUBLISHER,
            bookImgSrc:book.TITLE_URL
        }));
    }

    useEffect(() => {
        console.log(product);
    }, [product]);

    // 2. 역경매 등록창 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
        console.log(product);
    };
    // 3. 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Product Data:', product);
        // 폼 데이터를 서버로 던지기
        try {
            const response = await axios.post('http://220.127.80.225:12345/api/auctions',product,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        }catch(error){
            console.error('Error sending data:', error);
        }
        console.log('Product Data:', product);
        window.alert("경매 등록이 완료되었습니다.");
        navigation('/trading');
        // 제출 후에 폼 지우기
        setProduct({
            auctionTitle: '',
            auctionContext: '',
            auctionPrice: '',
            uId:'58',
        });
    };


    return (
        <>
            <div className="container-fluid mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-around">
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
                                    placeholder="(D+7일로 하드코딩) 지금은 이 칸을 사용하지 않음"
                                >
                                </input>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-5" />
                    <BookResearch aucToInfo={infoCallback}/>

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
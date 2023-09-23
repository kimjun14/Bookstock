import { useEffect, useState } from "react";
import PopUp from "./popUp";

const BookResearch = ({ aucToInfo }) => {
    const [showModal, setShowModal] = useState(false);
    const [bookInfo, setBookInfo] = useState({
        title: "",
        pub: "",
        pubDate: "",
        author: "",
        title_url: ""
    })

    const popupCallback = (book) => {
        aucToInfo(book);  // 상위 컴포넌트로 선택한 책 정보 전달
        setBookInfo({
            title: book.TITLE,
            pub: book.PUBLISHER,
            pubDate: book.PUBLISH_PREDATE,
            author: book.AUTHOR,
            title_url:book.TITLE_URL
        })
        console.log(book);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        // aucToinfo 에서 전달된 정보를 bookInfo 상태에 업데이트
        setBookInfo((prevBookInfo) => ({
            ...prevBookInfo,
            title: aucToInfo.TITLE,
            pub: aucToInfo.PUBLISHER,
            pubDate: aucToInfo.PUBLISH_PREDATE,
            author: aucToInfo.AUTHOR
        }));
    }, [aucToInfo]);

    return (
        <div className="container-fluid mt-5">
            <div className="row align-items-center">
                <form className="validation-form" noValidate>
                    <div className="row justify-content-around mt-5">
                        <div className="col-md-3">
                            <img src={bookInfo.title_url} alt="bookimg" name="bookImgSrc" className="col-md-12"/>
                        </div>
                        <div className="col-md-5 mb-3">
                                <div className="row justify-content-between align-items-center mb-3">
                                    <h1 className="col-md-5">도서 정보</h1>
                                    <button type="button" className="btn btn-success col-md-3 mb-2" onClick={openModal}>도서검색</button>
                                    <PopUp isOpen={showModal} onClose={closeModal} infoToPopup={popupCallback} />
                                </div>
                            
                            <label htmlFor="email">도서제목:</label>
                            <input type="text" className="form-control ms-1" id="bookTitle" name="bookTitle" value={bookInfo.title} />

                            <label htmlFor="userAccount">출판사:</label>
                            <input type="text" className="form-control ms-1" id="bookPub" name="bookPub" value={bookInfo.pub} />

                            <label htmlFor="name">출판일:</label>
                            <input type="text" className="form-control ms-1" id="bookPubDate" name="bookPubDate" value={bookInfo.pubDate} />

                            <label htmlFor="address">작가:</label>
                            <input type="text" className="form-control ms-1" id="bookAuthor" name="bookAuthor" value={bookInfo.author} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookResearch;
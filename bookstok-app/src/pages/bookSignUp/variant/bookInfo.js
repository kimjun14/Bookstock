import { useEffect, useState } from "react";
import PopUp from "./popUp";
import placeholderImage from '../../../img/placeholder-image.jpg';
import './bookInfo.css';

const BookResearch = ({ aucToInfo }) => {
    const [showModal, setShowModal] = useState(false);
    const [bookInfo, setBookInfo] = useState({
        title: "",
        pub: "",
        pubDate: "",
        author: "",
        title_url: ""
    });

    const popupCallback = (book) => {
        aucToInfo(book);
        setBookInfo({
            title: book.TITLE,
            pub: book.PUBLISHER,
            pubDate: book.PUBDATE,
            author: book.AUTHOR,
            image: book.IMAGE
        });
        closeModal();
    };

    const handleChange = (e, name, book) => {
        const { value } = e.target;
        setBookInfo((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
        aucToInfo(book);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        setBookInfo((prevBookInfo) => ({
            ...prevBookInfo,
            title: aucToInfo.TITLE,
            pub: aucToInfo.PUBLISHER,
            pubDate: aucToInfo.PUBDATE,
            author: aucToInfo.AUTHOR
        }));
    }, [aucToInfo]);

    return (
        <div className="book-research-container container-fluid">
            <div className="row align-items-center">
                <form className="validation-form" noValidate>
                    <div className="row justify-content-around">
                        <div className="col-md-3">
                            <img
                                src={bookInfo.image || placeholderImage}
                                alt="bookimg"
                                name="bookImgSrc"
                                className="book-research-img col-md-12 mb-4"
                                onClick={openModal}
                            />
                        </div>
                        <div className="col-md-5 mb-3">
                            <div className="row justify-content-between align-items-center mb-3">
                                {bookInfo.title_url && (
                                    <button
                                        type="button"
                                        className="book-research-search-btn btn btn-success col-md-3 mb-2"
                                        onClick={openModal}
                                    >
                                        도서검색
                                    </button>
                                )}

                                <PopUp isOpen={showModal} onClose={closeModal} infoToPopup={popupCallback} />
                            </div>

                            <label htmlFor="email" style={{ marginTop: '1rem' }}>도서제목</label>
                            <input
                                type="text"
                                className="form-control ms-1"
                                id="bookTitle"
                                name="bookTitle"
                                value={bookInfo.title}
                                placeholder="도서제목을 입력하세요"
                                onChange={(e) => handleChange(e, "TITLE",bookInfo)}
                            />

                            <label htmlFor="userAccount" style={{ marginTop: '1rem' }}>출판사</label>
                            <input
                                type="text"
                                className="form-control ms-1"
                                id="bookPub"
                                name="bookPub"
                                value={bookInfo.pub}
                                placeholder="출판사를 입력하세요"
                                onChange={(e) => handleChange(e, "PUBLISHER",bookInfo)}
                            />

                            <label htmlFor="name" style={{ marginTop: '1rem' }}>출판일</label>
                            <input
                                type="text"
                                className="form-control ms-1"
                                id="bookPubDate"
                                name="bookPubDate"
                                value={bookInfo.pubDate}
                                placeholder="출판일을 입력하세요"
                                onChange={(e) => handleChange(e, "PUBDATE",bookInfo)}
                            />

                            <label htmlFor="address" style={{ marginTop: '1rem' }}>작가</label>
                            <input
                                type="text"
                                className="form-control ms-1"
                                id="bookAuthor"
                                name="bookAuthor"
                                value={bookInfo.author}
                                placeholder="작가를 입력하세요"
                                onChange={(e) => handleChange(e, "AUTHOR",bookInfo)}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default BookResearch;

import { useState } from "react";
import PopUp from "./popUp";

const BookResearch = ({ handleChange, handleSubmit }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row align-items-center">
                <form className="validation-form" noValidate>
                    <div className="row justify-content-around">
                        <div className="col-md-auto">
                            <img src="http://placeholder.com/450x420" alt="bookimg" name="bookImgSrc" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="row justify-content-between mb-3">
                                <h2 className="mb-3 col-md-6">도서 정보</h2>
                                <button type="button" className="btn btn-success col-md-2" onClick={openModal}>도서검색</button>
                                <PopUp isOpen={showModal} onClose={closeModal} handleChange={handleChange} handleSubmit={handleSubmit}/>
                            </div>
                            <label htmlFor="email">도서제목:</label>
                            <input type="text" className="form-control" id="bookTitle" name="bookTitle" onChange={handleChange} />

                            <label htmlFor="userAccount">출판사</label>
                            <input type="text" className="form-control" id="bookPub" name="bookPub" onChange={handleChange} />

                            <label htmlFor="name">출판일</label>
                            <input type="text" className="form-control" id="bookPubDate" name="bookPubDate" onChange={handleChange} />

                            <label htmlFor="address">작가</label>
                            <input type="text" className="form-control" id="bookAuthor" name="bookAuthor" onChange={handleChange} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookResearch;
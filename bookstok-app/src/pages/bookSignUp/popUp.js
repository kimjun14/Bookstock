import React, { useState } from "react";
import SearchBookResult from "./searchBookResult";

const PopUp = ({ isOpen, onClose, handleSubmit }) => {
    const [searchTerm, setSearchTerm] = useState("");
    // const [resultScreen, setResultScreen] = useState("")
    // 2. 검색창 핸들러
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    // 3. 폼 제출 핸들러
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // navigate(`searchResult?query=${searchTerm}`);
    };
    if (!isOpen) return null;
    return (
        <div className={`modal popup modal-lg`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content popup-content">
                    <div className="modal-header">
                        <h4 className="modal-title">도서검색</h4>
                        <button type="button" className="btn" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form className="modal-body" onSubmit={handleSearchSubmit}>
                        <div className="input-group">
                            <span className="input-group-text" style={{ backgroundColor: '#FFF', height: '40px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </span>
                            <input className="form-control me-2" type="search" placeholder="" style={{ borderLeft: 'none' }} value={searchTerm} onChange={handleSearchChange} />
                        </div>
                        <SearchBookResult query={searchTerm} />
                    </form>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>닫기</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
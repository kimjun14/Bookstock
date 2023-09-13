import { useState } from "react";


const BookSignUp = () => {
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 도서 검색 데이터를 서버로 던지기
        console.log('Product Data:', product);
        // 제출 후에 폼 지우기
        setProduct({
            name: '',
            description: '',
            price: '',
            category: '',
        });
        closeModal();
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };




    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row justify-content-around">
                    <div className="col-md-auto">
                        <img src="http://placeholder.com/450x420" alt="bookimg" />
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-3">도서 역경매 등록</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">도서 제목:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">상세정보:</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">경매시작가:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">장르:</label>
                                <input
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                >
                                </input>
                            </div>
                            <div className="d-flex justify-content-row">
                                <div className="col-md-6 mt-5">
                                    <div>
                                        <button type="button" className="btn btn-success" onClick={openModal}>도서검색</button>

                                        <div className={`modal ${showModal ? 'show' : ''} popup`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content popup-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title">도서검색</h4>
                                                        <button type="button" className="close" onClick={closeModal}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="container-fluid">
                                                            <div className="row align-items-center">
                                                                <div className="col-md-12">
                                                                    <form className="validation-form" noValidate>
                                                                        <div className="row justify-content-end">
                                                                            <div className="col-md-6 mb-3">
                                                                                <label htmlFor="email">도서제목</label>
                                                                                <input type="email" className="form-control" id="userId" placeholder="you@example.com" name="userId" value="도서제목" onChange={handleChange} required />
                                                                                <div className="invalid-feedback">
                                                                                    이메일을 입력해주세요.
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row justify-content-end">
                                                                            <div className="col-md-6 mb-3">
                                                                                <label htmlFor="userAccount">출판사</label>
                                                                                <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력해주세요." name="pwd" value="출판사" onChange={handleChange} required />
                                                                                <div className="invalid-feedback">
                                                                                    비밀번호를 입력해주세요.
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row justify-content-end">
                                                                            <div className="col-md-6 mb-3">
                                                                                <label htmlFor="name">출판일</label>
                                                                                <input type="text" className="form-control" id="nick" placeholder="닉네임을 입력해주세요." name="nick" value="출판일" onChange={handleChange} required />
                                                                                <div className="invalid-feedback">
                                                                                    닉네임을 입력해주세요.
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row justify-content-end">
                                                                            <div className="col-md-6 mb-3">
                                                                                <label htmlFor="address">작가</label>
                                                                                <input type="text" className="form-control" id="userAddr" placeholder="서울특별시 강남구" name="userAddr" value="작가" onChange={handleChange} required />
                                                                                <div className="invalid-feedback">
                                                                                    주소를 입력해주세요.
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>닫기</button>
                                                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>등록하기</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-grid gap-2 col-11 mx-auto mt-5">
                    <button type="submit" className="btn btn-primary btn-lg mt-5">
                        역경매 등록
                    </button>
                </div>
            </div>
        </>
    );
};

export default BookSignUp;
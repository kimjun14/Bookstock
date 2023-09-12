import { useState } from "react";


const BookSignUp = () => {
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
    };
    const handleBookSearch = () => {
        // 도서 검색 로직 구현
        console.log('Searching for books...');
    };

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row justify-content-around">
                    <div className="col-md-auto">
                        <img src="http://placeholder.com/450x420" />
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
                                    required
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
                                    required
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
                                    required
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
                                        <button
                                            onClick={handleBookSearch}
                                            className="btn btn-info btn-lg text-white"
                                        >
                                            도서 검색
                                        </button>
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
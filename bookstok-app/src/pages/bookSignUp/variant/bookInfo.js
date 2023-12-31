import { useEffect, useState } from "react";
import PopUp from "./popUp";
import placeholderImage from '../../../img/placeholder-image.jpg';
import './bookInfo.css';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';

const BookResearch = ({ aucToInfo, onImageUpload }) => {
    const isTablet = useMediaQuery({ minWidth: 576, maxWidth: 991 });
    const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 575 });

    const [showModal, setShowModal] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('initial');
    const [bookInfo, setBookInfo] = useState({
        title: "",
        pub: "",
        pubDate: "",
        author: "",
        title_url: "",
        bookImgSrc: ""
    });
    const [selectedImage, setSelectedImage] = useState(null);

    const axiosConnect = axios.create({
        baseURL: process.env.REACT_APP_API_SERVER,
        withCredentials: true
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
        // 도서가 선택되면 초기 상태 메시지를 지우기
        setUploadStatus('searched');
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

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    useEffect(() => {
        console.log("Updated bookInfo in useEffect:", bookInfo);
    }, [bookInfo]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            try {
                const response = await axiosConnect.post('/upload/auction', formData);

                if (response.status === 200) {
                    const uploadedImageSrc = `${process.env.REACT_APP_AUCTIONIMG_SERVER}/${response.data.bookImgSrc}`;
                    // console.log(response.data.bookImgSrc);
                    setBookInfo((prevBookInfo) => ({
                        ...prevBookInfo,
                        bookImgSrc: uploadedImageSrc,
                    }));

                    console.log('이미지 업로드 성공');
                    alert('이미지 업로드가 완료되었습니다.');

                    // 이미지 정보를 부모 컴포넌트로 전달
                    onImageUpload(uploadedImageSrc);

                    // 이미지 업로드 성공 메시지 설정
                    setUploadStatus('success');
                } else {
                    console.error('이미지 업로드 실패');
                    setUploadStatus('error');
                }
            } catch (error) {
                console.error('이미지 업로드 에러:', error);
                setUploadStatus('error');
            }
        } else {
            console.error('선택된 이미지가 없습니다');
            setUploadStatus('error');
        }
    };


    return (
        <div className={`book-research-container ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`}>

            <div className="book-research-container container-fluid">
                <div className="row">
                    <form className="validation-form" noValidate>
                        <div className="row justify-content-around">
                            <div className="col-md-4">
                                <img
                                    src={bookInfo.image || bookInfo.bookImgSrc || placeholderImage}
                                    alt="bookimg"
                                    name="bookImgSrc"
                                    className="book-research-img col-md-12"
                                    onClick={openModal}
                                />
                            </div>
                            <div className="col-md-5" style={{ marginRight: '1rem' }}>
                                <div className="row justify-content-between align-items-center">
                                    {bookInfo.title_url && (
                                        <button
                                            type="button"
                                            className="book-research-search-btn btn btn-success col-md-3"
                                            onClick={openModal}
                                        >
                                            도서검색
                                        </button>
                                    )}

                                    <PopUp isOpen={showModal} onClose={closeModal} infoToPopup={popupCallback} />
                                </div>

                                <label htmlFor="title" className='labelTitle'>도서제목</label>
                                <input
                                    type="text"
                                    className="form-control ms-1 "
                                    id="bookTitle"
                                    name="bookTitle"
                                    value={bookInfo.title}
                                    placeholder="도서 제목을 입력하세요"
                                    onChange={(e) => handleChange(e, "TITLE", bookInfo)}
                                />

                                <label htmlFor="public" className='labelPublic'>출판사</label>
                                <input
                                    type="text"
                                    className="form-control ms-1 form-public"
                                    id="bookPub"
                                    name="bookPub"
                                    value={bookInfo.pub}
                                    placeholder="출판사를 입력하세요"
                                    onChange={(e) => handleChange(e, "PUBLISHER", bookInfo)}
                                />

                                <label htmlFor="pubDate" className='labelPubDate' >출판일</label>
                                <input
                                    type="text"
                                    className="form-control ms-1 form-pubDate"
                                    id="bookPubDate"
                                    name="bookPubDate"
                                    value={bookInfo.pubDate}
                                    placeholder="출판일을 입력하세요."
                                    onChange={(e) => handleChange(e, "PUBDATE", bookInfo)}
                                />

                                <label htmlFor="author" className='labelAuthor'>작가</label>
                                <input
                                    type="text"
                                    className="form-control ms-1 form-author"
                                    id="bookAuthor"
                                    name="bookAuthor"
                                    value={bookInfo.author}
                                    placeholder="작가를 입력하세요"
                                    onChange={(e) => handleChange(e, "AUTHOR", bookInfo)}
                                />

                                <div className="col-md-12">
                                    <label htmlFor="imageUpload" className='labelImgUp'>이미지 업로드</label>
                                    <div className="input-group ms-3 form-imgUp" style={{ width: '95%', marginBottom: '1rem' }}>
                                        <input type="file"
                                            className="form-control"
                                            onChange={handleImageChange} />
                                        <button className="input-group-text" htmlFor="inputGroupFile02" onClick={handleUpload}>업로드</button>
                                    </div>

                                    {/* // 초기 상태 메시지 표시 */}
                                    {uploadStatus === 'initial' && (
                                        <p style={{ color: 'red' }}>📕 직접 입력 시 이미지를 선택하고 업로드 버튼을 눌러주세요.</p>
                                    )}

                                    {/* // 이미지 업로드 상태에 따른 메시지 표시 */}
                                    {uploadStatus === 'success' && (
                                        <p style={{ color: 'green' }}>✅ 도서 이미지 등록이 완료되었습니다.</p>
                                    )}

                                    {uploadStatus === 'error' && (
                                        <p style={{ color: 'red' }}>✋🏻 도서 이미지를 다시 업로드하세요.</p>
                                    )}

                                    {/* 도서 검색 후 초기 상태 메시지 표시 */}
                                    {uploadStatus === 'searched' && (
                                        <p style={{ color: 'green' }}>🔍 도서 이미지 등록이 완료되었습니다.</p>
                                    )}
                                </div>
                            </div>
                        </div>



                    </form>
                </div>
            </div>
        </div>
    );
}
export default BookResearch;

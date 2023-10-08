import './payment.css'
import icon from '../../../img/bookstock.jpg'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    return isDesktop ? children : null
}

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 576 })
    return isMobile ? children : null
}

const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 577, maxWidth: 1023 })
    return isTablet ? children : null
}

const Payment = () => {
    const [balance, setBalance] = useState(0);

    const axiosConnect = axios.create({
        baseURL: 'http://localhost:12345/api',
        withCredentials: true
    });


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                // 서버의 잔액 조회 API 엔드포인트로 요청 보내기
                const response = await axiosConnect.get('/point/balance');

                // 서버 응답에서 잔액 가져오기
                if (response.data.success) {
                    setBalance(response.data.balance);
                } else {
                    console.error('서버 응답 오류:', response.data.message);
                }
            } catch (error) {
                console.error('잔액 조회 중 오류:', error);
            }
        };

        // 페이지가 로드될 때 한 번 잔액 조회 수행
        fetchBalance();
    }, []);
    return (
        <>
            <Desktop>
                <div className="card-container text-center card" >
                    <div className="card-body">
                        <div className="pay-container text-center card text-bg-primary mb-3">
                            <div className="card-body">
                                <span className="card-title">
                                    <img src={icon} alt="icon" className='icon' />
                                    <span>북스탁 Pay</span>
                                </span>
                                <Link to="/deposit">
                                    <p className="balance card-text mb-2">{balance}원 〉</p>
                                </Link>
                                <div className='button-div d-flex justify-content-center'>
                                    <Link to="/deposit">
                                        <button type="button" className="btn btn-outline-light btn-sm mx-1">충전하기</button>
                                    </Link>
                                    <Link to="/withdraw">
                                        <button type="button" className="btn btn-outline-light btn-sm ms-1">출금하기</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Desktop>

            <Tablet>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className="card-container card" >
                        <div className="card-body">
                            <div className="pay-container text-center card text-bg-primary mb-3">
                                <div className="card-body">
                                    <span className="card-title">
                                        <img src={icon} alt="icon" className='icon' />
                                        <span>북스탁 Pay</span>
                                    </span>
                                    <Link to="/deposit">
                                        <p className="balance card-text mb-2">{balance}원 〉</p>
                                    </Link>
                                    <div className='button-div d-flex align-items-center justify-content-center'>
                                        <Link to="/deposit" className='me-2'>
                                            <button type="button" className="btn btn-outline-light btn-sm">충전하기</button>
                                        </Link>
                                        <Link to="/withdraw">
                                            <button type="button" className="btn btn-outline-light btn-sm">출금하기</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tablet>

            <Mobile>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className="card-container card" >
                        <div className="card-body">
                            <div className="pay-container text-center card text-bg-primary mb-3">
                                <div className="card-body">
                                    <span className="card-title">
                                        <img src={icon} alt="icon" className='icon' />
                                        <span>북스탁 Pay</span>
                                    </span>
                                    <Link to="/deposit">
                                        <p className="balance card-text mb-2">{balance}원 〉</p>
                                    </Link>
                                    <div className='button-div d-flex align-items-center justify-content-center'>
                                        <Link to="/deposit" className='me-2'>
                                            <button type="button" className="btn btn-outline-light btn-sm">충전하기</button>
                                        </Link>
                                        <Link to="/withdraw">
                                            <button type="button" className="btn btn-outline-light btn-sm">출금하기</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Mobile>
        </>
    );
}

export default Payment;
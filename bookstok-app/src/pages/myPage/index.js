import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

import Payment from './payment/payment';
import AuctionProgress from './auctionProgress/auctionProgress';
import AuctionTrading from './auctionTrading/auctionTrading';
import MyInfo from './myinfo/MyInfo';
import './index.css'
import axios from 'axios';

import { useMediaQuery } from 'react-responsive';

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

const RequireLogin = ({ children }) => {
    // useAuth를 사용하여 로그인 상태 확인
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // 사용자가 로그인하지 않은 경우, 마이페이지 접근 거부
        return (
            <div className="container">
                <div className="row text-center mt-3">
                    <div className="col-md-12">
                        <p>로그인이 필요합니다.</p>
                    </div>
                </div>
            </div>
        );
    }

    // 사용자가 로그인한 경우 자식 컴포넌트 렌더링
    return children;
}

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


const MyPage = () => {
    const [showAuction, setShowAuction] = useState(false);
    const [showTrading, setShowTrading] = useState(false);
    const [showMyInfo, setShowMyInfo] = useState(false);


    // 로그인한 사용자가 화면이 랜더링 될 때 (useEffect) fetch를 시도함
    // axios 통신을 통해 로그인ID의 정보를 받아와 myInfo State로 저장됨
    // 전달 되는정보. nick(닉네임), userId(아이디), userPhone(전번),[userAddr,userAddrSub](주소1,2)
    const [myinfo, setMyInfo] = useState([]);
    const fetchInfoList = async () => {
        try {
            const response = await axiosConnect.get(`/mypage/myinfo`)
            setMyInfo(response.data);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchInfoList();
    }, []);

    const toggleAuction = () => {
        setShowAuction(!showAuction);
        setShowTrading(false);
    };

    const toggleTrading = () => {
        setShowTrading(!showTrading);
        setShowAuction(false);
    };

    const toggleMyInfo = () => {
        setShowMyInfo(true);
        setShowAuction(false);
        setShowTrading(false);
    };

    return (
        <>
            <Desktop>
                <div className="mypageContainer">
                    <div className="row">

                        <div className="col-md-2" style={{ marginLeft: "3rem" }}>

                            <div className="col-md-12">
                                <Payment />
                            </div>
                            <div className="col-md-12 mypageSidebar">
                                <div className="mb-12">
                                    <h5><Link to='/mypage'>마이 북스탁</Link></h5>
                                    <ul className="list-unstyled">
                                        <li onClick={toggleMyInfo} className="text-decoration-none" style={{ fontWeight: '400', cursor: 'pointer' }}>
                                            내 정보 관리
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-3">
                                    <h5><Link to='/mypage'>경매 진행 내역</Link></h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <div onClick={toggleAuction} className="text-decoration-none" style={{ fontWeight: '400' }}>
                                                경매 진행중
                                            </div>
                                        </li>
                                        <li>
                                            <div onClick={toggleTrading} className="text-decoration-none" style={{ fontWeight: '400' }}>
                                                거래중
                                            </div>
                                        </li>
                                        <li>
                                            <Link to="/auction/completed" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                                경매 완료
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5><Link to='/mypage'>도서</Link></h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link to="/favorites" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                                관심 도서
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/recentSearch" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                                최근 조회한 도서
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9" style={{ marginTop: "2rem" }}>
                            <div className="fs-4 mt-5 mb-4 ms-2 fw-bold">경매 진행 내역</div>
                            <div className="border rounded" style={{ backgroundColor: '#F7F8F9', border: '0px' }}>
                                <div className="d-flex flex-row mb-3 justify-content-around">
                                    <div className="p-2 ms-4" onClick={toggleAuction}>
                                        <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>경매진행중</p>
                                        <p className="text-center text-black">0</p>
                                    </div>

                                    <div className="p-2 ms-4" onClick={toggleTrading}>
                                        <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>거래중</p>
                                        <p className="text-center text-black">0</p>
                                    </div>

                                    <div className="p-2 ms-4">
                                        <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>경매완료</p>
                                        <p className="text-center text-black">0</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div>
                                    {/* 상세 내역 보기 버튼과 상세 내역을 보여주는 부분 */}
                                    {showAuction && <AuctionProgress />}
                                    {showTrading && <AuctionTrading infoData={myinfo} />}
                                    {showMyInfo && <MyInfo infoData={myinfo} />}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Desktop>

            <Tablet> <div className="mypageContainer">
                <div className="row">

                    <div className="col-md-2" style={{ marginLeft: "4rem" }}>

                        <div className="col-md-12">
                            <Payment />
                        </div>
                        <div className="col-md-12 mypageSidebar">
                            <div className="mb-12">
                                <h5><Link to='/mypage'>마이 북스탁</Link></h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <li onClick={toggleMyInfo} className="text-decoration-none" style={{ fontWeight: '400', cursor: 'pointer' }}>
                                            내 정보 관리
                                        </li>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-4">
                                <h5><Link to='/mypage'>경매 진행 내역</Link></h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to="/auction/ongoing" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            경매 진행중
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/auction/trading" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            거래중
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/auction/completed" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            경매 완료
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h5><Link to='/mypage'>도서</Link></h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to="/favorites" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            관심 도서
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/recentSearch" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            최근 조회한 도서
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9" style={{ marginTop: "2rem" }}>

                        <div className="fs-4 mt-5 mb-4 ms-2 fw-bold">경매 진행 내역</div>
                        <div className="border rounded" style={{ backgroundColor: '#F7F8F9', border: '0px' }}>
                            <div className="d-flex flex-row mb-3 justify-content-around">
                                <div className="p-2 ms-4" onClick={toggleAuction}>
                                    <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>경매진행중</p>
                                    <p className="text-center text-black">0</p>
                                </div>

                                <div className="p-2 ms-4" onClick={toggleTrading}>
                                    <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>거래중</p>
                                    <p className="text-center text-black">0</p>
                                </div>

                                <div className="p-2 ms-4">
                                    <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>경매완료</p>
                                    <p className="text-center text-black">0</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div>
                                {/* 상세 내역 보기 버튼과 상세 내역을 보여주는 부분 */}
                                {showAuction && <AuctionProgress />}
                                {showTrading && <AuctionTrading infoData={myinfo} />}
                                {showMyInfo && <MyInfo infoData={myinfo} />}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </Tablet>

            <Mobile> <div className="mypageContainer">
                <div className="row">

                    <div className="col-md-2" style={{ marginLeft: "4rem" }}>

                        <div className="col-md-12">
                            <Payment />
                        </div>
                        <div className="col-md-12 mypageSidebar">
                            <div className="mb-12">
                                <h5><Link to='/mypage'>마이 북스탁</Link></h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <li onClick={toggleMyInfo} className="text-decoration-none" style={{ fontWeight: '400', cursor: 'pointer' }}>
                                            내 정보 관리
                                        </li>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-4">
                                <h5><Link to='/mypage'>경매 진행 내역</Link></h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to="/auction/ongoing" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            경매 진행중
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/auction/trading" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            거래중
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/auction/completed" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            경매 완료
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h5><Link to='/mypage'>도서</Link></h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to="/favorites" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            관심 도서
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/recentSearch" className="text-decoration-none" style={{ fontWeight: '400' }}>
                                            최근 조회한 도서
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="fs-4 mt-5 mb-4 ms-2 fw-bold">경매 진행 내역</div>
                        <div className="border rounded" style={{ backgroundColor: '#F7F8F9', border: '0px' }}>
                            <div className="d-flex flex-row mb-3 justify-content-around">
                                <div className="p-2 ms-4" onClick={toggleAuction}>
                                    <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>경매진행중</p>
                                    <p className="text-center text-black">0</p>
                                </div>

                                <div className="p-2 ms-4" onClick={toggleTrading}>
                                    <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>거래중</p>
                                    <p className="text-center text-black">0</p>
                                </div>

                                <div className="p-2 ms-4">
                                    <p className="fs-6 mt-4 text-black" style={{ cursor: 'pointer' }}>경매완료</p>
                                    <p className="text-center text-black">0</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div>
                                {/* 상세 내역 보기 버튼과 상세 내역을 보여주는 부분 */}
                                {showAuction && <AuctionProgress />}
                                {showTrading && <AuctionTrading infoData={myinfo} />}
                                {showMyInfo && <MyInfo infoData={myinfo} />}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </Mobile>
        </>
    );
};

export default MyPage;

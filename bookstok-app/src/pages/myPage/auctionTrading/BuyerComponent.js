// BuyerComponent.js
import React, { useState, useEffect } from "react";
import TradingAddress from "../TradingAddress";
import './BuyerComponent.css'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    withCredentials: true
});

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


function BuyerComponent() {
    const [addressData, setAddressData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);

    const handleAddressInput = (e, index) => {
        const { name, value } = e.target;
        setAddressData(prevState => {
            // prevState를 복사하여 새 배열을 만듭니다.
            const newData = [...prevState];
            // 현재 인덱스의 주소 객체를 업데이트합니다.
            newData[index] = { ...newData[index], [name]: value };
            return newData;
        });
    };

    const handleModalInput = (input, index) => {
        console.log(input, "<-인풋 인덱스 ->", index);
        setAddressData(prevState => {
            // prevState를 복사하여 새 배열을 만듭니다.
            const newData = [...prevState];
            // 현재 인덱스의 주소 객체를 input으로 업데이트합니다.
            newData[currentIndex] = input; // 이 부분이 input 값을 해당 인덱스에 직접 할당합니다.
            console.log(newData);
            return newData; // 업데이트된 새 배열을 반환합니다.
        })
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (index) => {
        setCurrentIndex(index); // 현재 인덱스 설정
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmPurchase = () => {
        console.log(addressData)
        const confirmPurchase = window.confirm("구매확정하시겠습니까? 구매확정 후 취소할 수 없습니다.");
        if (confirmPurchase) {
            // 여기에서 DB 업데이트 로직을 추가하세요.
            // axios 또는 fetch를 사용하여 서버로 업데이트 요청을 보낼 수 있습니다.
            // 업데이트가 성공하면 메시지를 표시하거나 다음 단계로 이동할 수 있습니다.
        }
    };

    const addrCheck = async () => {
        try {
            const result = await axiosConnect.get(`/trading/buy/addr`);
            console.log(result.data)
            setAddressData(result.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleConfirmAddress = async (address) => {
        const sendingData = {
            Addr: address.Addr,
            Addr2: address.Addr2,
            AddrPostal: address.AddrPostal,
            tradingId: address.tradingId
        }
        console.log(sendingData)

        const confirmAddress = window.confirm("주소를 저장하시겠습니까? 저장 후 취소할 수 없습니다.");
        if (confirmAddress) {
            try {
                await axiosConnect.patch(`/trading/buy/addr`, sendingData);
                alert("주소 입력 성공");
            } catch (err) {
                console.error(err);
            }
        }
        addrCheck()
    };

    useEffect(() => {
        addrCheck();
    }, [])  // 마운트 되면 실행

    return (
        <>
            <Desktop>
                {addressData.map((address, index) => (
                    <div key={index} className="text-center card mt-5 p-4 buyer-container">
                        <h4><span class="badge text-bg-secondary" style={{ fontSize: '1.5rem' }}>{address.bookTitle}</span>
                        </h4>
                        <h4 className="addressTitle">주소</h4>
                        <input type="button" onClick={() => handleOpenModal(index)} value="우편번호 찾기" />
                        <input className="user_enroll_text" type="text" name="Addr" placeholder="주소를 입력하세요" value={address.Addr} onChange={(e) => handleAddressInput(e, index)} />
                        <input type="text" id="detailAddress" name="Addr2" placeholder="상세주소를 입력하세요" value={address.Addr2} onChange={(e) => handleAddressInput(e, index)} />
                        {isModalOpen && currentIndex === index && <TradingAddress company={address} setcompany={(input) => handleModalInput(input, index)} closeModal={handleCloseModal}></TradingAddress>}
                        <button className="btn btn-blue-address" onClick={() => handleConfirmAddress(address)}>주소 저장</button>
                        <span class="badge rounded-pill text-bg-secondary trackingNumber">운송장 번호  :  {address.trackingNumber}
                        </span>
                        <button className="btn btn-blue-confirm" onClick={handleConfirmPurchase}>구매확정</button>
                    </div>
                ))}
            </Desktop>

            <Tablet>
            {addressData.map((address, index) => (
                    <div key={index} className="text-center card mt-5 p-4 ">
                        <h4><span class="badge text-bg-secondary" style={{ fontSize: '1.5rem' }}>{address.bookTitle}</span>
                        </h4>
                        <h4 className="addressTitle">주소</h4>
                        <input type="button" onClick={() => handleOpenModal(index)} value="우편번호 찾기" />
                        <input className="user_enroll_text" type="text" name="Addr" placeholder="주소를 입력하세요" value={address.Addr} onChange={(e) => handleAddressInput(e, index)} />
                        <input type="text" id="detailAddress" name="Addr2" placeholder="상세주소를 입력하세요" value={address.Addr2} onChange={(e) => handleAddressInput(e, index)} />
                        {isModalOpen && currentIndex === index && <TradingAddress company={address} setcompany={(input) => handleModalInput(input, index)} closeModal={handleCloseModal}></TradingAddress>}
                        <button className="btn btn-blue-address" onClick={() => handleConfirmAddress(address)}>주소 저장</button>
                        <span class="badge rounded-pill text-bg-secondary trackingNumber">운송장 번호  :  {address.trackingNumber}
                        </span>
                        <button className="btn btn-blue-confirm" onClick={handleConfirmPurchase}>구매확정</button>
                    </div>
                ))}
            </Tablet>

            <Mobile>
            {addressData.map((address, index) => (
                    <div key={index} className="text-center card mt-5 p-4 ">
                        <h4><span class="badge text-bg-secondary" style={{ fontSize: '1.5rem' }}>{address.bookTitle}</span>
                        </h4>
                        <h4 className="addressTitle">주소</h4>
                        <input type="button" onClick={() => handleOpenModal(index)} value="우편번호 찾기" />
                        <input className="user_enroll_text" type="text" name="Addr" placeholder="주소를 입력하세요" value={address.Addr} onChange={(e) => handleAddressInput(e, index)} />
                        <input type="text" id="detailAddress" name="Addr2" placeholder="상세주소를 입력하세요" value={address.Addr2} onChange={(e) => handleAddressInput(e, index)} />
                        {isModalOpen && currentIndex === index && <TradingAddress company={address} setcompany={(input) => handleModalInput(input, index)} closeModal={handleCloseModal}></TradingAddress>}
                        <button className="btn btn-blue-address" onClick={() => handleConfirmAddress(address)}>주소 저장</button>
                        <span class="badge rounded-pill text-bg-secondary trackingNumber">운송장 번호  :  {address.trackingNumber}
                        </span>
                        <button className="btn btn-blue-confirm" onClick={handleConfirmPurchase}>구매확정</button>
                    </div>
                ))}
            </Mobile>
        </>
    );
}

export default BuyerComponent;

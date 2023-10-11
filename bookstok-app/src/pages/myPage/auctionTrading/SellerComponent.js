import React, { useEffect, useState } from "react";
import './SellerComponent.css';
import axios from 'axios';

import { useMediaQuery } from 'react-responsive';

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
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


function SellerComponent() {
    const [trackingData, setTrackingData] = useState([]);
    const [isSaved, setIsSaved] = useState(false); // 송장번호 저장 여부
    const carriers = [
        {
            "International": "false",
            "Code": "04",
            "Name": "CJ대한통운"
        },
        {
            "International": "false",
            "Code": "05",
            "Name": "한진택배"
        },
        {
            "International": "false",
            "Code": "08",
            "Name": "롯데택배"
        },
        {
            "International": "false",
            "Code": "01",
            "Name": "우체국택배"
        },
        {
            "International": "false",
            "Code": "06",
            "Name": "로젠택배"
        },
        {
            "International": "false",
            "Code": "11",
            "Name": "일양로지스"
        },
        {
            "International": "true",
            "Code": "12",
            "Name": "EMS"
        },
        {
            "International": "true",
            "Code": "13",
            "Name": "DHL"
        },
        {
            "International": "false",
            "Code": "20",
            "Name": "한덱스"
        },
        {
            "International": "true",
            "Code": "21",
            "Name": "FedEx"
        },
        {
            "International": "true",
            "Code": "14",
            "Name": "UPS"
        },
        {
            "International": "true",
            "Code": "26",
            "Name": "USPS"
        },
        {
            "International": "false",
            "Code": "22",
            "Name": "대신택배"
        },
        {
            "International": "false",
            "Code": "23",
            "Name": "경동택배"
        },
        {
            "International": "false",
            "Code": "32",
            "Name": "합동택배"
        },
        {
            "International": "false",
            "Code": "46",
            "Name": "CU 편의점택배"
        },
        {
            "International": "false",
            "Code": "24",
            "Name": "GS Postbox 택배"
        },
    ];

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setTrackingData(prevState => {
            // prevState를 복사하여 새 배열을 만듭니다.
            const newData = [...prevState];
            // 현재 인덱스의 주소 객체를 업데이트합니다.
            newData[index] = { ...newData[index], [name]: value };
            return newData;
        });
    };

    const trackingCheck = async () => {
        try {
            const result = await axiosConnect.get(`/trading/sell/track`);
            setTrackingData(result.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        trackingCheck();
    }, [])  // 마운트 되면 실행

    const handleConfirmSave = async (input) => {
        const sendData = {
            "trackingNumber": input.trackingNumber,
            "trackingCompany": input.trackingCompany,
            "tradingId": input.tradingId
        }
        console.log(sendData);
        const confirmSave = window.confirm("운송장 번호를 저장하시겠습니까? 저장 후 수정이 불가능합니다.");
        if (confirmSave) {
            try {
                await axiosConnect.patch(`/trading/sell/track`, sendData);
                alert("송장 입력 성공");
            } catch (err) {
                console.error(err);
            }
            // 여기에서 송장 번호를 저장하거나 서버로 업데이트 요청을 보낼 수 있습니다.
            // 저장이 성공하면 isSaved 상태를 true로 설정합니다.
            // setIsSaved(true);
        }
        trackingCheck();
    };

    return (
        <>
            <Desktop>
                {trackingData.map((tracking, index) => (
                    <div key={index} className="container card mt-5 p-4 seller-container">
                        <h4><span class="badge text-bg-secondary" style={{ fontSize: '1.5rem' }}>{tracking.bookTitle}</span></h4>
                        <h4 className="parcelNum">운송장 번호</h4>
                        <div className="mb-3">
                            <select className="form-select form-select-sm" name="trackingCompany" onChange={(e) => handleChange(e, index)} value={tracking.trackingCompany}>
                                <option value="">택배사를 선택하세요</option>
                                {carriers.map((carrier) => (
                                    <option key={carrier.Code} value={carrier.Code}>
                                        {carrier.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="trackingNumber"
                                placeholder="하이픈(-)을 제외하고 입력하세요"
                                className="parcelInput"
                                value={tracking.trackingNumber}
                                onChange={(e) => handleChange(e, index)}
                                disabled={isSaved} // 저장 후 수정 불가능하도록 비활성화
                            />
                            <button className="btn parcelNumBtn" onClick={() => { handleConfirmSave(tracking) }} disabled={isSaved}>
                                운송장 번호 저장
                            </button>
                        </div>
                    </div>
                ))}
            </Desktop>
            <Tablet>
                {trackingData.map((tracking, index) => (
                    <div key={index} className="container card mt-5 p-4 seller-container">
                        <h4><span class="badge text-bg-secondary" style={{ fontSize: '1.5rem' }}>{tracking.bookTitle}</span></h4>
                        <h4 className="parcelNum">운송장 번호</h4>
                        <div className="mb-3">
                            <select className="form-select form-select-sm" name="trackingCompany" onChange={(e) => handleChange(e, index)} value={tracking.trackingCompany}>
                                <option value="">택배사를 선택하세요</option>
                                {carriers.map((carrier) => (
                                    <option key={carrier.Code} value={carrier.Code}>
                                        {carrier.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="trackingNumber"
                                placeholder="하이픈(-)을 제외하고 입력하세요"
                                className="parcelInput"
                                value={tracking.trackingNumber}
                                onChange={(e) => handleChange(e, index)}
                                disabled={isSaved} // 저장 후 수정 불가능하도록 비활성화
                            />
                            <button className="btn parcelNumBtn" onClick={() => { handleConfirmSave(tracking) }} disabled={isSaved}>
                                운송장 번호 저장
                            </button>
                        </div>
                    </div>
                ))}
            </Tablet>
            <Mobile>
                {trackingData.map((tracking, index) => (
                    <div key={index} className="container card mt-5 p-4 seller-container">
                        <h4><span class="badge text-bg-secondary" style={{ fontSize: '1.5rem' }}>{tracking.bookTitle}</span></h4>
                        <h4 className="parcelNum">운송장 번호</h4>
                        <div className="mb-3">
                            <select className="form-select form-select-sm" name="trackingCompany" onChange={(e) => handleChange(e, index)} value={tracking.trackingCompany}>
                                <option value="">택배사를 선택하세요</option>
                                {carriers.map((carrier) => (
                                    <option key={carrier.Code} value={carrier.Code}>
                                        {carrier.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="trackingNumber"
                                placeholder="하이픈(-)을 제외하고 입력하세요"
                                className="parcelInput"
                                value={tracking.trackingNumber}
                                onChange={(e) => handleChange(e, index)}
                                disabled={isSaved} // 저장 후 수정 불가능하도록 비활성화
                            />
                            <button className="btn parcelNumBtn" onClick={() => { handleConfirmSave(tracking) }} disabled={isSaved}>
                                운송장 번호 저장
                            </button>
                        </div>
                    </div>
                ))}
            </Mobile>
        </>
    );
}

export default SellerComponent;

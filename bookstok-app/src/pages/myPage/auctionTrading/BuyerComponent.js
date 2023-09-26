// BuyerComponent.js
import React, { useState, useEffect } from "react";
import TradingAddress from "../TradingAddress";
import './BuyerComponent.css'
import axios from "axios";


function BuyerComponent() {
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [enroll_company, setEnroll_company] = useState({
        address: '',
    });

    const banks = [
        '은행을 선택하세요',
        '국민은행',
        '신한은행',
        '우리은행',
        '하나은행',
        '기업은행',
    ];

    const handleBankChange = (e) => {
        setSelectedBank(e.target.value);
    };

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const handleDetailAddressChange = (e) => {
        setDetailAddress(e.target.value);
    };

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmPurchase = () => {
        const confirmPurchase = window.confirm("구매확정하시겠습니까? 구매확정 후 취소할 수 없습니다.");
        if (confirmPurchase) {
            // 여기에서 DB 업데이트 로직을 추가하세요.
            // axios 또는 fetch를 사용하여 서버로 업데이트 요청을 보낼 수 있습니다.
            // 업데이트가 성공하면 메시지를 표시하거나 다음 단계로 이동할 수 있습니다.
        }
    };

    // const [selectedCarrier, setSelectedCarrier] = useState(""); // 선택된 택배사
    // const [trackingNumber, setTrackingNumber] = useState(""); // 운송장 번호
    // const [trackingResult, setTrackingResult] = useState(null); // 조회 결과

    // const carriers = [
    //     {
    //         "International": "false",
    //         "Code": "04",
    //         "Name": "CJ대한통운"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "05",
    //         "Name": "한진택배"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "08",
    //         "Name": "롯데택배"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "01",
    //         "Name": "우체국택배"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "06",
    //         "Name": "로젠택배"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "11",
    //         "Name": "일양로지스"
    //     },
    //     {
    //         "International": "true",
    //         "Code": "12",
    //         "Name": "EMS"
    //     },
    //     {
    //         "International": "true",
    //         "Code": "13",
    //         "Name": "DHL"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "20",
    //         "Name": "한덱스"
    //     },
    //     {
    //         "International": "true",
    //         "Code": "21",
    //         "Name": "FedEx"
    //     },
    //     {
    //         "International": "true",
    //         "Code": "14",
    //         "Name": "UPS"
    //     },
    //     {
    //         "International": "true",
    //         "Code": "26",
    //         "Name": "USPS"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "22",
    //         "Name": "대신택배"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "23",
    //         "Name": "경동택배"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "32",
    //         "Name": "합동택배"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "46",
    //         "Name": "CU 편의점택배"
    //     },
    //     {
    //         "International": "false",
    //         "Code": "24",
    //         "Name": "GS Postbox 택배"
    //     },
    // ];

    // const handleCarrierChange = (e) => {
    //     setSelectedCarrier(e.target.value);
    // };

    // const handleTrackingNumberChange = (e) => {
    //     setTrackingNumber(e.target.value);
    // };

    // const handleTrackParcel = async (e) => {
    //     e.preventDefault();

    //     if (!selectedCarrier || !trackingNumber) {
    //         alert("택배사와 운송장 번호를 모두 입력해주세요.");
    //         return;
    //     }

    //     try {
    //         // 프록시 서버 엔드포인트로 API 요청을 보냅니다.
    //         const response = await axios.get("http://localhost:3000/api/trackParcel", {
    //             params: {
    //                 selectedCarrier,
    //                 trackingNumber,
    //             }
    //         });

    //         console.log(response.data.code[0]); // code 출력
    //         console.log(response.data.msg[0]); // msg 출력
    //         console.log(response.data.status[0]); // status 출력

    //         setTrackingResult(response.data);



    //         // API 응답 데이터를 상태 변수에 저장
    //         setTrackingResult(response.data);
    //     } catch (error) {
    //         console.error("택배 추적 오류:", error);
    //     }
    // };


    return (
        <>
            <div>
                <h4 className="addressTitle">주소</h4>
                <input type="button" onClick={handleOpenModal} value="우편번호 찾기" />
                <input className="user_enroll_text" type="text" name="address" placeholder="주소를 입력하세요" value={enroll_company.address} onChange={handleInput} />
                <input type="text" id="detailAddress" name="detailAddress" placeholder="상세주소를 입력하세요" value={detailAddress} onChange={handleDetailAddressChange} />
                {isModalOpen && <TradingAddress company={enroll_company} setcompany={setEnroll_company} closeModal={handleCloseModal}></TradingAddress>}

                <h4>계좌번호</h4>
                <select className="form-select-sm mt-3" value={selectedBank} onChange={handleBankChange}>
                    {banks.map((bank, index) => (
                        <option key={index} value={bank}>
                            {bank}
                        </option>
                    ))}
                </select>

                {/* <div>
                    <h2>택배배송 조회</h2>
                    <form onSubmit={handleTrackParcel}>
                        <div>
                            <label>택배사 선택:</label>
                            <select onChange={handleCarrierChange} value={selectedCarrier}>
                                <option value="">택배사를 선택하세요</option>
                                {carriers.map((carrier) => (
                                    <option key={carrier.Code} value={carrier.Code}>
                                        {carrier.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>운송장 번호 입력:</label>
                            <input
                                type="text"
                                value={trackingNumber}
                                onChange={handleTrackingNumberChange}
                            />
                        </div>
                        <button type="submit">조회하기</button>
                    </form>
                    {trackingResult && (
                        <div>
                            <h3>택배 추적 결과:</h3>
                            <pre>{JSON.stringify(trackingResult, null, 2)}</pre>
                        </div>
                    )}
                </div> */}
                <input className="mt-2" type="text" id="accountNumber" name="accountNumber" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={handleAccountNumberChange} />
                <button className="btn btn-blue mt-3" onClick={handleConfirmPurchase}>구매확정</button>
            </div>
        </>
    );
}

export default BuyerComponent;

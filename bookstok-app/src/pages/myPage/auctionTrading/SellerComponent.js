import React, { useState } from "react";
import './SellerComponent.css';
import axios from 'axios';

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});


function SellerComponent() {
    const [selectedCarrier, setSelectedCarrier] = useState(""); // 선택된 택배사
    const [trackingNumber, setTrackingNumber] = useState(""); // 운송장 번호
    const [isSaved, setIsSaved] = useState(false); // 송장번호 저장 여부
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

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

    const handleCarrierChange = (e) => {
        setSelectedCarrier(e.target.value);
    };

    const handleTrackingNumberChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    const handleConfirmSave = () => {
        const confirmSave = window.confirm("운송장 번호를 저장하시겠습니까? 저장 후 수정이 불가능합니다.");

        if (confirmSave) {
            // 여기에서 송장 번호를 저장하거나 서버로 업데이트 요청을 보낼 수 있습니다.
            // 저장이 성공하면 isSaved 상태를 true로 설정합니다.
            setIsSaved(true);
        }
    };

    const banks = [
        '은행을 선택하세요',
        '국민은행',
        '신한은행',
        '우리은행',
        '하나은행',
        '기업은행',
        '농협은행',
        '우체국',
        '대구은행',
        '부산은행',
        '광주은행',
        'KEB하나은행',
        'SC제일은행',
    ];
    

    const handleBankChange = (e) => {
        setSelectedBank(e.target.value);
    };

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const handleConfirmAccountNumber = () => {
        const confirmAccountNumber = window.confirm("계좌번호를 저장하시겠습니까? 저장 후 취소할 수 없습니다.");
        if (confirmAccountNumber) {
            // 계좌번호 변경을 서버에 요청하고 DB를 업데이트하는 코드를 추가하세요.
            // axios 또는 fetch를 사용하여 서버로 요청을 보낼 수 있습니다.
        }
    };

    return (
        <div className="container">
            <h4 className="parcelNum">운송장 번호</h4>
            <div className="mb-3">
                <select className="form-select form-select-sm" onChange={handleCarrierChange} value={selectedCarrier}>
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
                    placeholder="하이픈(-)을 제외하고 입력하세요"
                    className="parcelInput"
                    value={trackingNumber}
                    onChange={handleTrackingNumberChange}
                    disabled={isSaved} // 저장 후 수정 불가능하도록 비활성화
                />
                <button className="btn parcelNumBtn" onClick={handleConfirmSave} disabled={isSaved}>
                    운송장 번호 저장
                </button>
            </div>
            <div>
                <h4>계좌번호</h4>
                <select className="form-select form-select-sm mb-3 mt-3" value={selectedBank} onChange={handleBankChange}>
                    {banks.map((bank, index) => (
                        <option key={index} value={bank}>
                            {bank}
                        </option>
                    ))}
                </select>
                <input className="mt-2" type="text" id="accountNumber" name="accountNumber" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={handleAccountNumberChange} />
                <button className="btn btn-blue-account" onClick={handleConfirmAccountNumber}>계좌번호 저장</button>
            </div>
        </div>
    );
}

export default SellerComponent;

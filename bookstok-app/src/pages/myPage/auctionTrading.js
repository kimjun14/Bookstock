import { useState } from "react";
import TradingAddress from "./TradingAddress";

const AuctionTrading = () => {
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [enroll_company, setEnroll_company] = useState({
        address:'',
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

    const [popup, setPopup] = useState(false);

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]:e.target.value,
        })
    }

    const handleComplete = (data) => {
        setPopup(!popup);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div>
                <div id="bid" className="mt-1 mb-3">
                    <h2>거래중</h2>
                </div>

                <div className="card mb-3" style={{ minWidth: "25%" }} key={null}>
                    <div className="row justify-content-center">
                        <div className="col-md-6 mt-4 mb-2">
                            <h3>주소 정보 입력</h3>
                            <input type="button" onClick={handleComplete} value="우편번호 찾기" />
                            <input className="user_enroll_text" type="text" name="address" placeholder="주소" value={enroll_company.address} onChange={handleInput} />
                            <input type="text" id="detailAddress" name="detailAddress" placeholder="상세주소" value={detailAddress} onChange={handleDetailAddressChange} />
                        </div>
                        {popup && <TradingAddress company={enroll_company} setcompany={setEnroll_company}></TradingAddress>}

                        <div className="row justify-content-center">
                            <form className="col-md-6 mt-4 mb-2" onSubmit={handleSubmit}>
                                <h3>은행 정보 입력</h3>
                                <select className="form-select-sm mt-3" value={selectedBank} onChange={handleBankChange}>
                                    {banks.map((bank, index) => (
                                        <option key={index} value={bank}>
                                            {bank}
                                        </option>
                                    ))}
                                </select>
                                <input className="mt-4" type="text" id="accountNumber" name="accountNumber" placeholder="계좌번호" value={accountNumber} onChange={handleAccountNumberChange} />
                                <button className="btn btn-success mb-3 mt-3" type="submit">거래완료</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuctionTrading;

import { useEffect, useState } from 'react';
import './deposit.css'

const Deposit = () => {
    const [cash, setCash] = useState(0);
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');


    const banks = [
        '은행을 선택하세요',
        '국민은행',
        '신한은행'
    ];

    const BankAccount = [
        '',
        '462602-04-219275',
        '112-526-288076'
    ]

    const handleBankChange = (e) => {
        setSelectedBank(e.target.value);
    };

    useEffect(() => {
        const bankIndex = banks.indexOf(selectedBank)
        if (bankIndex !== -1) {
            setAccountNumber(BankAccount[bankIndex]);   
        } else {
            setAccountNumber('');
        }
    }, [selectedBank]);

    const setCashHandler = (amount) => {
        setCash((prevCash) => (parseFloat(prevCash) + parseFloat(amount)).toString());
};

    return (
        <>
            <div className="deposit-container">
                <div className="row justify-content-center mb-5">
                    <div className="col-sm-6 fs-3">북스탁페이 머니로</div>
                </div>

                <div className="row justify-content-center">
                    <input type="tel" className="col-sm-6" placeholder='충전할 금액을 입력해 주세요.' value={cash} onChange={(e) => setCash(e.target.value)} />
                </div>

                <div className="row justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group col-sm-6" role="group" aria-label="First group">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("10000")}>+1만</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("50000")}>+5만</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("100000")}>+10만</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("1000000")}>+100만</button>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-6 fw-bold">무통장 입금</div>
                </div>

                <div className="row justify-content-center">
                    <select className="col-sm-6 form-select-sm mb-3 mt-3" value={selectedBank} onChange={handleBankChange}>
                        {banks.map((bank, index) => (
                            <option key={index} value={bank}>
                                {bank}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row justify-content-center">
                    <input className="col-sm-6" type="text" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={setAccountNumber} />
                </div>
            </div>
        </>
    );
}

export default Deposit
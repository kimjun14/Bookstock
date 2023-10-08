import { useEffect, useState } from 'react';
import './deposit.css'
import DepositModal from './depositModal';
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
const Deposit = () => {
    const [cash, setCash] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [modal, setModal] = useState(false);

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
        setCash((prevCash) => (parseFloat(prevCash || 0) + parseFloat(amount)).toString());
    };


    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    const chargeMoney = async () => {
        // 금액이나 은행이 선택되지 않았을 때 알림을 표시
        if (!cash || cash === '0') {
            alert('금액을 입력해 주세요.');
            return;
        }

        if (!selectedBank || selectedBank === banks[0]) {
            alert('은행을 선택해 주세요.');
            return;
        }

        // 이하 코드는 금액과 은행이 선택된 상태에서만 실행
        openModal();

        // try {
        //     // Node.js 서버로 충전 요청 보내기
        //     const response = await axiosConnect.post('/point', {
        //         cash: parseInt(cash, 10),  // 문자열을 정수로 변환
        //     });

        //     // 서버 응답에 따라 알림 또는 다른 작업 수행
        //     if (response.data.success) {
        //       alert('충전이 성공적으로 완료되었습니다.');
        //       closeModal();
        //     } else {
        //       alert('충전 중에 오류가 발생했습니다.');
        //     }
        //   } catch (error) {
        //     console.error('Error during chargeMoney request:', error);
        //     alert('서버와 통신 중 오류가 발생했습니다.');
        //   };
    }
    return (
        <>
            <Desktop>
                <div className="deposit-container">
                    <div className="row justify-content-center mb-3">
                        <div className="col-sm-6 fs-3">북스탁페이 머니로</div>
                    </div>

                    <div className="row justify-content-center">
                        <input type="tel" className="col-sm-6" placeholder='충전할 금액을 입력해 주세요.' value={cash === '0' ? '' : cash} onChange={(e) => setCash(e.target.value)} />
                    </div>

                    <div className="row justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group col-sm-6" role="group" aria-label="First group">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("10000")}>+1만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("50000")}>+5만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("100000")}>+10만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("200000")}>+20만</button>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-sm-6 fw-bold">무통장 입금</div>
                    </div>

                    <div className="row">
                        <div className='col-sm-3'></div>
                        <select className="col-sm-3 form-select-sm mb-3 mt-3" value={selectedBank} onChange={handleBankChange}>
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

                    <div className='row justify-content-center'>
                        <button className='col-sm-6 btn btn-primary' onClick={chargeMoney} >
                            충전하기
                        </button>
                    </div>
                    <DepositModal openModal={modal} closeModal={closeModal} cash={cash} bank={selectedBank} account={accountNumber} />
                </div>
            </Desktop>

            <Tablet>
            <div className="deposit-container text-center">
                    <div className="row justify-content-center mb-3">
                        <div className="col-sm-6 fs-3">북스탁페이 머니로</div>
                    </div>

                    <div className="justify-content-center mb-2">
                        <input type="tel" className="chargeInput" placeholder='충전할 금액을 입력해 주세요.' value={cash === '0' ? '' : cash} onChange={(e) => setCash(e.target.value)} />
                    </div>

                    <div className="row toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group" role="group" aria-label="First group">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("10000")}>+1만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("50000")}>+5만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("100000")}>+10만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("200000")}>+20만</button>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-5">
                        <div className="col-sm-6 fw-bold">무통장 입금</div>
                    </div>

                    <select className="form-select-sm mb-3 mt-3" value={selectedBank} onChange={handleBankChange}>
                        {banks.map((bank, index) => (
                            <option key={index} value={bank}>
                                {bank}
                            </option>
                        ))}
                    </select>
                            <div className='text-center'>
                    <div className="accountInput">
                        <input type="text" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={setAccountNumber} />
                    </div>
                    </div>

                    <div className='row justify-content-center'>
                        <button className='chargeButton col-sm-6 btn btn-primary' onClick={chargeMoney} >
                            충전하기
                        </button>
                    </div>
                    <DepositModal openModal={modal} closeModal={closeModal} cash={cash} bank={selectedBank} account={accountNumber} />
                </div>
            </Tablet>

            <Mobile>
                <div className="deposit-container text-center">
                    <div className="row justify-content-center mb-3">
                        <div className="col-sm-6 fs-3">북스탁페이 머니로</div>
                    </div>

                    <div className="justify-content-center mb-2">
                        <input type="tel" className="chargeInput" placeholder='충전할 금액을 입력해 주세요.' value={cash === '0' ? '' : cash} onChange={(e) => setCash(e.target.value)} />
                    </div>

                    <div className="row toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group" role="group" aria-label="First group">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("10000")}>+1만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("50000")}>+5만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("100000")}>+10만</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setCashHandler("200000")}>+20만</button>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-5">
                        <div className="col-sm-6 fw-bold">무통장 입금</div>
                    </div>

                    <select className="form-select-sm mb-3 mt-3" value={selectedBank} onChange={handleBankChange}>
                        {banks.map((bank, index) => (
                            <option key={index} value={bank}>
                                {bank}
                            </option>
                        ))}
                    </select>
                            <div className='text-center'>
                    <div className="accountInput">
                        <input type="text" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={setAccountNumber} />
                    </div>
                    </div>

                    <div className='row justify-content-center'>
                        <button className='chargeButton col-sm-6 btn btn-primary' onClick={chargeMoney} >
                            충전하기
                        </button>
                    </div>
                    <DepositModal openModal={modal} closeModal={closeModal} cash={cash} bank={selectedBank} account={accountNumber} />
                </div>
            </Mobile>
        </>
    );
}

export default Deposit
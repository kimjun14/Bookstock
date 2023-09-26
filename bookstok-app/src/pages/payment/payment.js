import './payment.css'

const Payment = () => {
    return (
        <>
            <div className="container text-center card mt-3" style={{ width: "36rem" }}>
                <div className="card-body">
                    <div className="profile d-flex mb-2 mt-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                fill="currentColor"
                                class="bi bi-person-circle"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h5 className="card-title ms-3">
                                UserId
                            </h5>

                            <h6 className="card-subtitle mb-2 text-body-secondary">
                                Email
                            </h6>
                        </div>
                    </div>

                    <div className="container text-center card text-bg-primary mb-3" style={{ maxWidth: "24rem" }}>
                        <div className="card-body">
                            <h5 className="card-title fs-3">북스탁 Pay</h5>
                            <p className="card-text fs-4">0원 〉</p>
                            <button type="button" className="btn btn-outline-light mt-2 mx-1">충전하기</button>
                            <button type="button" className="btn btn-outline-light mt-2 mx-1 ms-1">출금하기</button>
                        </div>
                    </div>

                    <hr className="underline1"/>
                    
                    <div className="d-flex justify-content-around">
                        <span className="fw-bold fs-5" onClick={null}>머니 내역</span>
                        <span className="fw-bold fs-5" onClick={null}>고객 센터</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;
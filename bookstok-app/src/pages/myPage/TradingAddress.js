import React from "react";
import DaumPostcode from "react-daum-postcode";
import { Modal, Button } from "react-bootstrap"; // Bootstrap 모달 컴포넌트 가져오기

const TradingAddress = (props) => {

    const complete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)

        props.setcompany({
            ...props.company,
            addr: fullAddress,
            addrPostal:data.zonecode
        });

        // 주소 선택 완료 후 모달 닫기
        props.closeModal();
    }


    return (
        <Modal show={true} onHide={props.closeModal}> {/* 모달 가시성 제어 */}
            <Modal.Header closeButton>
                <Modal.Title>우편번호 찾기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* DaumPostcode 컴포넌트를 모달 내부에 배치합니다. */}
                <DaumPostcode
                    className="postmodal"
                    autoClose
                    onComplete={complete}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default TradingAddress;
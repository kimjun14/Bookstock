import React, { useState } from 'react';

function Chat({ isOpen, bid, onClose }) {
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (e) => {
        setChatMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (chatMessage.trim() !== '') {
            // 메시지를 채팅 기록에 추가
            setChatHistory([...chatHistory, { text: chatMessage, sender: 'user' }]);
            // 메시지 입력 필드 초기화
            setChatMessage('');
        }
    };

    return (
        <div
            className={`modal fade ${isOpen ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            aria-hidden={!isOpen}
            style={{ display: isOpen ? 'block' : 'none' }}
        >
            {/* 모달 내용 */}
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">1:1 채팅</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {bid && (
                            <div>
                                <p>상품 정보: {bid.bidContext}</p>
                                {/* 채팅 내용 표시 */}
                                <div className="chat-history">
                                    {chatHistory.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`chat-message ${message.sender === 'user' ? 'user' : 'seller'}`}
                                        >
                                            {message.text}
                                        </div>
                                    ))}
                                </div>
                                {/* 채팅 입력 필드와 전송 버튼 가로로 정렬 */}
                                <div className="chat-input d-flex">
                                    <input
                                        type="text"
                                        placeholder="메시지 입력"
                                        value={chatMessage}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                    <button type="button" onClick={handleSendMessage} className="btn btn-primary">
                                        전송
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;

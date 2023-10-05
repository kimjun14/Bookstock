import React, { useState } from "react";
import SellerComponent from "./bidComponent";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AuctionProgress = () => {
    const [isBuyerActive, setIsBuyerActive] = useState(false);
    const [isSellerActive, setIsSellerActive] = useState(false);
  
    const handleBuyerClick = () => {
      setIsBuyerActive(true);
      setIsSellerActive(false);
    };
  
    const handleSellerClick = () => {
      setIsBuyerActive(false);
      setIsSellerActive(true);
    };
  
    return (
      <Container className="mt-4">
        <Row>
          <Col>
            <Button
              variant={isBuyerActive ? "btn-buyer" : "btn-buyer:hover"}
              onClick={handleBuyerClick}
              className="btn btn-buyer"
            >
              등록한 경매 목록
            </Button>{" "}
            <Button
              variant={isSellerActive ? "btn-seller" : "btn-seller:hover"}
              onClick={handleSellerClick}
              className="btn btn-seller"
            >
              등록한 입찰 목록
            </Button>
          </Col>
        </Row>
        {/* {isBuyerActive && <BuyerComponent />} */}
        {isSellerActive && <SellerComponent />}
      </Container>
    )
}

export default AuctionProgress;
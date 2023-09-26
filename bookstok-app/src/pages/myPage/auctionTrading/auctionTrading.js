import React, { useState } from "react";
import BuyerComponent from "./BuyerComponent";
import SellerComponent from "./SellerComponent";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './auctionTrading.css'

function MainComponent() {
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
            구매자
          </Button>{" "}
          <Button
            variant={isSellerActive ? "btn-seller" : "btn-seller:hover"}
            onClick={handleSellerClick}
            className="btn btn-seller"
          >
            판매자
          </Button>
        </Col>
      </Row>
      {isBuyerActive && <BuyerComponent />}
      {isSellerActive && <SellerComponent />}
    </Container>
  );
}

export default MainComponent;

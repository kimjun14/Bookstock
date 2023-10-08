import React, { useState } from "react";
import BuyerComponent from "./BuyerComponent";
import SellerComponent from "./SellerComponent";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './auctionTrading.css'

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
    <>
      <Desktop>
        <Container>
          <Row>
            <Col>
              <Button
                variant={isBuyerActive ? "btn-buyer" : "btn-buyer:hover"}
                onClick={handleBuyerClick}
                className="btn btn-buyer w-100"
              >
                구매자
              </Button>{" "}
            </Col>
            <Col>
              <Button
                variant={isSellerActive ? "btn-seller" : "btn-seller:hover"}
                onClick={handleSellerClick}
                className="btn btn-seller w-100"
              >
                판매자
              </Button>
            </Col>
          </Row>
          {isBuyerActive && <BuyerComponent />}
          {isSellerActive && <SellerComponent />}
        </Container>
      </Desktop>

      <Tablet>
        <Container className="mt-4">
          <Row className="d-flex justify-content-center">
            <Button
              variant={isBuyerActive ? "btn-buyer" : "btn-buyer:hover"}
              onClick={handleBuyerClick}
              className="btn btn-buyer mb-1"
            >
              구매자
            </Button>{" "}
          </Row>
          <Row className="d-flex justify-content-center">
            <Button
              variant={isSellerActive ? "btn-seller" : "btn-seller:hover"}
              onClick={handleSellerClick}
              className="btn btn-seller"
            >
              판매자
            </Button>
          </Row>
          {isBuyerActive && <BuyerComponent />}
          {isSellerActive && <SellerComponent />}
        </Container>
      </Tablet>

      <Mobile>
        <Container className="mt-4">
          <Row className="d-flex justify-content-center">
            <Button
              variant={isBuyerActive ? "btn-buyer" : "btn-buyer:hover"}
              onClick={handleBuyerClick}
              className="btn btn-buyer mb-1"
            >
              구매자
            </Button>{" "}
          </Row>
          <Row className="d-flex justify-content-center">
            <Button
              variant={isSellerActive ? "btn-seller" : "btn-seller:hover"}
              onClick={handleSellerClick}
              className="btn btn-seller"
            >
              판매자
            </Button>
          </Row>
          {isBuyerActive && <BuyerComponent />}
          {isSellerActive && <SellerComponent />}
        </Container>
      </Mobile>
    </>
  );
}

export default MainComponent;

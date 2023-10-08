import React, { useState } from "react";
import BuyerComponent from "./aucComponent";
import SellerComponent from "./bidComponent";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    <>
      <Desktop>
        <Container className="mt-4">
          <Row>
            <Col>
              <Button
                variant={isBuyerActive ? "btn-buyer" : "btn-buyer:hover"}
                onClick={handleBuyerClick}
                className="btn btn-buyer w-100"
              >
                등록한 경매 목록
              </Button>{" "}
            </Col>
            <Col>
              <Button
                variant={isSellerActive ? "btn-seller" : "btn-seller:hover"}
                onClick={handleSellerClick}
                className="btn btn-seller w-100"
              >
                등록한 입찰 목록
              </Button>
            </Col>
          </Row>
          {isBuyerActive && <BuyerComponent />}
          {isSellerActive && <SellerComponent />}
        </Container>
      </Desktop>
      <Tablet>
        <Container className="mt-4">
          <Row>
            <Button
              variant={isBuyerActive ? "btn-buyer" : "btn-buyer:hover"}
              onClick={handleBuyerClick}
              className="btn btn-buyer w-100 mb-1"
            >
              등록한 경매 목록
            </Button>{" "}
          </Row>
          <Row>
            <Button
              variant={isSellerActive ? "btn-seller" : "btn-seller:hover"}
              onClick={handleSellerClick}
              className="btn btn-seller w-100"
            >
              등록한 입찰 목록
            </Button>
          </Row>
          {isBuyerActive && <BuyerComponent />}
          {isSellerActive && <SellerComponent />}
        </Container>
      </Tablet>
      <Mobile>
        <Container className="mt-4">
          <Row>
            <Button
              variant={isBuyerActive ? "btn-buyer" : "btn-buyer:hover"}
              onClick={handleBuyerClick}
              className="btn btn-buyer w-100 mb-1"
            >
              등록한 경매 목록
            </Button>{" "}
          </Row>
          <Row>
            <Button
              variant={isSellerActive ? "btn-seller" : "btn-seller:hover"}
              onClick={handleSellerClick}
              className="btn btn-seller w-100"
            >
              등록한 입찰 목록
            </Button>
          </Row>
          {isBuyerActive && <BuyerComponent />}
          {isSellerActive && <SellerComponent />}
        </Container>
      </Mobile>
    </>
  )
}

export default AuctionProgress;
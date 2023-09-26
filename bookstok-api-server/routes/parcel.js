const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/api/trackParcel", async (req, res) => {
    try {
      const apiUrl = "https://info.sweettracker.co.kr/api/v1/trackingInfo";
      const apiKey = "g2K3QOc16ARfKBORxGhWKQ"; // 본인의 스마트 택배 API 키로 교체
      const xml2js = require('xml2js');

  
      // 택배 조회 요청 데이터
      const response = await axios.get(apiUrl, { params: requestData });

      // Convert XML to JS object
      const result = await xml2js.parseStringPromise(response.data);
  
      // API 응답 데이터를 프론트엔드로 전달
      res.json(result.Status);
    } catch (error) {
      console.error("택배 추적 오류:", error);
      
       if (error.response) { 
          console.log(error.response.data); 
          console.log(error.response.status); 
          console.log(error.response.headers); 
       }
      
       res.status(500).json({ error: "택배 추적 오류" });
    }
  });

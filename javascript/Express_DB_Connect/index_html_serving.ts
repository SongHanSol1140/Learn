// server.ts
import dotenv from "dotenv";
import express from "express";
import path from 'path';
import fs from "fs";
import cors from "cors";

dotenv.config();
const app = express();
const appHttps = express();
app.use(express.json());;
app.use(cors());

app.use(express.static(__dirname));

// 서버
import http from "http";

// static설정
// 웹페이지 경로 => Web
app.use('/', express.static(path.join(__dirname,)));
app.get('', (req, res) => {
    res.redirect('./index.html');
});

const PORT = 80; // 사용할 HTTP 포트 번호

// http 모듈을 사용하여 Express 앱으로 서버 생성
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`HTTP 서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT} 또는 서버 IP 주소로 접속하세요.`);
  });
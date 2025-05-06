import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
// 정적파일(리액트)를 위핸
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';
// .env config

console.log(path.resolve(__dirname, '../build/index.html'));
console.log(path.join(__dirname, '../build/index.html'));


async function bootstrap() {

  const server = express();

  // HTTPS서버 생성을 위한 인증서 및 개인 키 파일 경로 설정
  const httpsOptions = {
    key: fs.readFileSync("./https/private.key.pem"),
    cert: fs.readFileSync("./https/domain.cert.pem"),
    ca: fs.readFileSync("./https/intermediate.cert.pem")
  };
  // HTTPS 서버 생성 및 리스닝
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    httpsOptions
  });

  // CORS 설정
  app.enableCors();

  // 경로 확인을 위해 콘솔에 출력
  console.log("============================================");
  const buildPath = path.join(__dirname, '../build');
  console.log('Serving static files from:', buildPath);
  console.log("============================================");
  server.use(express.static(path.join(__dirname, "../build/")));
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

  // HTTP 요청을 HTTPS로 리다이렉트
  await app.listen(443, () => console.log('HTTPS server started on port 443'));

  http.createServer((req, res) => {
    const host = req.headers.host?.replace('80', '443');
    res.writeHead(301, { "Location": `https://${host}${req.url}` });
    res.end();
  }).listen(80, () => {
    // HTTP 서버 리스닝
    console.log('HTTP server listening on port 80');
  });







}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
async function bootstrap() {
  // https 인증서
  const httpsOptions = {
    key: fs.readFileSync("./https/private.key.pem"),
    cert: fs.readFileSync("./https/domain.cert.pem")
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  // CORS 설정
  app.enableCors();

  // npm i class-validator class-transformer
  // => DTO에 유효성 검사를 적용하기 위해 설치 => dto파일 확인
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 데코레이터가 없는 속성은 제거,(요청은 가지만 데코레이터가 없는데이터는 안받음)
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 자체를 막음
      transform: true, // 요청에서 넘어온 자료형을 DTO에서 정의한 자료형으로 변환
    })
  );
  await app.listen(443); // 포트 443에서 실행
  // https://nanonix.help => 접속테스트시 https 제대로 붙엇는지 확인

  // postgres에 연결은 app.modules.ts에서
  // npm install @nestjs/typeorm typeorm pg
}
bootstrap();

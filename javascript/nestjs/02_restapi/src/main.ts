import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사용 파이프
  // 클래스 유효성 검사
  // npm i class-validator class-transformer
  // => DTO에 유효성 검사를 적용하기 위해 설치 => dto파일 확인
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 데코레이터가 없는 속성은 제거,(요청은 가지만 데코레이터가 없는데이터는 안받음)
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 자체를 막음
      transform: true, // 요청에서 넘어온 자료형을 DTO에서 정의한 자료형으로 변환
    })
  );
  await app.listen(3000);
}
bootstrap();

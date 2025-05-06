// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

// npm install --save @nestjs/serve-static
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// .env 사용
import { ConfigModule } from '@nestjs/config';
// User
import { UserModule } from './user/user.module';
import { User } from './user/entities/User.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // 정적 파일을 제공할 root 경로 (여기서는 public 폴더)
      rootPath: join(__dirname, '..', 'public'),
      // serveRoot는 기본적으로 '/'로 설정되며, 별도의 경로 지정이 필요한 경우 설정
      // serveRoot: '/', 
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈화, 모든경로에서 호출가능
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,       // PostgreSQL 기본 포트
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_DATABASE,       // 연결할 데이터베이스 이름으로 변경
      entities: [User],                // 사용할 엔티티 클래스 목록을 배열로 직접 지정
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'], // 또는 __dirname을 사용하여 프로젝트 내 모든 .entity 파일 스캔 (권장)
      synchronize: true, // 개발에서만 사용 DB 스키마 자동변경
      // logging: true, // SQL 쿼리로깅
    }),
    HttpModule,
    // 다른 모듈들...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
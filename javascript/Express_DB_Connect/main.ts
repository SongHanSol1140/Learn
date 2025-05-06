// src/main.ts
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './src/ormconfig';
import userRouter from './src/User/user.router';  // 라우터 임포트

const app = express();
app.use(express.json());

// 데이터베이스 연결
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // 라우터 연결
    app.use(userRouter);

    // 서버 시작
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

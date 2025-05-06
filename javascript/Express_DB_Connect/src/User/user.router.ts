import express from 'express';
import { AppDataSource } from '../ormconfig';
import { User } from './entity/User';
import { CreateUserDto } from './dto/CreateUserDto';

const userRouter = express.Router();

// 사용자 생성 엔드포인트 (/api/createUser)
userRouter.get('/api/createUser', async (req, res) => {
  try {
    // 요청 데이터에서 사용자 정보를 추출하고 DTO로 검증
    // const { userName, userEmail } = req.body;

    // DTO에 맞게 입력 데이터 수정
    const createUserDto: CreateUserDto = {
      name: "userName",
      email: "userEmail",
    };

    // User 엔티티 객체 생성
    const user = AppDataSource.getRepository(User).create(createUserDto);

    // 데이터베이스에 사용자 저장
    const result = await AppDataSource.getRepository(User).save(user);
    console.log("createUser");
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 모든 사용자 조회 (/api/users)
userRouter.get('/api/users', async (req, res) => {
  try {
    const users = await AppDataSource.getRepository(User).find();
    console.log("users");
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default userRouter;

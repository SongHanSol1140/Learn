// src/User/dto/CreateUserDto.ts
import { IsString, IsEmail } from 'class-validator';
// npm install class-validator class-transformer

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;
}

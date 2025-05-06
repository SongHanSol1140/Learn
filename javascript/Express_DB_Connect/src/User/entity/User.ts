// src/User/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;  // non-null assertion을 추가하여 초기화되지 않은 경고를 없앰

  @Column()
  name!: string;

  @Column()
  email!: string;
}

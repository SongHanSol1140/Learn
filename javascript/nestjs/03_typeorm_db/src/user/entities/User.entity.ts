// User.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity("User")

export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;
    
    @Column()
    password: string;
    
}